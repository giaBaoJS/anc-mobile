import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SupportCenterScreen from '../../screens/supportCenter';
import SupportFaqScreen from '../../screens/supportFaq';
import SupportFeedBackScreen from '../../screens/supportFeedBack';
import SupportCallScreen from '../../screens/supportCall';

export type SupportCenterStackParamList = {
  SupportCenterScreen: undefined;
  SupportFaqScreen: undefined;
  SupportFeedBackScreen: undefined;
  SupportCallScreen: undefined;
};

export type SupportCenterStackRouteProps<
  RouteName extends keyof SupportCenterStackParamList,
> = RouteProp<SupportCenterStackParamList, RouteName>;

const Stack = createNativeStackNavigator<SupportCenterStackParamList>();

const SupportCenterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="SupportCenterScreen"
        component={SupportCenterScreen}
      />
      <Stack.Screen name="SupportFaqScreen" component={SupportFaqScreen} />
      <Stack.Screen
        name="SupportFeedBackScreen"
        component={SupportFeedBackScreen}
      />
      <Stack.Screen name="SupportCallScreen" component={SupportCallScreen} />
    </Stack.Navigator>
  );
};

export default SupportCenterStack;
