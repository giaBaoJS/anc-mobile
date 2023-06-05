import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetPinScreen from '../../screens/setPin';

export type SetPinStackParamList = {
  SetPinScreen: undefined;
};

export type SetPinStackRouteProps<
  RouteName extends keyof SetPinStackParamList,
> = RouteProp<SetPinStackParamList, RouteName>;

const Stack = createNativeStackNavigator<SetPinStackParamList>();

const SetPinStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SetPinScreen" component={SetPinScreen} />
    </Stack.Navigator>
  );
};

export default SetPinStack;
