import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import AccountIntroductionScreen from '../../screens/accountIntroduction';

export type AccountIntroductionStackParamList = {
  AccountIntroductionScreen: undefined;
};

export type AccountIntroductionNavigationProp =
  NativeStackNavigationProp<AccountIntroductionStackParamList>;

const Stack = createNativeStackNavigator<AccountIntroductionStackParamList>();

const AccountIntroductionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="AccountIntroductionScreen"
        component={AccountIntroductionScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountIntroductionStack;
