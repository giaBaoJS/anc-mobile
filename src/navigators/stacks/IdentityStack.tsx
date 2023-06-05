import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IdentityScreen from '../../screens/identity';

export type IdentityStackParamList = {
  IdentityScreen: undefined;
};

export type IdentityStackRouteProps<
  RouteName extends keyof IdentityStackParamList,
> = RouteProp<IdentityStackParamList, RouteName>;

const Stack = createNativeStackNavigator<IdentityStackParamList>();

const IdentityStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="IdentityScreen" component={IdentityScreen} />
    </Stack.Navigator>
  );
};

export default IdentityStack;
