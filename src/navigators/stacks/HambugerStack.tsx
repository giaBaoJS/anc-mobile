import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import HambugerScreen from '../../screens/hambuger';
import {
  AboutStack,
  CurrencyStack,
  HelperStack,
  NewsStack,
  PolicyStack,
  ProjectStack,
  QRStack,
  TransactionPropertiesStack,
  TransactionRegisterStack,
  TransactionRoleStack,
  TransactionSourceStack,
  TransactionStructureStack,
  ApiKeyCodeStack,
  PersonalPolicyTemplateStack,
  AccountManagementStack,
  CompositeFrameStack,
  QuickLinkStack,
  AccountIntroductionStack,
  UpgradeAccountStack,
  ProfileInformationStack,
  KYCStack,
  ContactMethodStack,
  AddressBookStack,
  PublicProfileStack,
  InterfaceAdjustmentStack,
  RequestAdditionalLibrariesStack,
} from '.';
//Screen
import ChangePassScreen from '../../screens/changepass';
import ChangePinCodeScreen from '../../screens/changePinCode';
import LoginMethodScreen from '../../screens/loginMethod';

export type HambugerStackParamList = {
  HambugerScreen: undefined;
  NewsStack: undefined;
  ProjectStack: undefined;
  ApiKeyCodeStack: undefined;
  PersonalPolicyTemplateStack: undefined;
  TransactionSourceStack: undefined;
  AccountManagementStack: undefined;
  CompositeFrameStack: undefined;
  QuickLinkStack: undefined;
  ChangePassScreen: undefined;
  ChangePinCodeScreen: undefined;
  LoginMethodScreen: undefined;
  AccountIntroductionStack: undefined;
  UpgradeAccountStack: undefined;
  ProfileInformationStack: undefined;
  KYCStack: undefined;
  ContactMethodStack: undefined;
  AddressBookStack: undefined;
  PublicProfileStack: undefined;
  AboutStack: undefined;
  InterfaceAdjustmentStack: undefined;
  QRStack: undefined;
  HelperStack: undefined;
  RequestAdditionalLibrariesStack: undefined;
  TransactionRegisterStack: undefined;
  PolicyStack: undefined;
  TransactionRoleStack: undefined;
  TransactionStructureStack: undefined;
  TransactionPropertiesStack: undefined;
  CurrencyStack: undefined;
};

export type HambugerStackNavigationProp =
  NativeStackNavigationProp<HambugerStackParamList>;

const Stack = createNativeStackNavigator<HambugerStackParamList>();
const HambugerStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HambugerScreen" component={HambugerScreen} />
      <Stack.Screen name="NewsStack" component={NewsStack} />
      <Stack.Screen name="ProjectStack" component={ProjectStack} />
      <Stack.Screen name="ApiKeyCodeStack" component={ApiKeyCodeStack} />
      <Stack.Screen
        name="PersonalPolicyTemplateStack"
        component={PersonalPolicyTemplateStack}
      />
      <Stack.Screen
        name="AccountManagementStack"
        component={AccountManagementStack}
      />
      <Stack.Screen
        name="CompositeFrameStack"
        component={CompositeFrameStack}
      />
      <Stack.Screen name="QuickLinkStack" component={QuickLinkStack} />
      <Stack.Screen name="ChangePassScreen" component={ChangePassScreen} />
      <Stack.Screen
        name="ChangePinCodeScreen"
        component={ChangePinCodeScreen}
      />
      <Stack.Screen name="LoginMethodScreen" component={LoginMethodScreen} />
      <Stack.Screen
        name="AccountIntroductionStack"
        component={AccountIntroductionStack}
      />
      <Stack.Screen
        name="UpgradeAccountStack"
        component={UpgradeAccountStack}
      />
      <Stack.Screen
        name="ProfileInformationStack"
        component={ProfileInformationStack}
      />
      <Stack.Screen name="KYCStack" component={KYCStack} />
      <Stack.Screen name="ContactMethodStack" component={ContactMethodStack} />
      <Stack.Screen name="AddressBookStack" component={AddressBookStack} />
      <Stack.Screen name="PublicProfileStack" component={PublicProfileStack} />
      <Stack.Screen name="AboutStack" component={AboutStack} />
      <Stack.Screen
        name="InterfaceAdjustmentStack"
        component={InterfaceAdjustmentStack}
      />
      <Stack.Screen name="QRStack" component={QRStack} />
      <Stack.Screen name="HelperStack" component={HelperStack} />
      <Stack.Screen
        name="RequestAdditionalLibrariesStack"
        component={RequestAdditionalLibrariesStack}
      />
      <Stack.Screen
        name="TransactionRegisterStack"
        component={TransactionRegisterStack}
      />
      <Stack.Screen
        name="TransactionSourceStack"
        component={TransactionSourceStack}
      />
      <Stack.Screen name="PolicyStack" component={PolicyStack} />
      <Stack.Screen
        name="TransactionRoleStack"
        component={TransactionRoleStack}
      />
      <Stack.Screen
        name="TransactionStructureStack"
        component={TransactionStructureStack}
      />
      <Stack.Screen
        name="TransactionPropertiesStack"
        component={TransactionPropertiesStack}
      />
      <Stack.Screen name="CurrencyStack" component={CurrencyStack} />
    </Stack.Navigator>
  );
};

export default HambugerStack;
