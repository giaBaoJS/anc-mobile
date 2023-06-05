import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BlockUsersScreen from '../../screens/blockUsers';

export type BlockUsersStackParamList = {
  BlockUsersScreen: undefined;
};

export type BlockUsersStackRouteProps<
  RouteName extends keyof BlockUsersStackParamList,
> = RouteProp<BlockUsersStackParamList, RouteName>;

const Stack = createNativeStackNavigator<BlockUsersStackParamList>();

const BlockUsersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BlockUsersScreen" component={BlockUsersScreen} />
    </Stack.Navigator>
  );
};

export default BlockUsersStack;
