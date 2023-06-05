import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home';
import NotificationScreen from '../../screens/notification';
import HomeSettingScreen from '../../screens/homeSetting';
import {
  QRStack,
  TransactionSourceStack,
  TransactionRegisterStack,
  HelperStack,
  ProjectStack,
  NewsStack,
  AboutStack,
  PolicyPatternStack,
  TransactionStructureStack,
  TransactionRoleStack,
  UserSettingStack,
  HambugerStack,
} from '.';

export type HomeStackParamList = {
  HomeScreen: undefined;
  UserSettingStack: undefined;
  NotificationScreen: undefined;
  HomeSettingScreen: { fromWidget: string };
  TransactionSourceStack: undefined;
  TransactionRegisterStack: undefined;
  TransactionStructureStack: undefined;
  TransactionRoleStack: undefined;
  QRStack: undefined;
  HelperStack: undefined;
  ProjectStack: undefined;
  NewsStack: undefined;
  AboutStack: undefined;
  PolicyPatternStack: undefined;
  HambugerStack: undefined;
};

export type HomeStackRouteProps<RouteName extends keyof HomeStackParamList> =
  RouteProp<HomeStackParamList, RouteName>;

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="UserSettingStack" component={UserSettingStack} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="HomeSettingScreen" component={HomeSettingScreen} />
      <Stack.Screen
        name="TransactionSourceStack"
        component={TransactionSourceStack}
      />
      <Stack.Screen
        name="TransactionRegisterStack"
        component={TransactionRegisterStack}
      />
      <Stack.Screen
        name="TransactionStructureStack"
        component={TransactionStructureStack}
      />
      <Stack.Screen name="QRStack" component={QRStack} />
      <Stack.Screen name="HelperStack" component={HelperStack} />
      <Stack.Screen name="ProjectStack" component={ProjectStack} />
      <Stack.Screen name="NewsStack" component={NewsStack} />
      <Stack.Screen name="AboutStack" component={AboutStack} />
      <Stack.Screen name="PolicyPatternStack" component={PolicyPatternStack} />
      <Stack.Screen
        name="TransactionRoleStack"
        component={TransactionRoleStack}
      />
      <Stack.Screen name="HambugerStack" component={HambugerStack} />
    </Stack.Navigator>
  );
};

export default HomeStack;
