import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryScreen from '../../screens/history';

export type HistoryStackParamList = {
  HistoryScreen: undefined;
};

export type HistoryStackRouteProps<
  RouteName extends keyof HistoryStackParamList,
> = RouteProp<HistoryStackParamList, RouteName>;

const Stack = createNativeStackNavigator<HistoryStackParamList>();

const HistoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
    </Stack.Navigator>
  );
};

export default HistoryStack;
