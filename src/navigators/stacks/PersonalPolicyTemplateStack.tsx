import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import PersonalPolicyTemplateScreen from '../../screens/personalPolicyTemplate';

export type PersonalPolicyTemplateStackParamList = {
  PersonalPolicyTemplateScreen: undefined;
};

export type PersonalPolicyTemplateNavigationProp =
  NativeStackNavigationProp<PersonalPolicyTemplateStackParamList>;

const Stack =
  createNativeStackNavigator<PersonalPolicyTemplateStackParamList>();

const PersonalPolicyTemplateStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="PersonalPolicyTemplateScreen"
        component={PersonalPolicyTemplateScreen}
      />
    </Stack.Navigator>
  );
};

export default PersonalPolicyTemplateStack;
