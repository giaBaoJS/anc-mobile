import React, { useCallback, useEffect, useState } from 'react';
import { AppState, Linking, NativeModules, Platform } from 'react-native';
//Translate
import i18next from 'i18next';
//Library
import AsyncStorage from '@react-native-community/async-storage';
import * as Keychain from 'react-native-keychain';
//Common
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import { handleAlert } from '../../utils/Notification';
import { BIOMETRY_CONFIG, onCheckSupportBiometric } from '../../utils/Common';
import LoginMethodView from './LoginMethodView';
import {
  checkMethodLogin,
  disableLoginApple,
  disableLoginGoogle,
  enableLoginApple,
  enableLoginGoogle,
} from '../../store/slices/LoginMethodSlice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import appleAuth, {
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import { authGetUserInfo } from '../../store/slices/AuthSlice';
import ReactNativeBiometrics from 'react-native-biometrics';

export interface LoginMethodField {
  google: boolean;
  apple: boolean;
}
const { OpenSettingModule } = NativeModules;

const LoginMethodScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { statusLogin } = useAppSelector(state => state.loginMethod);
  const { userInfo } = useAppSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [typeBio, setTypeBio] = useState<string | null>('');
  const [isBioEnable, setIsBioEnable] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState<LoginMethodField>({
    google: statusLogin.status_google_login,
    apple: statusLogin.status_apple_login,
  });
  const onCheckSupport = async (): Promise<void> => {
    const res = await onCheckSupportBiometric();
    if (res === null) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);
    setTypeBio(res);
  };
  const onActiveGoogle = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (statusLogin.status_google_login) {
        await dispatch(disableLoginGoogle()).unwrap();
        await dispatch(authGetUserInfo()).unwrap();
        setIsLoading(false);
        return;
      }
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await GoogleSignin.signOut();
      await dispatch(enableLoginGoogle(googleCredential.token)).unwrap();
      await dispatch(authGetUserInfo()).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [statusLogin]);
  const onActiveApple = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (statusLogin.status_apple_login) {
        await dispatch(disableLoginApple()).unwrap();
        await dispatch(authGetUserInfo()).unwrap();
        setIsLoading(false);
        return;
      }
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
      await dispatch(
        enableLoginApple({ apple_token: appleToken, device: Platform.OS }),
      ).unwrap();
      await dispatch(authGetUserInfo()).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [statusLogin]);

  const onActiveBiometric = async (): Promise<void> => {
    try {
      if (!isSupported) {
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
      setIsLoading(true);
      if (isBioEnable) {
        const confirmBio = await ReactNativeBiometrics.simplePrompt({
          promptMessage: i18next.t('Common.ConfirmBio'),
        });
        if (confirmBio.success) {
          await AsyncStorage.removeItem('BiometricConfig');
        } else {
          setIsLoading(false);
          return;
        }
      } else {
        const confirmBio = await ReactNativeBiometrics.simplePrompt({
          promptMessage: i18next.t('Common.ConfirmBio'),
        });
        if (confirmBio.success) {
          await AsyncStorage.setItem(
            'BiometricConfig',
            JSON.stringify(!isBioEnable),
          );
          if (userInfo) {
            await AsyncStorage.setItem(
              'userName',
              JSON.stringify(userInfo.username),
            );
            await Keychain.setGenericPassword(
              userInfo.username,
              userInfo.uid,
              BIOMETRY_CONFIG,
            );
          }
        } else {
          setIsLoading(false);
          return;
        }
      }
      setIsBioEnable(!isBioEnable);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    } catch (err) {
      console.log(err);
    }
  };

  const onCurrentConfig = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const bioConfig = await AsyncStorage.getItem('BiometricConfig');
      if (bioConfig) {
        const status = JSON.parse(bioConfig);
        setIsBioEnable(status);
      }
      await dispatch(checkMethodLogin()).unwrap();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsEnabled({
      google: statusLogin.status_google_login,
      apple: statusLogin.status_apple_login,
    });
  }, [statusLogin]);

  useEffect(() => {
    onCheckSupport();
    onCurrentConfig();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        onCheckSupport();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <LoginMethodView
      isLoading={isLoading}
      isEnabled={isEnabled}
      isBioEnbale={isBioEnable}
      isSupported={isSupported}
      typeBio={typeBio}
      onActiveBiometric={onActiveBiometric}
      onActiveGoogle={onActiveGoogle}
      onActiveApple={onActiveApple}
      userInfo={userInfo}
    />
  );
};

export default LoginMethodScreen;
