import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { StackActions } from '@react-navigation/routers';
import FactorAuthRemoveGoogleView from './FactorAuthRemoveGoogleView';
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
import {
  securityDetele2FaGoogleAuth,
  securityGet2FaToken,
} from '../../store/slices/SecuritySlice';

interface Props {
  navigation: any;
  route: LoginStackRouteProps<'LoginVerifyTokenScreen'>;
}

const FactorAuthRemoveGoogleScreen = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const { accessToken, userInfo } = useAppSelector(state => state.auth);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const smsCode = getValues('phone');
  const googleCode = getValues('google');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [smsOtp, setSmsOtp] = useState<any>(null);
  const [isLoadingOTP, setIsLoadingOTP] = useState<boolean>(false);
  const { isLoading } = useAppSelector(state => state.auth);
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
      if (userInfo) {
        confirmation = await auth().signInWithPhoneNumber(
          userInfo?.phone.phone_full,
        );
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
  };

  useEffect(() => {
    onSignInWithPhone();
  }, []);

  const onConfirmCode = async (): Promise<void> => {
    try {
      setIsLoadingOTP(true);
      let res;
      if (userInfo) {
        await confirm.confirm(smsCode);
        const idTokenResult = await auth().currentUser?.getIdTokenResult();
        res = await dispatch(
          securityGet2FaToken({
            is_only_sms: 1,
            firebase_token: idTokenResult?.token,
            phone: userInfo.phone.phone,
            phone_country: userInfo.phone.phone_country,
            google_authent_otp: googleCode,
          }),
        ).unwrap();
      }
      const code2Fa = res.d[0];
      await dispatch(
        securityDetele2FaGoogleAuth({ ...code2Fa, otp_code: googleCode }),
      ).unwrap();
      setIsLoadingOTP(false);
      navigation.dispatch(StackActions.popToTop());
    } catch (error: any) {
      setIsLoadingOTP(false);
      clearTimeout(timer);
      if (error.toString().includes('auth/invalid-verification-code')) {
        handleAlert({
          message: i18next.t('Error.InValidOTP'),
        });
      } else {
        resetTimer(0, false);
      }
    }
  };
  const onAndroidConfirmCode = async (): Promise<void> => {
    try {
      setIsLoadingOTP(true);
      if (smsCode !== smsOtp) {
        setIsLoadingOTP(false);
        return handleAlert({ message: i18next.t('Error.InValidOTP') });
      }
      let res;
      if (userInfo) {
        await confirm.confirm(smsCode);
        const idTokenResult = await auth().currentUser?.getIdTokenResult();
        res = await dispatch(
          securityGet2FaToken({
            is_only_sms: 1,
            firebase_token: idTokenResult?.token,
            phone: userInfo.phone.phone,
            phone_country: userInfo.phone.phone_country,
            google_authent_otp: googleCode,
          }),
        ).unwrap();
      }
      const code2Fa = res.d[0];
      await dispatch(
        securityDetele2FaGoogleAuth({ ...code2Fa, otp_code: googleCode }),
      ).unwrap();
      setIsLoadingOTP(false);
      navigation.dispatch(StackActions.popToTop());
    } catch (error) {
      setIsLoadingOTP(false);
      clearTimeout(timer);
      console.log(error);
    }
  };

  const onConfirm2Fa = (): void => {
    if (currentUser?.uid && Platform.OS === 'android') {
      onAndroidConfirmCode();
    } else {
      onConfirmCode();
    }
  };

  const otpHandler = (message: string) => {
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
    <FactorAuthRemoveGoogleView
      isLoading={isLoading}
      isLoadingOTP={isLoadingOTP}
      timerCount={timerCount}
      setTimer={resetTimer}
      phoneData={userInfo?.phone}
      onSignInWithPhone={onSignInWithPhone}
      onConfirm2Fa={onConfirm2Fa}
      autoFocus={autoFocus}
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
};

export default FactorAuthRemoveGoogleScreen;
