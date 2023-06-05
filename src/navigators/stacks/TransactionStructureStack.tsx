import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionStructureScreen from '../../screens/transactionStructure';

export type TransactionStructureStackParamList = {
  TransactionStructureScreen: undefined;
};

export type TransactionStructureStackRouteProps<
  RouteName extends keyof TransactionStructureStackParamList,
> = RouteProp<TransactionStructureStackParamList, RouteName>;

const Stack = createNativeStackNavigator<TransactionStructureStackParamList>();

const TransactionStructureStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="TransactionStructureScreen"
        component={TransactionStructureScreen}
      />
    </Stack.Navigator>
  );
};

export default TransactionStructureStack;
