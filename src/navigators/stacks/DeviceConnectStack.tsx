import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DeviceConnectScreen from '../../screens/deviceConnect';

export type DeviceConnectStackParamList = {
  DeviceConnectScreen: undefined;
};

export type DeviceConnectStackRouteProps<
  RouteName extends keyof DeviceConnectStackParamList,
> = RouteProp<DeviceConnectStackParamList, RouteName>;

const Stack = createNativeStackNavigator<DeviceConnectStackParamList>();

const DeviceConnectStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="DeviceConnectScreen"
        component={DeviceConnectScreen}
      />
    </Stack.Navigator>
  );
};

export default DeviceConnectStack;
