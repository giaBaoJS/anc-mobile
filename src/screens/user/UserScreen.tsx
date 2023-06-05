import React, { useEffect, useState } from 'react';
//Translate
import i18next from 'i18next';
import AsyncStorage from '@react-native-community/async-storage';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import { UserStackParamList } from '../../navigators/stacks/UserStack';
import { onDisableConfig, onLogout } from '../../store/slices/AuthSlice';
import { onShowMonney } from '../../store/slices/UserHomeSlice';
import { BIOMETRY_CONFIG } from '../../utils/Common';
import { handleAlert } from '../../utils/Notification';
import * as Keychain from 'react-native-keychain';
import UserView from './UserView';
import ReactNativeBiometrics from 'react-native-biometrics';

const UserScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { userBioConfig, isLogin, userInfo } = useAppSelector(
    state => state.auth,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleLogout = (): void => {
    dispatch(onLogout());
    navigation.navigate('Home', { screen: 'HomeScreen' });
  };
  const { newsWidget } = useAppSelector(state => state.home);
  const { userHomeList, features, isShowMoney } = useAppSelector(
    state => state.userHome,
  );

  const onNavigate = (link: keyof UserStackParamList): void => {
    navigation.navigate(link);
  };
  const onActiveBiometric = async (): Promise<void> => {
    try {
      const confirmBio = await ReactNativeBiometrics.simplePrompt({
        promptMessage: i18next.t('Common.ConfirmBio'),
      });
      if (confirmBio.success) {
        await AsyncStorage.setItem('BiometricConfig', JSON.stringify(true));
        if (userInfo) {
          await AsyncStorage.setItem(
            'userName',
            JSON.stringify(userInfo.username),
          );
          await Keychain.setGenericPassword(
            userInfo.username,
            userInfo.uid,
            BIOMETRY_CONFIG,
          );
          await dispatch(onDisableConfig);
        }
        handleAlert({
          message: i18next.t('Button.BiometricEnable'),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const enableBiometric = async (): Promise<void> => {
    if (userBioConfig && isLogin) {
      handleAlert({
        message: i18next.t('Button.Biometric'),
        buttonText1: i18next.t('Button.Accept'),
        buttonText2: i18next.t('Button.Cancel'),
        onPress1: () => onActiveBiometric(),
        onPress2: () => dispatch(onDisableConfig()),
      });
    }
  };
  const onShowMonneyScreen = () => {
    dispatch(onShowMonney());
  };

  useEffect(() => {
    enableBiometric();
  }, []);

  return (
    <UserView
      handleLogout={handleLogout}
      isLoading={isLoading}
      userHomeList={userHomeList}
      newsWidget={newsWidget}
      features={features}
      onNavigate={onNavigate}
      isShowMoney={isShowMoney}
      onShowMonneyScreen={onShowMonneyScreen}
    />
  );
};

export default UserScreen;
