import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserSettingLayoutScreen from '../../screens/userSettingLayout';

export type UserSettingLayoutStackParamList = {
  UserSettingLayoutScreen: undefined;
};

export type UserSettingLayoutStackRouteProps<
  RouteName extends keyof UserSettingLayoutStackParamList,
> = RouteProp<UserSettingLayoutStackParamList, RouteName>;

const Stack = createNativeStackNavigator<UserSettingLayoutStackParamList>();

const UserSettingLayoutStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="UserSettingLayoutScreen"
        component={UserSettingLayoutScreen}
      />
    </Stack.Navigator>
  );
};

export default UserSettingLayoutStack;
