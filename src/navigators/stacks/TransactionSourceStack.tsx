import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionSourceScreen from '../../screens/transactionSource';

export type TransactionSourceStackParamList = {
  TransactionSourceScreen: undefined;
};

export type TransactionSourceStackRouteProps<
  RouteName extends keyof TransactionSourceStackParamList,
> = RouteProp<TransactionSourceStackParamList, RouteName>;

const Stack = createNativeStackNavigator<TransactionSourceStackParamList>();

const TransactionSourceStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="TransactionSourceScreen"
        component={TransactionSourceScreen}
      />
    </Stack.Navigator>
  );
};

export default TransactionSourceStack;
