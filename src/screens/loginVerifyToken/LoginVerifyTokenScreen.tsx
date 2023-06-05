import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import LoginVerifyView from './LoginVerifyView';
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
import { useForm } from 'react-hook-form';
import { securityGet2FaToken } from '../../store/slices/SecuritySlice';
import {
  authGetUserInfo,
  authVerifyLoginToken,
} from '../../store/slices/AuthSlice';

interface Props {
  navigation: any;
  route: LoginStackRouteProps<'LoginVerifyTokenScreen'>;
}

const LoginVerifyTokenScreen = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector(state => state.auth);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const smsCode = getValues('phone');
  const googleCode = getValues('google');
  const { phoneData, type2fa } = route.params;
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [smsOtp, setSmsOtp] = useState<any>(null);
  const [isLoadingOTP, setIsLoadingOTP] = useState<boolean>(false);
  const { isLoading } = useAppSelector(state => state.auth);
  const [timerCount, resetTimer] = useTimer();
  const [confirm, setConfirm] = useState<any>(null);
  const [autoFocus, setAutoFocus] = useState<boolean>(false);

  let timer: any;
  const onSignOut = useCallback(async (): Promise<void> => {
    const user = auth().currentUser;
    if (user?.uid) {
      await auth().signOut();
      setCurrentUser(null);
    }
  }, []);

  // Handle the button press
  const onSignInWithPhone = useCallback(async (): Promise<void> => {
    try {
      setIsLoadingOTP(true);
      setAutoFocus(false);
      setValue('phone', '');
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
      if (phoneData) {
        confirmation = await auth().signInWithPhoneNumber(phoneData.phone_full);
      }
      checkTimeout = confirmation;
      setConfirm(confirmation);
      resetTimer(59, true);
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
  }, [smsCode]);

  useEffect(() => {
    if (type2fa === 'sms' || type2fa === 'sms-google') {
      onSignInWithPhone();
    }
  }, []);

  const onConfirmCode = useCallback(async (): Promise<void> => {
    try {
      setIsLoadingOTP(true);
      let res;
      if (phoneData) {
        await confirm.confirm(smsCode);
        const idTokenResult = await auth().currentUser?.getIdTokenResult();
        if (type2fa === 'sms') {
          res = await dispatch(
            securityGet2FaToken({
              firebase_token: idTokenResult?.token,
              phone: phoneData?.phone,
              phone_country: phoneData?.phone_country,
            }),
          ).unwrap();
        } else if (type2fa === 'sms-google') {
          res = await dispatch(
            securityGet2FaToken({
              firebase_token: idTokenResult?.token,
              phone: phoneData?.phone,
              phone_country: phoneData?.phone_country,
              google_authent_otp: googleCode,
            }),
          ).unwrap();
        }
      } else {
        res = await dispatch(
          securityGet2FaToken({
            google_authent_otp: googleCode,
          }),
        ).unwrap();
      }
      const code2Fa = res.d[0];
      await dispatch(
        authVerifyLoginToken({ ...code2Fa, token: accessToken.token }),
      ).unwrap();
      setIsLoadingOTP(false);
      await dispatch(authGetUserInfo()).unwrap();
      // navigation.navigate('User');
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
      } else {
        resetTimer(0, false);
      }
    }
  }, [smsCode, googleCode]);

  const onAndroidConfirmCode = useCallback(async (): Promise<void> => {
    try {
      setIsLoadingOTP(true);
      if (smsCode !== smsOtp) {
        setIsLoadingOTP(false);
        return handleAlert({ message: i18next.t('Error.InValidOTP') });
      }
      const idTokenResult = await auth().currentUser?.getIdTokenResult();
      let res;
      if (type2fa === 'sms') {
        res = await dispatch(
          securityGet2FaToken({
            firebase_token: idTokenResult?.token,
            phone: phoneData?.phone,
            phone_country: phoneData?.phone_country,
          }),
        ).unwrap();
      } else if (type2fa === 'sms-google') {
        res = await dispatch(
          securityGet2FaToken({
            firebase_token: idTokenResult?.token,
            phone: phoneData?.phone,
            phone_country: phoneData?.phone_country,
            google_authent_otp: googleCode,
          }),
        ).unwrap();
      }
      const code2Fa = res.d[0];
      await dispatch(
        authVerifyLoginToken({ ...code2Fa, token: accessToken.token }),
      ).unwrap();
      setIsLoadingOTP(false);
      await dispatch(authGetUserInfo()).unwrap();
      // navigation.navigate('User');
    } catch (error: any) {
      console.log(error);
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
  }, [smsCode, googleCode]);

  const onConfirm2Fa = (): void => {
    if (
      currentUser?.uid &&
      (type2fa === 'sms' || type2fa === 'sms-google') &&
      Platform.OS === 'android'
    ) {
      onAndroidConfirmCode();
    } else {
      onConfirmCode();
    }
  };
  useEffect(() => {
    if (
      (smsCode?.length === 6 && type2fa === 'sms') ||
      (googleCode?.length === 6 && type2fa === 'google') ||
      (smsCode?.length === 6 &&
        googleCode?.length === 6 &&
        type2fa === 'sms-google')
    ) {
      onConfirm2Fa();
    }
  }, [smsCode, googleCode]);

  const otpHandler = useCallback((message: string) => {
    console.log(message);
    if (message && message !== '' && message !== 'Timeout Error.') {
      const otp = otpFormat(message);
      if (!isNaN(otp)) {
        setSmsOtp(otp);
        handleAlert({
          message: `${i18next.t('Permission.Sms')}\n${message}`,
          buttonText1: i18next.t('Button.Accept'),
          onPress1: () => setValue('phone', otp),
          buttonText2: i18next.t('Button.Reject'),
        });
        RNOtpVerify.removeListener();
      }
    }
  }, []);

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
  const onAuthStateChanged = useCallback((user: any) => {
    console.log('currentUser', user);
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoginVerifyView
      isLoading={isLoading}
      isLoadingOTP={isLoadingOTP}
      timerCount={timerCount}
      setTimer={resetTimer}
      phoneData={phoneData}
      onSignInWithPhone={onSignInWithPhone}
      onConfirm2Fa={onConfirm2Fa}
      autoFocus={autoFocus}
      type2fa={type2fa}
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
};

export default LoginVerifyTokenScreen;
