import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import AccountManagementScreen from '../../screens/accountManagement';

export type AccountManagementStackParamList = {
  AccountManagementScreen: undefined;
};

export type PersonalPolicyTemplateNavigationProp =
  NativeStackNavigationProp<AccountManagementStackParamList>;

const Stack = createNativeStackNavigator<AccountManagementStackParamList>();

const AccountManagementStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="AccountManagementScreen"
        component={AccountManagementScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountManagementStack;
