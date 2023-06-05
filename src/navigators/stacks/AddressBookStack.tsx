import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import AddressBookScreen from '../../screens/addressBook';

export type AddressBookStackParamList = {
  AddressBookScreen: undefined;
};

export type AddressBookNavigationProp =
  NativeStackNavigationProp<AddressBookStackParamList>;

const Stack = createNativeStackNavigator<AddressBookStackParamList>();

const AddressBookStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AddressBookScreen" component={AddressBookScreen} />
    </Stack.Navigator>
  );
};

export default AddressBookStack;
