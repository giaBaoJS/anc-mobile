import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetLoginScreen from '../../screens/setLogin';

export type SetLoginStackParamList = {
  SetLoginScreen: undefined;
};

export type SetLoginStackRouteProps<
  RouteName extends keyof SetLoginStackParamList,
> = RouteProp<SetLoginStackParamList, RouteName>;

const Stack = createNativeStackNavigator<SetLoginStackParamList>();

const SetLoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SetLoginScreen" component={SetLoginScreen} />
    </Stack.Navigator>
  );
};

export default SetLoginStack;
