import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import UserScreen from '../../screens/user';
import UserSettingScreen from '../../screens/userSetting';
import {
  ApiKeyCodeStack,
  HambugerStack,
  PolicyPatternStack,
  ProjectStack,
  TransactionRoleStack,
  TransactionSourceStack,
  UserSettingLayoutStack,
  UserSettingStack,
} from '.';

export type UserStackParamList = {
  UserScreen: undefined;
  UserSettingScreen: undefined;
  ProjectStack: undefined;
  TransactionSourceStack: undefined;
  ApiKeyCodeStack: undefined;
  PolicyPatternStack: undefined;
  TransactionRoleStack: undefined;
  HomeSettingScreen: undefined;
  UserSettingStack: undefined;
  HambugerStack: undefined;
  UserSettingLayoutStack: undefined;
};

export type UserStackNavigationProp =
  NativeStackNavigationProp<UserStackParamList>;

export type UserStackRouteProps<RouteName extends keyof UserStackParamList> =
  RouteProp<UserStackParamList, RouteName>;

const Stack = createNativeStackNavigator<UserStackParamList>();

const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen name="ProjectStack" component={ProjectStack} />
      <Stack.Screen name="ApiKeyCodeStack" component={ApiKeyCodeStack} />
      <Stack.Screen
        name="TransactionSourceStack"
        component={TransactionSourceStack}
      />
      <Stack.Screen name="UserSettingScreen" component={UserSettingScreen} />
      <Stack.Screen name="PolicyPatternStack" component={PolicyPatternStack} />
      <Stack.Screen
        name="TransactionRoleStack"
        component={TransactionRoleStack}
      />
      <Stack.Screen name="UserSettingStack" component={UserSettingStack} />
      <Stack.Screen
        name="UserSettingLayoutStack"
        component={UserSettingLayoutStack}
      />
      <Stack.Screen name="HambugerStack" component={HambugerStack} />
    </Stack.Navigator>
  );
};

export default UserStack;
