import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectScreen from '../../screens/project';
import ProjectDetailScreen from '../../screens/projectDetail';
import type { ProjectField } from '../../models/Widget';

export type ProjectStackParamList = {
  ProjectScreen: undefined;
  ProjectDetailScreen: { item: ProjectField };
};

export type ProjectStackRouteProps<
  RouteName extends keyof ProjectStackParamList,
> = RouteProp<ProjectStackParamList, RouteName>;

const Stack = createNativeStackNavigator<ProjectStackParamList>();

const ProjectStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProjectScreen" component={ProjectScreen} />
      <Stack.Screen
        name="ProjectDetailScreen"
        component={ProjectDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default ProjectStack;
