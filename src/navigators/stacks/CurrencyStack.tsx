import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CurrencyScreen from '../../screens/currency';

export type CurrencyStackParamList = {
  CurrencyScreen: undefined;
};

export type CurrencyStackRouteProps<
  RouteName extends keyof CurrencyStackParamList,
> = RouteProp<CurrencyStackParamList, RouteName>;

const Stack = createNativeStackNavigator<CurrencyStackParamList>();

const CurrencyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CurrencyScreen" component={CurrencyScreen} />
    </Stack.Navigator>
  );
};

export default CurrencyStack;
