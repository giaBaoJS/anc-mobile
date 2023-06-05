import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpAccountScreen from '../../screens/upAccount';

export type UpAccountStackParamList = {
  UpAccountScreen: undefined;
};

export type UpAccountStackRouteProps<
  RouteName extends keyof UpAccountStackParamList,
> = RouteProp<UpAccountStackParamList, RouteName>;

const Stack = createNativeStackNavigator<UpAccountStackParamList>();

const UpAccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="UpAccountScreen" component={UpAccountScreen} />
    </Stack.Navigator>
  );
};

export default UpAccountStack;
