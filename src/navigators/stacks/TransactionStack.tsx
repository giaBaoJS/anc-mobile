import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionScreen from '../../screens/transaction';

export type TransactionStackParamList = {
  TransactionScreen: undefined;
};

export type TransactionStackRouteProps<
  RouteName extends keyof TransactionStackParamList,
> = RouteProp<TransactionStackParamList, RouteName>;

const Stack = createNativeStackNavigator<TransactionStackParamList>();

const TransactionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="TransactionScreen" component={TransactionScreen} />
    </Stack.Navigator>
  );
};

export default TransactionStack;
