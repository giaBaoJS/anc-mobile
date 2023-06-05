import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import ForgotPassScreen from '../../screens/forgotPass';
import ForgotPassResetScreen from '../../screens/forgotPassReset';
import ForgotPassCodeScreen from '../../screens/forgotPassCode';
import ForgotPassNewScreen from '../../screens/forgotPassNew';

export type formValueType = {
  email: string;
  phone: string;
};
export type ForgotPassStackParamList = {
  ForgotPassScreen: undefined;
  ForgotPassResetScreen: { byEmail: boolean };
  ForgotPassCodeScreen: {
    formValue: formValueType;
    token: string;
    code: string;
    phonecode?: string;
    phone_country?: string;
  };
  ForgotPassNewScreen: { token: string; code: string };
};
export type ForgotPassStackNavigationProp =
  NativeStackNavigationProp<ForgotPassStackParamList>;

export type ForgotPassStackRouteProps<
  RouteName extends keyof ForgotPassStackParamList,
> = RouteProp<ForgotPassStackParamList, RouteName>;

const Stack = createNativeStackNavigator<ForgotPassStackParamList>();

const ForgotPassStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ForgotPassScreen" component={ForgotPassScreen} />
      <Stack.Screen
        name="ForgotPassResetScreen"
        component={ForgotPassResetScreen}
      />
      <Stack.Screen
        name="ForgotPassCodeScreen"
        component={ForgotPassCodeScreen}
      />
      <Stack.Screen
        name="ForgotPassNewScreen"
        component={ForgotPassNewScreen}
      />
    </Stack.Navigator>
  );
};

export default ForgotPassStack;
