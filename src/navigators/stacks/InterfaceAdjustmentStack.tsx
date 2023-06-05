import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import InterfaceAdjustmentScreen from '../../screens/interfaceAdjustment';

export type InterfaceAdjustmentStackParamList = {
  InterfaceAdjustmentScreen: undefined;
};

export type InterfaceAdjustmentNavigationProp =
  NativeStackNavigationProp<InterfaceAdjustmentStackParamList>;

const Stack = createNativeStackNavigator<InterfaceAdjustmentStackParamList>();

const InterfaceAdjustmentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="InterfaceAdjustmentScreen"
        component={InterfaceAdjustmentScreen}
      />
    </Stack.Navigator>
  );
};

export default InterfaceAdjustmentStack;
