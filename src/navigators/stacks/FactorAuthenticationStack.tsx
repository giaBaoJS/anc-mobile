import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FactorAuthenticationScreen from '../../screens/factorAuthentication';
import FactorGoogleScreen from '../../screens/factorGoogle';
import FactorGoogleActiveScreen from '../../screens/factorGoogleActive';
import FactorMobileScreen from '../../screens/factorMobile';
import FactorMobileCodeScreen from '../../screens/factorMobileCode';
import FactorAuthRemoveGoogleScreen from '../../screens/factorAuthenticationRemoveGoogle';

export type FactorAuthenticationStackParamList = {
  FactorAuthenticationScreen: undefined;
  FactorGoogleScreen: undefined;
  FactorGoogleActiveScreen: undefined;
  FactorMobileScreen: undefined;
  FactorMobileCodeScreen: { fromRoute: string };
  FactorAuthRemoveGoogleScreen: undefined;
};

export type FactorAuthenticationStackRouteProps<
  RouteName extends keyof FactorAuthenticationStackParamList,
> = RouteProp<FactorAuthenticationStackParamList, RouteName>;

const Stack = createNativeStackNavigator<FactorAuthenticationStackParamList>();

const FactorAuthenticationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="FactorAuthenticationScreen"
        component={FactorAuthenticationScreen}
      />
      <Stack.Screen name="FactorGoogleScreen" component={FactorGoogleScreen} />
      <Stack.Screen
        name="FactorGoogleActiveScreen"
        component={FactorGoogleActiveScreen}
      />
      <Stack.Screen name="FactorMobileScreen" component={FactorMobileScreen} />
      <Stack.Screen
        name="FactorMobileCodeScreen"
        component={FactorMobileCodeScreen}
      />
      <Stack.Screen
        name="FactorAuthRemoveGoogleScreen"
        component={FactorAuthRemoveGoogleScreen}
      />
    </Stack.Navigator>
  );
};

export default FactorAuthenticationStack;
