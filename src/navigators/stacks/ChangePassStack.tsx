import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePassScreen from '../../screens/changepass';

export type ChangePassStackParamList = {
  ChangePassScreen: undefined;
};

export type ChangePassStackRouteProps<
  RouteName extends keyof ChangePassStackParamList,
> = RouteProp<ChangePassStackParamList, RouteName>;

const Stack = createNativeStackNavigator<ChangePassStackParamList>();

const ChangePassStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ChangePassScreen" component={ChangePassScreen} />
    </Stack.Navigator>
  );
};

export default ChangePassStack;
