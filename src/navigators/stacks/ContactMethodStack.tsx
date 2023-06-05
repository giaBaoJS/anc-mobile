import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import ContactMethodScreen from '../../screens/contactMethod';

export type ContactMethodStackParamList = {
  ContactMethodScreen: undefined;
};

export type ContactMethodNavigationProp =
  NativeStackNavigationProp<ContactMethodStackParamList>;

const Stack = createNativeStackNavigator<ContactMethodStackParamList>();

const ContactMethodStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="ContactMethodScreen"
        component={ContactMethodScreen}
      />
    </Stack.Navigator>
  );
};

export default ContactMethodStack;
