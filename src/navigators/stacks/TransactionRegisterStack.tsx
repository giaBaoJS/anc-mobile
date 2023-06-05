import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionRegisterScreen from '../../screens/transactionRegister';

export type TransactionRegisterStackParamList = {
  TransactionRegisterScreen: undefined;
};

export type TransactionRegisterStackRouteProps<
  RouteName extends keyof TransactionRegisterStackParamList,
> = RouteProp<TransactionRegisterStackParamList, RouteName>;

const Stack = createNativeStackNavigator<TransactionRegisterStackParamList>();

const TransactionRegisterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="TransactionRegisterScreen"
        component={TransactionRegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default TransactionRegisterStack;
