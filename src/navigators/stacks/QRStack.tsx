import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QRScreen from '../../screens/qr';

export type QRStackParamList = {
  QRScreen: undefined;
};

export type QRStackRouteProps<RouteName extends keyof QRStackParamList> =
  RouteProp<QRStackParamList, RouteName>;

const Stack = createNativeStackNavigator<QRStackParamList>();

const QRStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="QRScreen" component={QRScreen} />
    </Stack.Navigator>
  );
};

export default QRStack;
