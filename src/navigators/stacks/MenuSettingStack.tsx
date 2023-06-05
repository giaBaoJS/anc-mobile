import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuSettingScreen from '../../screens/menuSetting';

export type MenuSettingStackParamList = {
  MenuSettingScreen: undefined;
};

export type MenuSettingStackRouteProps<
  RouteName extends keyof MenuSettingStackParamList,
> = RouteProp<MenuSettingStackParamList, RouteName>;

const Stack = createNativeStackNavigator<MenuSettingStackParamList>();

const MenuSettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MenuSettingScreen" component={MenuSettingScreen} />
    </Stack.Navigator>
  );
};

export default MenuSettingStack;
