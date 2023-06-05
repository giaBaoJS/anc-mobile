import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResourceScreen from '../../screens/resource';

export type ResourceStackParamList = {
  ResourceScreen: undefined;
};

export type ResourceStackStackRouteProps<
  RouteName extends keyof ResourceStackParamList,
> = RouteProp<ResourceStackParamList, RouteName>;

const Stack = createNativeStackNavigator<ResourceStackParamList>();

const ResourceStackStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ResourceScreen" component={ResourceScreen} />
    </Stack.Navigator>
  );
};

export default ResourceStackStack;
