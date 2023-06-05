import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import i18next from 'i18next';
import { useClearByFocusCell } from 'react-native-confirmation-code-field';
//Hooks
import { useAppDispatch } from '../../hooks/RTKHooks';
import useTimer from '../../hooks/TimmerHook';
import { ForgotPassStackRouteProps } from '../../navigators/stacks/ForgotPassStack';
import {
  authForgotPassOTP,
  authForgotPassRequest,
} from '../../store/slices/AuthSlice';
import { handleAlert } from '../../utils/Notification';
//Components
import ForgotPassCodeView from './ForgotPassCodeView';
//FireBase
import auth from '@react-native-firebase/auth';
import RNOtpVerify from 'react-native-otp-verify';
import { otpFormat } from '../../utils/Common';
import { StackActions } from '@react-navigation/routers';

interface Props {
  navigation: any;
  route: ForgotPassStackRouteProps<'ForgotPassCodeScreen'>;
}

const ForgotPassCodeScreen = ({ navigation, route }: Props) => {
  const { formValue, token, code, phonecode, phone_country } = route.params;
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [smsOtp, setSmsOtp] = useState<any>(null);
  const [isLoadingOTP, setIsLoadingOTP] = useState<boolean>(false);
  const [timerCount, resetTimer] = useTimer();
  const [confirm, setConfirm] = useState<any>(null);
  const [autoFocus, setAutoFocus] = useState<boolean>(false);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onCheckFocus = (): void => {
    if (formValue.email) {
      setAutoFocus(true);
      resetTimer(59, true);
    }
  };
  const onSignOut = async (): Promise<void> => {
    const user = auth().currentUser;
    if (user?.uid) {
      await auth().signOut();
      setCurrentUser(null);
    }
  };
  let timer: any;
  const onForgotPassWithPhone = async (): Promise<void> => {
    try {
      setIsLoadingOTP(true);
      setAutoFocus(false);
      onSignOut();
      const res = await dispatch(
        authForgotPassRequest({
          type: 'phone',
          phone: formValue.phone,
          phone_country: phone_country,
        }),
      ).unwrap();
      const data = res.d[0];
      navigation.setParams({
        token: data.token,
        code: data.code,
      });
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
        `+${phonecode}${formValue.phone}`,
      );
      checkTimeout = confirmation;
      setConfirm(confirmation);
      setValue('');
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

  const onForgotWithEmail = async (): Promise<void> => {
    try {
      setIsLoadingOTP(true);
      const res = await dispatch(
        authForgotPassRequest({
          type: 'email',
          email: formValue.email,
        }),
      ).unwrap();
      const data = res.d[0];
      navigation.setParams({
        token: data.token,
        code: data.code,
      });
      resetTimer(59, true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingOTP(false);
    }
  };

  const onConfirmCode = async (): Promise<void> => {
    try {
      setIsLoadingOTP(true);
      let res;
      if (formValue.email) {
        res = await dispatch(
          authForgotPassOTP({
            type: 'email',
            code,
            token,
            otp: value,
          }),
        ).unwrap();
      } else {
        await confirm.confirm(value);
        const idTokenResult = await auth().currentUser?.getIdTokenResult();
        res = await dispatch(
          authForgotPassOTP({
            type: 'phone',
            code,
            token,
            firebase_token: idTokenResult?.token,
            phone: formValue.phone,
            phone_country: phone_country,
          }),
        ).unwrap();
      }
      const data = res.d[0];
      setConfirm(null);
      navigation.dispatch(
        StackActions.replace('ForgotPassNewScreen', {
          code: data.code,
          token: data.token,
        }),
      );
      // setValue('');
      // resetTimer(0, false);
    } catch (error: any) {
      if (formValue?.phone) {
        handleAlert({ message: i18next.t('Error.InValidOTP') });
      }
    } finally {
      setIsLoadingOTP(false);
    }
  };

  const onAndroidConfirmCode = async (): Promise<void> => {
    try {
      setIsLoadingOTP(true);
      if (value !== smsOtp) {
        return handleAlert({ message: i18next.t('Error.InValidOTP') });
      }
      const idTokenResult = await auth().currentUser?.getIdTokenResult();
      const res = await dispatch(
        authForgotPassOTP({
          type: 'phone',
          code,
          token,
          firebase_token: idTokenResult?.token,
          phone: formValue.phone,
          phone_country: phone_country,
        }),
      ).unwrap();
      const data = res.d[0];
      setConfirm(null);
      navigation.dispatch(
        StackActions.replace('ForgotPassNewScreen', {
          code: data.code,
          token: data.token,
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingOTP(false);
    }
  };

  useEffect(() => {
    if (formValue.phone) {
      onForgotPassWithPhone();
    } else {
      onCheckFocus();
    }
  }, []);

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
    <ForgotPassCodeView
      isLoadingOTP={isLoadingOTP}
      timerCount={timerCount}
      setTimer={resetTimer}
      codeProp={props}
      phoneCode={phonecode}
      getCellOnLayoutHandle={getCellOnLayoutHandler}
      value={value}
      setValue={setValue}
      onConfirmCode={onConfirmCode}
      formValue={formValue}
      autoFocus={autoFocus}
      onForgotPassWithPhone={onForgotPassWithPhone}
      onForgotWithEmail={onForgotWithEmail}
    />
  );
};

export default ForgotPassCodeScreen;
