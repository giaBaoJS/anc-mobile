import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionRoleScreen from '../../screens/transactionRole';

export type TransactionRoleStackParamList = {
  TransactionRoleScreen: undefined;
};

export type TransactionRoleStackStackRouteProps<
  RouteName extends keyof TransactionRoleStackParamList,
> = RouteProp<TransactionRoleStackParamList, RouteName>;

const Stack = createNativeStackNavigator<TransactionRoleStackParamList>();

const TransactionRoleStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="TransactionRoleScreen"
        component={TransactionRoleScreen}
      />
    </Stack.Navigator>
  );
};

export default TransactionRoleStack;
