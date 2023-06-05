import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/login';
import RegisterScreen from '../../screens/register';
import QRScreen from '../../screens/qr';
import OTPScreen from '../../screens/otp';
import {
  AuthGoogleField,
  AuthRegisterValidationField,
} from '../../models/Auth';
import { ForgotPassStack } from '.';
import LoginVerifyTokenScreen from '../../screens/loginVerifyToken/LoginVerifyTokenScreen';

export type LoginStackParamList = {
  LoginScreen: { fromRoute?: string };
  ForgotPassStack: undefined;
  RegisterScreen: { userInfo?: AuthGoogleField; presenter?: string };
  QRScreen: { fromRoute?: string };
  OTPScreen: {
    userData: AuthRegisterValidationField;
    phoneCode: string;
  };
  LoginVerifyTokenScreen: {
    phoneData?: {
      phone: string;
      phone_country: string;
      phone_full: string;
    };
    type2fa: string;
  };
};

export type LoginStackNavigationProp =
  NativeStackNavigationProp<LoginStackParamList>;

export type LoginStackRouteProps<RouteName extends keyof LoginStackParamList> =
  RouteProp<LoginStackParamList, RouteName>;

const Stack = createNativeStackNavigator<LoginStackParamList>();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassStack" component={ForgotPassStack} />
      <Stack.Screen name="QRScreen" component={QRScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen
        name="LoginVerifyTokenScreen"
        component={LoginVerifyTokenScreen}
      />
    </Stack.Navigator>
  );
};

export default LoginStack;
