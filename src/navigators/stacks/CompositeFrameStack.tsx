import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import CompositeFrameScreen from '../../screens/compositeFrame';

export type CompositeFrameStackParamList = {
  CompositeFrameScreen: undefined;
};

export type PersonalPolicyTemplateNavigationProp =
  NativeStackNavigationProp<CompositeFrameStackParamList>;

const Stack = createNativeStackNavigator<CompositeFrameStackParamList>();

const CompositeFrameStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="CompositeFrameScreen"
        component={CompositeFrameScreen}
      />
    </Stack.Navigator>
  );
};

export default CompositeFrameStack;
