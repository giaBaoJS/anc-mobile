import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletScreen from '../../screens/wallet';

export type WalletStackParamList = {
  WalletScreen: undefined;
};

export type WalletStackRouteProps<
  RouteName extends keyof WalletStackParamList,
> = RouteProp<WalletStackParamList, RouteName>;

const Stack = createNativeStackNavigator<WalletStackParamList>();

const WalletStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
    </Stack.Navigator>
  );
};

export default WalletStack;
