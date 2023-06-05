import React, { useEffect, useState } from 'react';
import { AppState, Linking, NativeModules, Platform } from 'react-native';
import Config from 'react-native-config';
// UUID
import { v4 as uuid } from 'uuid';
import 'react-native-get-random-values';
//Translate
import i18next from 'i18next';
// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import {
  authGetUserInfo,
  authLogin,
  authSocialApple,
  authSocialGoogle,
  onEnableConfig,
} from '../../store/slices/AuthSlice';
// Components
import LoginView from './LoginView';
import { handleAlert } from '../../utils/Notification';
import {
  BIOMETRY_CONFIG,
  onCheckSupportBiometric,
  removeFromStorage,
} from '../../utils/Common';
// Form
import { useForm } from 'react-hook-form';
// Social
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  appleAuthAndroid,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
//Library
import AsyncStorage from '@react-native-community/async-storage';
import * as Keychain from 'react-native-keychain';
import jwtDecode from 'jwt-decode';

const { OpenSettingModule } = NativeModules;

const LoginScreen: React.FC = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.auth);
  const [isSocialLoading, setIsSocialLoading] = useState<boolean>(false);
  const [typeBio, setTypeBio] = useState<string | null>('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
  });

  const handleLogin = async (data: any): Promise<void> => {
    try {
      setIsSocialLoading(true);
      const res = await dispatch(authLogin(data)).unwrap();
      const userLocalStorage = await AsyncStorage.getItem('userName');
      if (userLocalStorage && JSON.parse(userLocalStorage) !== data.username) {
        removeFromStorage('BiometricConfig');
        await Keychain.resetGenericPassword();
      }
      if (res.c === 1) {
        await dispatch(authGetUserInfo()).unwrap();
        setIsSocialLoading(false);
        // navigation.navigate('User');
      } else if (res.c === 2) {
        setIsSocialLoading(false);
        const checkToken = res.d[0].need_verify_2fa;
        if (checkToken.length === 2) {
          // Navigate verify token by sms/google
          const { phone, phone_full, phone_country } = checkToken[0];
          navigation.navigate('LoginVerifyTokenScreen', {
            phoneData: {
              phone,
              phone_full,
              phone_country,
            },
            type2fa: 'sms-google',
          });
        } else if (checkToken[0].type === 'sms') {
          const { phone, phone_full, phone_country } = checkToken[0];
          navigation.navigate('LoginVerifyTokenScreen', {
            phoneData: {
              phone,
              phone_full,
              phone_country,
            },
            type2fa: 'sms',
          });
          // Navigate vetify token by sms
        } else if (checkToken[0].type === 'google_authenticator') {
          navigation.navigate('LoginVerifyTokenScreen', {
            type2fa: 'google',
          });
        }
      }
    } catch (error) {
      console.log(error);
      setIsSocialLoading(false);
    }
  };

  const onTypeBio = async (): Promise<void> => {
    const res = await onCheckSupportBiometric();
    setTypeBio(res);
  };
  const onAutoBiometric = async (): Promise<void> => {
    await onTypeBio();
    const bioConfig = await AsyncStorage.getItem('BiometricConfig');
    if (bioConfig) {
      onLoginWithBiometric();
    }
  };
  const onLoginWithBiometric = async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (typeBio === null) {
        const onPressSetting = (): void => {
          if (Platform.OS === 'ios') {
            Linking.openURL('App-Prefs:TOUCHID_PASSCODE');
          } else {
            OpenSettingModule.securitySettings();
          }
        };
        handleAlert({
          message: i18next.t('Error.LoginBiometricFailOS'),
          buttonText1: i18next.t('Button.Setting'),
          buttonText2: i18next.t('Button.Cancel'),
          onPress1: () => onPressSetting(),
        });
        return;
      }
      const bioConfig = await AsyncStorage.getItem('BiometricConfig');
      if (!bioConfig) {
        await dispatch(onEnableConfig());
        handleAlert({
          message: i18next.t('Error.LoginBiometricFailApp'),
        });
        return;
      }

      const credentials = await Keychain.getGenericPassword(BIOMETRY_CONFIG);
      if (credentials) {
        if (token) {
          const expiredToken: any = jwtDecode(token);
          if (Date.now() > expiredToken.token_exp) {
            handleAlert({
              message: i18next.t('Error.ExpireToken'),
            });
            return;
          }
          await dispatch(authGetUserInfo()).unwrap();

          // navigation.navigate('User');
        }
      } else {
        handleAlert({
          message: i18next.t('Error.LoginBiometricFailNoData'),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onGoogleLogin = async (): Promise<void> => {
    try {
      setIsSocialLoading(true);
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await GoogleSignin.signOut();
      const res = await dispatch(
        authSocialGoogle({ google_token: googleCredential.token }),
      ).unwrap();
      if (res.c === 1) {
        await dispatch(authGetUserInfo()).unwrap();
        // navigation.navigate('User');
      } else if (res.c === 2) {
        setIsSocialLoading(false);
        const checkToken = res.d[0].need_verify_2fa;
        if (checkToken.length === 2) {
          // Navigate verify token by sms/google
          const { phone, phone_full, phone_country } = checkToken[0];
          navigation.navigate('LoginVerifyTokenScreen', {
            phoneData: {
              phone,
              phone_full,
              phone_country,
            },
            type2fa: 'sms-google',
          });
        } else if (checkToken[0].type === 'sms') {
          console.log(checkToken[0]);
          const { phone, phone_full, phone_country } = checkToken[0];
          navigation.navigate('LoginVerifyTokenScreen', {
            phoneData: {
              phone,
              phone_full,
              phone_country,
            },
            type2fa: 'sms',
          });
          // Navigate vetify token by sms
        } else if (checkToken[0].type === 'google_authenticator') {
          navigation.navigate('LoginVerifyTokenScreen', {
            type2fa: 'google',
          });
        }
      } else {
        navigation.navigate('RegisterScreen', { userInfo: res.d[0] });
      }
    } catch (error: any) {
      console.log(errors);
    } finally {
      setIsSocialLoading(false);
    }
  };

  const onAppleLogin = async (): Promise<void> => {
    if (Platform.OS === 'android' && !appleAuthAndroid.isSupported) {
      return handleAlert(i18next.t('Error.NotSupport'));
    }
    try {
      setIsSocialLoading(true);
      let appleToken = null;
      if (Platform.OS === 'ios') {
        //  Start the sign-in request
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        if (!appleAuthRequestResponse.identityToken) {
          throw new Error('Apple Sign-In failed - no identify token returned');
        }
        const { identityToken } = appleAuthRequestResponse;
        appleToken = identityToken;
      } else {
        // Configure the request
        const appleCredential = await appleAuthAndroid.signIn();
        appleToken = appleCredential.id_token;
      }
      const res = await dispatch(
        authSocialApple({
          apple_token: appleToken,
          device: Platform.OS,
        }),
      ).unwrap();
      if (res.c === 1) {
        await dispatch(authGetUserInfo()).unwrap();
        // navigation.navigate('User');
      } else if (res.c === 2) {
        setIsSocialLoading(false);
        const checkToken = res.d[0].need_verify_2fa;
        if (checkToken.length === 2) {
          // Navigate verify token by sms/google
          const { phone, phone_full, phone_country } = checkToken[0];
          navigation.navigate('LoginVerifyTokenScreen', {
            phoneData: {
              phone,
              phone_full,
              phone_country,
            },
            type2fa: 'sms-google',
          });
        } else if (checkToken[0].type === 'sms') {
          const { phone, phone_full, phone_country } = checkToken[0];
          navigation.navigate('LoginVerifyTokenScreen', {
            phoneData: {
              phone,
              phone_full,
              phone_country,
            },
            type2fa: 'sms',
          });
          // Navigate vetify token by sms
        } else if (checkToken[0].type === 'google_authenticator') {
          navigation.navigate('LoginVerifyTokenScreen', {
            type2fa: 'google',
          });
        }
      } else {
        navigation.navigate('RegisterScreen', { userInfo: res.d[0] });
      }
    } catch (error: any) {
      console.log(errors);
    } finally {
      setIsSocialLoading(false);
    }
  };

  const onNavigate = (screen: string): void => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        onTypeBio();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    onTypeBio();
    GoogleSignin.configure({
      webClientId: Config.WEB_CLI_KEY,
    });
    if (Platform.OS === 'android') {
      const rawNonce = uuid();
      const state = uuid();
      appleAuthAndroid.configure({
        // The Service ID you registered with Apple
        clientId: 'com.ceolead.anc.client-android',

        // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
        // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
        redirectUri: 'https://ceoaff.com/auth/apple',

        // The type of response requested - code, id_token, or both.
        responseType: appleAuthAndroid.ResponseType.ALL,

        // The amount of user information requested from Apple.
        scope: appleAuthAndroid.Scope.ALL,
        nonce: rawNonce,
        state,
      });
    }
    onAutoBiometric();
  }, []);

  return (
    <LoginView
      isLoading={isLoading}
      isSocialLoading={isSocialLoading}
      handleLogin={handleLogin}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      onNavigate={onNavigate}
      onGoogleLogin={onGoogleLogin}
      onAppleLogin={onAppleLogin}
      typeBio={typeBio}
      onLoginWithBiometric={onLoginWithBiometric}
    />
  );
};

export default LoginScreen;
