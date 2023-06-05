import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SynthesisScreen from '../../screens/synthesis';

export type SynthesisStackParamList = {
  SynthesisScreen: undefined;
};

export type SynthesisStackRouteProps<
  RouteName extends keyof SynthesisStackParamList,
> = RouteProp<SynthesisStackParamList, RouteName>;

const Stack = createNativeStackNavigator<SynthesisStackParamList>();

const SynthesisStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SynthesisScreen" component={SynthesisScreen} />
    </Stack.Navigator>
  );
};

export default SynthesisStack;
