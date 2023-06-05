import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import PublicProfileScreen from '../../screens/publicProfile';

export type PublicProfileStackParamList = {
  PublicProfileScreen: undefined;
};

export type PublicProfileNavigationProp =
  NativeStackNavigationProp<PublicProfileStackParamList>;

const Stack = createNativeStackNavigator<PublicProfileStackParamList>();

const PublicProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="PublicProfileScreen"
        component={PublicProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default PublicProfileStack;
