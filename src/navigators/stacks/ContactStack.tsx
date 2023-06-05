import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactScreen from '../../screens/contact';

export type ContactStackParamList = {
  Contactcreen: undefined;
};

export type ContactStackRouteProps<
  RouteName extends keyof ContactStackParamList,
> = RouteProp<ContactStackParamList, RouteName>;

const Stack = createNativeStackNavigator<ContactStackParamList>();

const ContactStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Contactcreen" component={ContactScreen} />
    </Stack.Navigator>
  );
};

export default ContactStack;
