import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import QuickLinkScreen from '../../screens/quickLink';

export type QuickLinkStackParamList = {
  QuickLinkScreen: undefined;
};

export type PersonalPolicyTemplateNavigationProp =
  NativeStackNavigationProp<QuickLinkStackParamList>;

const Stack = createNativeStackNavigator<QuickLinkStackParamList>();

const QuickLinkStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="QuickLinkScreen" component={QuickLinkScreen} />
    </Stack.Navigator>
  );
};

export default QuickLinkStack;
