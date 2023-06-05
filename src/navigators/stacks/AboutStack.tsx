import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutScreen from '../../screens/about';

export type AboutStackParamList = {
  AboutScreen: undefined;
};

export type AboutStackRouteProps<RouteName extends keyof AboutStackParamList> =
  RouteProp<AboutStackParamList, RouteName>;

const Stack = createNativeStackNavigator<AboutStackParamList>();

const AboutStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default AboutStack;
