import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PolicyPatternScreen from '../../screens/policyPattern';

export type PatternStackParamList = {
  PolicyPatternScreen: undefined;
};

export type PatternStackRouteProps<
  RouteName extends keyof PatternStackParamList,
> = RouteProp<PatternStackParamList, RouteName>;

const Stack = createNativeStackNavigator<PatternStackParamList>();

const PolicyPatternStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="PolicyPatternScreen"
        component={PolicyPatternScreen}
      />
    </Stack.Navigator>
  );
};

export default PolicyPatternStack;
