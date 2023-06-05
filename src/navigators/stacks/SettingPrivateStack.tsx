import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingPrivateScreen from '../../screens/settingPrivate';

export type SettingPrivateStackParamList = {
  SettingPrivateScreen: undefined;
};

export type SettingPrivateStackRouteProps<
  RouteName extends keyof SettingPrivateStackParamList,
> = RouteProp<SettingPrivateStackParamList, RouteName>;

const Stack = createNativeStackNavigator<SettingPrivateStackParamList>();

const SettingPrivateStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="SettingPrivateScreen"
        component={SettingPrivateScreen}
      />
    </Stack.Navigator>
  );
};

export default SettingPrivateStack;
