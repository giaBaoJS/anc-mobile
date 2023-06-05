import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionPropertiesScreen from '../../screens/transactionProperties';

export type TransactionPropertiesStackParamList = {
  TransactionPropertiesScreen: undefined;
};

export type TransactionPropertiesStackRouteProps<
  RouteName extends keyof TransactionPropertiesStackParamList,
> = RouteProp<TransactionPropertiesStackParamList, RouteName>;

const Stack = createNativeStackNavigator<TransactionPropertiesStackParamList>();

const TransactionPropertiesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="TransactionPropertiesScreen"
        component={TransactionPropertiesScreen}
      />
    </Stack.Navigator>
  );
};

export default TransactionPropertiesStack;
