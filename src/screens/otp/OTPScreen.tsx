import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import OTPView from './OTPView';
// Input field
import { useClearByFocusCell } from 'react-native-confirmation-code-field';
// Countdown
import useTimer from '../../hooks/TimmerHook';
import { LoginStackRouteProps } from '../../navigators/stacks/LoginStack';
// OTP Verify
import auth from '@react-native-firebase/auth';
import RNOtpVerify from 'react-native-otp-verify';
import { otpFormat } from '../../utils/Common';
// Components
import { handleAlert } from '../../utils/Notification';
import i18next from 'i18next';
// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import {
  authGetQRcode,
  authGetUserInfo,
  authRegister,
} from '../../store/slices/AuthSlice';
import { securityGetActive2Fa } from '../../store/slices/SecuritySlice';

export const CELL_COUNT = 6;

interface Props {
  navigation: any;
  route: LoginStackRouteProps<'OTPScreen'>;
}

const OTPScreen = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const { userData, phoneCode } = route.params;
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [smsOtp, setSmsOtp] = useState<any>(null);
  const [isLoadingOTP, setIsLoadingOTP] = useState<boolean>(false);
  const { isLoading } = useAppSelector(state => state.auth);
  const [value, setValue] = useState<string>('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [timerCount, resetTimer] = useTimer();
  const [confirm, setConfirm] = useState<any>(null);
  const [autoFocus, setAutoFocus] = useState<boolean>(false);

  let timer: any;
  const onSignOut = async (): Promise<void> => {
    const user = auth().currentUser;
    if (user?.uid) {
      await auth().signOut();
      setCurrentUser(null);
    }
  };

  // Handle the button press
  const onSignInWithPhone = async (): Promise<void> => {
    try {
      setIsLoadingOTP(true);
      setAutoFocus(false);
      onSignOut();
      let checkTimeout: any = null;
      timer = setTimeout(() => {
        if (checkTimeout === null) {
          return handleAlert({
            message: i18next.t('Error.Timeout'),
            onPress1: () => {
              resetTimer(0, false);
              setIsLoadingOTP(false);
            },
          });
        }
      }, 30000);
      const confirmation = await auth().signInWithPhoneNumber(
        `+${phoneCode}${userData.phone}`,
      );
      checkTimeout = confirmation;
      setConfirm(confirmation);
      resetTimer(59, true);
      if (Platform.OS === 'ios') {
        setAutoFocus(true);
      }
    } catch (error) {
      console.log(error);
      handleAlert({
        message: i18next.t('Error.General'),
        onPress1: () => {
          resetTimer(0, false);
        },
      });
    } finally {
      clearTimeout(timer);
      setIsLoadingOTP(false);
    }
  };

  useEffect(() => {
    onSignInWithPhone();
  }, []);

  const onConfirmCode = async (): Promise<void> => {
    try {
      setIsLoadingOTP(true);
      await confirm.confirm(value);
      const idTokenResult = await auth().currentUser?.getIdTokenResult();
      console.log({ ...userData, firebase_token: idTokenResult?.token });
      await dispatch(
        authRegister({
          ...userData,
          firebase_token: idTokenResult?.token,
        }),
      ).unwrap();
      setIsLoadingOTP(false);
      await dispatch(authGetUserInfo()).unwrap();
      // navigation.navigate('User');
    } catch (error: any) {
      setIsLoadingOTP(false);
      if (error.toString().includes('auth/invalid-verification-code')) {
        handleAlert({
          message: i18next.t('Error.InValidOTP'),
        });
      } else if (error.toString().includes('auth/session-expired')) {
        handleAlert({
          message: i18next.t('Error.ExpiredOTP'),
        });
      } else {
        resetTimer(0, false);
      }
    }
  };
  const onAndroidConfirmCode = async (): Promise<void> => {
    try {
      setIsLoadingOTP(true);
      if (value !== smsOtp) {
        setIsLoadingOTP(false);
        return handleAlert({ message: i18next.t('Error.InValidOTP') });
      }
      const idTokenResult = await auth().currentUser?.getIdTokenResult();
      await dispatch(
        authRegister({
          ...userData,
          firebase_token: idTokenResult?.token,
        }),
      ).unwrap();
      setIsLoadingOTP(false);
      await dispatch(authGetUserInfo()).unwrap();
      // navigation.navigate('User');
    } catch (error: any) {
      console.log(error);
      if (error.toString().includes('auth/invalid-verification-code')) {
        handleAlert({
          message: i18next.t('Error.InValidOTP'),
        });
      } else if (error.toString().includes('auth/session-expired')) {
        handleAlert({
          message: i18next.t('Error.ExpiredOTP'),
        });
      } else {
        resetTimer(0, false);
      }
    }
  };

  useEffect(() => {
    if (value.length === 6) {
      if (currentUser?.uid && Platform.OS === 'android') {
        onAndroidConfirmCode();
      } else {
        onConfirmCode();
      }
    }
  }, [value]);

  const otpHandler = (message: string) => {
    console.log(message);
    if (message && message !== '' && message !== 'Timeout Error.') {
      const otp = otpFormat(message);
      if (!isNaN(otp)) {
        setSmsOtp(otp);
        handleAlert({
          message: `${i18next.t('Permission.Sms')}\n${message}`,
          buttonText1: i18next.t('Button.Accept'),
          onPress1: () => setValue(otp),
          buttonText2: i18next.t('Button.Reject'),
          onPress2: () => setAutoFocus(true),
        });
        RNOtpVerify.removeListener();
      }
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      RNOtpVerify.getHash().then(console.log).catch(console.log);
      RNOtpVerify.getOtp()
        .then(p => RNOtpVerify.addListener(otpHandler))
        .catch(p => console.log(p));
      return () => RNOtpVerify.removeListener();
    }
  }, []);

  // Handle user state changes
  const onAuthStateChanged = (user: any) => {
    console.log('currentUser', user);
    setCurrentUser(user);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  return (
    <OTPView
      isLoading={isLoading}
      isLoadingOTP={isLoadingOTP}
      codeProp={props}
      getCellOnLayoutHandle={getCellOnLayoutHandler}
      value={value}
      setValue={setValue}
      timerCount={timerCount}
      setTimer={resetTimer}
      userData={userData}
      phoneCode={phoneCode}
      onSignInWithPhone={onSignInWithPhone}
      onConfirmCode={onConfirmCode}
      autoFocus={autoFocus}
    />
  );
};

export default OTPScreen;
