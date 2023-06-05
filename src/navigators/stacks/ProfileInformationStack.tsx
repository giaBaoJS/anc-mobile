import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import ProfileInformationScreen from '../../screens/profileInformation';

export type ProfileInformationStackParamList = {
  ProfileInformationScreen: undefined;
};

export type UpgradeAccountNavigationProp =
  NativeStackNavigationProp<ProfileInformationStackParamList>;

const Stack = createNativeStackNavigator<ProfileInformationStackParamList>();

const ProfileInformationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="ProfileInformationScreen"
        component={ProfileInformationScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileInformationStack;
