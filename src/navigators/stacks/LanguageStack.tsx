import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageScreen from '../../screens/languages/LanguageScreen';

export type LanguageStackParamList = {
  LanguageScreen: undefined;
};

export type LanguageStackRouteProps<
  RouteName extends keyof LanguageStackParamList,
> = RouteProp<LanguageStackParamList, RouteName>;

const Stack = createNativeStackNavigator<LanguageStackParamList>();

const LanguageStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
    </Stack.Navigator>
  );
};

export default LanguageStack;
