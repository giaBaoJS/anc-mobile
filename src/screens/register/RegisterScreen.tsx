import React, { useState, useRef, useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import RegisterView from './RegisterView';
// Form
import { useForm, useWatch } from 'react-hook-form';
import {
  LoginStackNavigationProp,
  LoginStackRouteProps,
} from '../../navigators/stacks/LoginStack';
// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import { authRegistValidator } from '../../store/slices/AuthSlice';
import {
  AuthRegisterValidationField,
  GOOGLE_API_APP_MAPPING,
} from '../../models/Auth';
// Social
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  appleAuthAndroid,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import { handleAlert } from '../../utils/Notification';
import i18next from 'i18next';
import jwtDecode from 'jwt-decode';
import { convertFromApiToApp } from '../../services/ApiCall';
import { formatFirstZero } from '../../utils/Common';

interface Props {
  navigation: LoginStackNavigationProp;
  route: LoginStackRouteProps<'RegisterScreen'>;
}

const RegisterScreen = ({ navigation, route }: Props) => {
  const { params } = route;
  // Redux
  const { isLoading } = useAppSelector(state => state.auth);
  const [isSocialLoading, setIsSocialLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // Form
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    trigger,
  } = useForm({ mode: 'all' });

  const passwordRef = useRef({});
  passwordRef.current = watch('password', '');
  const rePasswordRef = useRef({});
  rePasswordRef.current = watch('re_password', '');

  useEffect(() => {
    if (rePasswordRef?.current !== '') {
      trigger('re_password');
    }
  }, [passwordRef.current]);

  const [phoneCode, setPhoneCode] = useState<string>('84');
  const [phoneCountry, setPhoneCountry] = useState<any>('VN');
  const [googleToken, setGoogleToken] = useState<any>('');
  const [appleToken, setAppleToken] = useState<any>('');
  const [email, setEmail] = useState<any>('');

  const handleRegister = async (data: any): Promise<void> => {
    const phoneFormat = formatFirstZero(data.phone);
    const registerField: AuthRegisterValidationField = {
      ...data,
      phone: phoneFormat,
      phone_country: phoneCountry,
      google_token: googleToken,
      apple_token: appleToken,
      device: Platform.OS,
      email,
    };
    console.log(registerField);
    await dispatch(authRegistValidator(registerField)).unwrap();
    navigation.navigate('OTPScreen', { userData: registerField, phoneCode });
  };

  const onGoogleLogin = async (): Promise<void> => {
    try {
      setIsSocialLoading(true);
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await GoogleSignin.signOut();
      const decode = jwtDecode(googleCredential.token);
      const convertApi = convertFromApiToApp(decode, GOOGLE_API_APP_MAPPING);
      navigation.setParams({
        userInfo: { ...convertApi, google_token: googleCredential.token },
      });
      setIsSocialLoading(false);
    } catch (error: any) {
      setIsSocialLoading(false);
      console.log(error);
    }
  };

  const onAppleLogin = async (): Promise<void> => {
    if (Platform.OS === 'android' && !appleAuthAndroid.isSupported) {
      return handleAlert(i18next.t('Error.NotSupport'));
    }
    try {
      setIsSocialLoading(true);
      let appleAuthToken: any = null;
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
        appleAuthToken = identityToken;
      } else {
        // Configure the request
        const appleCredential = await appleAuthAndroid.signIn();
        appleAuthToken = appleCredential.id_token;
      }
      const decode = jwtDecode(appleAuthToken);
      const convertApi = convertFromApiToApp(decode, GOOGLE_API_APP_MAPPING);
      navigation.setParams({
        userInfo: { ...convertApi, apple_token: appleAuthToken },
      });
      // navigation.setParams({ userInfo: res.d[0] });
      setIsSocialLoading(false);
    } catch (error: any) {
      setIsSocialLoading(false);
      console.log(errors);
      // handleAlert(error.toString(), () => setIsSocialLoading(false));
    }
  };

  const onOpenPolicy = (): void => {
    Linking.openURL('https://www.ceolead.com/');
  };
  const onGoback = (): void => {
    navigation.goBack();
  };

  useEffect(() => {
    if (params?.presenter) {
      setValue('present_code', params.presenter);
    }
    if (params?.userInfo) {
      Object.entries(params?.userInfo).forEach(([name, value]: any) => {
        if (name === 'google_token' && value) {
          setGoogleToken(value);
          setAppleToken('');
        }
        if (name === 'apple_token' && value) {
          setAppleToken(value);
          setGoogleToken('');
        }
        setValue(name, value);
      });
    }
  }, [params]);
  return (
    <RegisterView
      isLoading={isLoading}
      isSocialLoading={isSocialLoading}
      handleRegister={handleRegister}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      phoneCode={phoneCode}
      setPhoneCode={setPhoneCode}
      phoneCountry={phoneCountry}
      setPhoneCountry={setPhoneCountry}
      passwordRef={passwordRef}
      onOpenPolicy={onOpenPolicy}
      onGoback={onGoback}
      onGoogleLogin={onGoogleLogin}
      onAppleLogin={onAppleLogin}
      googleToken={googleToken}
      appleToken={appleToken}
    />
  );
};

export default RegisterScreen;
