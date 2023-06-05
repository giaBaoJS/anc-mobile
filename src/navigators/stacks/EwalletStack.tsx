import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EwalletScreen from '../../screens/ewallet';

export type EwalletStackParamList = {
  EwalletScreen: undefined;
};

export type EwalletStackRouteProps<
  RouteName extends keyof EwalletStackParamList,
> = RouteProp<EwalletStackParamList, RouteName>;

const Stack = createNativeStackNavigator<EwalletStackParamList>();

const EwalletStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="EwalletScreen" component={EwalletScreen} />
    </Stack.Navigator>
  );
};

export default EwalletStack;
