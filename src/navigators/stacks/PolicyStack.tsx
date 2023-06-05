import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PolicyScreen from '../../screens/policy';

export type PolicyStackParamList = {
  PolicyScreen: undefined;
};

export type PolicyStackRouteProps<
  RouteName extends keyof PolicyStackParamList,
> = RouteProp<PolicyStackParamList, RouteName>;

const Stack = createNativeStackNavigator<PolicyStackParamList>();

const PolicyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PolicyScreen" component={PolicyScreen} />
    </Stack.Navigator>
  );
};

export default PolicyStack;
