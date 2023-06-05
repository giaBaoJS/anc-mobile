import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InfoIdentityScreen from '../../screens/infoIdentity';

export type InfoIdentityStackParamList = {
  InfoIdentityScreen: undefined;
};

export type InfoIdentityStackRouteProps<
  RouteName extends keyof InfoIdentityStackParamList,
> = RouteProp<InfoIdentityStackParamList, RouteName>;

const Stack = createNativeStackNavigator<InfoIdentityStackParamList>();

const InfoIdentityStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="InfoIdentityScreen" component={InfoIdentityScreen} />
    </Stack.Navigator>
  );
};

export default InfoIdentityStack;
