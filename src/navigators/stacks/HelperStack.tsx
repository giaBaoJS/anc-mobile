import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HelperScreen from '../../screens/helper';

export type HelperStackParamList = {
  HelperScreen: undefined;
};

export type HelperStackRouteProps<
  RouteName extends keyof HelperStackParamList,
> = RouteProp<HelperStackParamList, RouteName>;

const Stack = createNativeStackNavigator<HelperStackParamList>();

const HelperStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HelperScreen" component={HelperScreen} />
    </Stack.Navigator>
  );
};

export default HelperStack;
