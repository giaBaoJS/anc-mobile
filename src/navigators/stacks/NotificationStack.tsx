import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationScreen from '../../screens/notification';

export type NotificationStackParamList = {
  NotificationScreen: undefined;
};

export type NotificationStackRouteProps<
  RouteName extends keyof NotificationStackParamList,
> = RouteProp<NotificationStackParamList, RouteName>;

const Stack = createNativeStackNavigator<NotificationStackParamList>();

const NotificationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default NotificationStack;
