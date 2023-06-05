import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import UserSettingScreen from '../../screens/userSetting';
import {
  ContactStack,
  IdentityStack,
  IntroductionStack,
  SupportCenterStack,
  UserInfoStack,
} from '.';
import InfoIdentityStack from './InfoIdentityStack';
import UpAccountStack from './UpAccountStack';
import LanguageStack from './LanguageStack';
import DeviceConnectStack from './DeviceConnectStack';
import AddressBookStack from './AddressBookStack';
import EwalletStack from './EwalletStack';
import SettingPrivateStack from './SettingPrivateStack';
import IntroducePersonalStack from './IntroducePersonalStack';
import BlockUsersStack from './BlockUsersStack';
import BlockProjectsStack from './BlockProjectsStack';
import NotificationStack from './NotificationStack';
export type UserSettingStackParamList = {
  UserSettingScreen: undefined;
  ContactStack: undefined;
  IdentityStack: undefined;
  IntroductionStack: undefined;
  SupportCenterStack: undefined;
  UserInfoStack: undefined;
  InfoIdentityStack: undefined;
  UpAccountStack: undefined;
  LanguageStack: undefined;
  DeviceConnectStack: undefined;
  AddressBookStack: undefined;
  EwalletStack: undefined;
  SettingPrivateStack: undefined;
  IntroducePersonalStack: undefined;
  BlockUsersStack: undefined;
  BlockProjectsStack: undefined;
  NotificationStack: undefined;
};
export type UserSettingStackNavigationProp =
  NativeStackNavigationProp<UserSettingStackParamList>;

export type UserSettingStackRouteProps<
  RouteName extends keyof UserSettingStackParamList,
> = RouteProp<UserSettingStackParamList, RouteName>;

const Stack = createNativeStackNavigator<UserSettingStackParamList>();

const UserSettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="UserSettingScreen" component={UserSettingScreen} />
      <Stack.Screen name="ContactStack" component={ContactStack} />
      <Stack.Screen name="IdentityStack" component={IdentityStack} />
      <Stack.Screen name="IntroductionStack" component={IntroductionStack} />
      <Stack.Screen name="SupportCenterStack" component={SupportCenterStack} />
      <Stack.Screen name="UserInfoStack" component={UserInfoStack} />
      <Stack.Screen name="InfoIdentityStack" component={InfoIdentityStack} />
      <Stack.Screen name="UpAccountStack" component={UpAccountStack} />
      <Stack.Screen name="LanguageStack" component={LanguageStack} />
      <Stack.Screen name="DeviceConnectStack" component={DeviceConnectStack} />
      <Stack.Screen name="AddressBookStack" component={AddressBookStack} />
      <Stack.Screen name="EwalletStack" component={EwalletStack} />
      <Stack.Screen
        name="SettingPrivateStack"
        component={SettingPrivateStack}
      />
      <Stack.Screen
        name="IntroducePersonalStack"
        component={IntroducePersonalStack}
      />
      <Stack.Screen name="BlockUsersStack" component={BlockUsersStack} />
      <Stack.Screen name="BlockProjectsStack" component={BlockProjectsStack} />
      <Stack.Screen name="NotificationStack" component={NotificationStack} />
    </Stack.Navigator>
  );
};

export default UserSettingStack;
