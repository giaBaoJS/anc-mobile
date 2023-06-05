import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import UpgradeAccountScreen from '../../screens/upgradeAccount';

export type UpgradeAccountStackParamList = {
  UpgradeAccountScreen: undefined;
};

export type UpgradeAccountNavigationProp =
  NativeStackNavigationProp<UpgradeAccountStackParamList>;

const Stack = createNativeStackNavigator<UpgradeAccountStackParamList>();

const UpgradeAccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="UpgradeAccountScreen"
        component={UpgradeAccountScreen}
      />
    </Stack.Navigator>
  );
};

export default UpgradeAccountStack;
