import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroductionScreen from '../../screens/introduction';

export type IntroductionStackParamList = {
  IntroductionScreen: undefined;
};

export type IntroductionStackRouteProps<
  RouteName extends keyof IntroductionStackParamList,
> = RouteProp<IntroductionStackParamList, RouteName>;

const Stack = createNativeStackNavigator<IntroductionStackParamList>();

const IntroductionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="IntroductionScreen" component={IntroductionScreen} />
    </Stack.Navigator>
  );
};

export default IntroductionStack;
