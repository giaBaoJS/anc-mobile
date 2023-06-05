import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserInfoScreen from '../../screens/userInfo';
import ChangePassStack from './ChangePassStack';
import LoginMethodStack from './LoginMethodStack';
import SetPinStack from './SetPinStack';
import FactorAuthenticationStack from './FactorAuthenticationStack';
import SetLoginStack from './SetLoginStack';
import HistoryStack from './HistoryStack';

export type UserInfoStackParamList = {
  UserInfoScreen: undefined;
  FactorAuthenticationStack: undefined;
  ChangePassStack: undefined;
  LoginMethodStack: undefined;
  SetPinStack: undefined;
  SetLoginStack: undefined;
  HistoryStack: undefined;
};

export type UserInfoStackRouteProps<
  RouteName extends keyof UserInfoStackParamList,
> = RouteProp<UserInfoStackParamList, RouteName>;

const Stack = createNativeStackNavigator<UserInfoStackParamList>();

const UserInfoStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
      <Stack.Screen name="ChangePassStack" component={ChangePassStack} />
      <Stack.Screen
        name="FactorAuthenticationStack"
        component={FactorAuthenticationStack}
      />
      <Stack.Screen name="LoginMethodStack" component={LoginMethodStack} />
      <Stack.Screen name="SetPinStack" component={SetPinStack} />
      <Stack.Screen name="SetLoginStack" component={SetLoginStack} />
      <Stack.Screen name="HistoryStack" component={HistoryStack} />
    </Stack.Navigator>
  );
};

export default UserInfoStack;
