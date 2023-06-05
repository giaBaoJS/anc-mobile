import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import KeyScreen from '../../screens/key';

export type KeyStackParamList = {
  KeyScreen: undefined;
};

export type KeyStackRouteProps<RouteName extends keyof KeyStackParamList> =
  RouteProp<KeyStackParamList, RouteName>;

const Stack = createNativeStackNavigator<KeyStackParamList>();

const KeyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="KeyScreen" component={KeyScreen} />
    </Stack.Navigator>
  );
};

export default KeyStack;
