import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginMethodScreen from '../../screens/loginMethod';

export type LoginMethodStackParamList = {
  LoginMethodScreen: undefined;
};

export type LoginMethodStackRouteProps<
  RouteName extends keyof LoginMethodStackParamList,
> = RouteProp<LoginMethodStackParamList, RouteName>;

const Stack = createNativeStackNavigator<LoginMethodStackParamList>();

const LoginMethodStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginMethodScreen" component={LoginMethodScreen} />
    </Stack.Navigator>
  );
};

export default LoginMethodStack;
