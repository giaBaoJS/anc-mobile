import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BlockProjectsScreen from '../../screens/blockProjects';

export type BlockProjectsStackParamList = {
  BlockProjectsScreen: undefined;
};

export type BlockProjectsStackRouteProps<
  RouteName extends keyof BlockProjectsStackParamList,
> = RouteProp<BlockProjectsStackParamList, RouteName>;

const Stack = createNativeStackNavigator<BlockProjectsStackParamList>();

const BlockProjectsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="BlockProjectsScreen"
        component={BlockProjectsScreen}
      />
    </Stack.Navigator>
  );
};

export default BlockProjectsStack;
