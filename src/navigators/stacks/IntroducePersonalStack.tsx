import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroducePersonalScreen from '../../screens/introducePersonal';

export type IntroducePersonalStackParamList = {
  IntroducePersonalScreen: undefined;
};

export type IntroducePersonalStackRouteProps<
  RouteName extends keyof IntroducePersonalStackParamList,
> = RouteProp<IntroducePersonalStackParamList, RouteName>;

const Stack = createNativeStackNavigator<IntroducePersonalStackParamList>();

const IntroducePersonalStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="IntroducePersonalScreen"
        component={IntroducePersonalScreen}
      />
    </Stack.Navigator>
  );
};

export default IntroducePersonalStack;
