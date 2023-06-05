import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import KYCScreen from '../../screens/kyc';

export type KYCStackParamList = {
  KYCScreen: undefined;
};

export type KYCNavigationProp = NativeStackNavigationProp<KYCStackParamList>;

const Stack = createNativeStackNavigator<KYCStackParamList>();

const KYCStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="KYCScreen" component={KYCScreen} />
    </Stack.Navigator>
  );
};

export default KYCStack;
