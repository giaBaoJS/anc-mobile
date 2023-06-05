import React, { useEffect, useState } from 'react';
import { useColorScheme, StatusBar } from 'react-native';
// Navigation
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// Bottom sheet
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// Stack
import BottomTab from './tab/BottomTab';
import LoginStack from './stacks/LoginStack';
// Theme
import { Light, Dark } from '../theme/Themes';
import Colors from '../theme/Colors';
import QRScreen from '../screens/qr';
import { checkApplicationPermission } from '../utils/Permission';
import { useAppDispatch, useAppSelector } from '../hooks/RTKHooks';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import { authSaveDeviceToken } from '../store/slices/AuthSlice';

export type RootStackParamList = {
  BottomTab: undefined;
  LoginStack: undefined;
  QRScreen: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Navigator: React.FC = () => {
  const scheme = useColorScheme();
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector(state => state.auth);
  const [notiPermission, setNotiPermission] = useState<number>(0);
  const AppStack = createNativeStackNavigator<RootStackParamList>();
  const onCheckNotifications = async (): Promise<void> => {
    const permission = (await checkApplicationPermission()) as number;
    setNotiPermission(permission);
  };

  const onCheckToken = async (): Promise<any> => {
    const token = await messaging().getToken();
    const currentDeviceToken = await AsyncStorage.getItem('deviceToken');
    if (currentDeviceToken !== token) {
      dispatch(authSaveDeviceToken(token));
    }
  };

  useEffect(() => {
    checkApplicationPermission();
    onCheckNotifications();
  }, []);
  useEffect(() => {
    if (notiPermission === 1 && isLogin) {
      onCheckToken();
    }
  }, [isLogin]);
  return (
    <NavigationContainer theme={scheme === 'light' ? Light : Dark}>
      <StatusBar animated={true} backgroundColor={Colors.primary} />
      <BottomSheetModalProvider>
        <AppStack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}>
          <AppStack.Screen name="BottomTab" component={BottomTab} />
          <AppStack.Screen name="LoginStack" component={LoginStack} />
          <AppStack.Screen name="QRScreen" component={QRScreen} />
        </AppStack.Navigator>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};

export default Navigator;
