import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import RequestAdditionalLibrariesScreen from '../../screens/requestAdditionalLibraries';

export type RequestAdditionalLibrariesStackParamList = {
  RequestAdditionalLibrariesScreen: undefined;
};

export type RequestAdditionalLibrariesNavigationProp =
  NativeStackNavigationProp<RequestAdditionalLibrariesStackParamList>;

const Stack =
  createNativeStackNavigator<RequestAdditionalLibrariesStackParamList>();

const RequestAdditionalLibrariesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="RequestAdditionalLibrariesScreen"
        component={RequestAdditionalLibrariesScreen}
      />
    </Stack.Navigator>
  );
};

export default RequestAdditionalLibrariesStack;
