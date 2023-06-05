import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinkScreen from '../../screens/link';

export type LinkStackParamList = {
  LinkScreen: undefined;
};

export type LinkStackRouteProps<RouteName extends keyof LinkStackParamList> =
  RouteProp<LinkStackParamList, RouteName>;

const Stack = createNativeStackNavigator<LinkStackParamList>();

const LinkStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LinkScreen" component={LinkScreen} />
    </Stack.Navigator>
  );
};

export default LinkStack;
