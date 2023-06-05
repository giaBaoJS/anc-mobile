import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
// Input field
import { useClearByFocusCell } from 'react-native-confirmation-code-field';
// Countdown
import useTimer from '../../hooks/TimmerHook';
// OTP Verify
import auth from '@react-native-firebase/auth';
import RNOtpVerify from 'react-native-otp-verify';
import { otpFormat } from '../../utils/Common';
// Components
import FactorMobileCodeView from './FactorMobileCodeView';
import { handleAlert } from '../../utils/Notification';
import i18next from 'i18next';
import { FactorAuthenticationStackRouteProps } from '../../navigators/stacks/FactorAuthenticationStack';
// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import {
  securityCreateSms2Fa,
  securityDeleteSms2Fa,
  securityDetele2FaGoogleAuth,
  securityGet2FaToken,
} from '../../store/slices/SecuritySlice';
import { StackActions } from '@react-navigation/routers';

export const CELL_COUNT = 6;

interface Props {
  navigation: any;
  route: FactorAuthenticationStackRouteProps<'FactorMobileCodeScreen'>;
}

const FactorMobileCodeScreen = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const { fromRoute } = route.params;
  const { userInfo } = useAppSelector(state => state.auth);
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
      let confirmation;
      if (userInfo?.phone.phone_full) {
        confirmation = await auth().signInWithPhoneNumber(
          userInfo?.phone.phone_full,
        );
      }
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
      console.log(idTokenResult);
      // Handle 2FA
      if (idTokenResult?.token && userInfo?.phone) {
        if (fromRoute === 'sms') {
          // SMS
          await dispatch(
            securityCreateSms2Fa({ firebase_token: idTokenResult?.token }),
          ).unwrap();
          setIsLoadingOTP(false);
          navigation.dispatch(StackActions.popToTop());
        } else if (fromRoute === 'removeSms') {
          // Remove SMS
          await dispatch(
            securityDeleteSms2Fa({ firebase_token: idTokenResult?.token }),
          ).unwrap();
          setIsLoadingOTP(false);
          navigation.dispatch(StackActions.popToTop());
        } else if (fromRoute === 'google') {
          // Get 2FA Token Google Auth
          await dispatch(
            securityGet2FaToken({
              is_only_sms: 1,
              firebase_token: idTokenResult?.token,
              phone: userInfo?.phone.phone,
              phone_country: userInfo?.phone.phone_country,
            }),
          );
          setIsLoadingOTP(false);
          navigation.dispatch(StackActions.replace('FactorGoogleScreen'));
        }
      }
    } catch (error: any) {
      setIsLoadingOTP(false);
      console.log(error);
      if (error.toString().includes('auth/invalid-verification-code')) {
        handleAlert({
          message: i18next.t('Error.InValidOTP'),
        });
      } else if (error.toString().includes('auth/session-expired')) {
        handleAlert({
          message: i18next.t('Error.ExpiredOTP'),
        });
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
      // Handle 2FA
      if (idTokenResult?.token && userInfo?.phone) {
        if (fromRoute === 'sms') {
          // SMS
          await dispatch(
            securityCreateSms2Fa({ firebase_token: idTokenResult?.token }),
          ).unwrap();
          setIsLoadingOTP(false);
          navigation.dispatch(StackActions.popToTop());
        } else if (fromRoute === 'removeSms') {
          // Remove SMS
          await dispatch(
            securityDeleteSms2Fa({ firebase_token: idTokenResult?.token }),
          ).unwrap();
          setIsLoadingOTP(false);
          navigation.dispatch(StackActions.popToTop());
        } else {
          // Get 2FA Token Google Auth
          await dispatch(
            securityGet2FaToken({
              is_only_sms: 1,
              firebase_token: idTokenResult?.token,
              phone: userInfo?.phone.phone,
              phone_country: userInfo?.phone.phone_country,
            }),
          );
          setIsLoadingOTP(false);
          navigation.dispatch(StackActions.replace('FactorGoogleScreen'));
        }
      }
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
      }
    } finally {
      setIsLoadingOTP(false);
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
    <FactorMobileCodeView
      isLoading={isLoading}
      isLoadingOTP={isLoadingOTP}
      fromRoute={fromRoute}
      codeProp={props}
      getCellOnLayoutHandle={getCellOnLayoutHandler}
      value={value}
      setValue={setValue}
      timerCount={timerCount}
      setTimer={resetTimer}
      userInfo={userInfo}
      onSignInWithPhone={onSignInWithPhone}
      onConfirmCode={onConfirmCode}
      autoFocus={autoFocus}
    />
  );
};

export default FactorMobileCodeScreen;
