import React from 'react';
import { Linking } from 'react-native';
//Hooks
import { useAppDispatch } from '../../hooks/RTKHooks';
//Components
import ForgotPassView from './ForgotPassView';

const ForgotPassScreen: React.FC = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const onNavigate = (byEmail: boolean): void => {
    navigation.navigate('ForgotPassResetScreen', {
      byEmail,
    });
  };
  const onOpenSupport = (): void => {
    Linking.openURL('https://www.ceolead.com/');
  };
  return (
    <ForgotPassView onNavigate={onNavigate} onOpenSupport={onOpenSupport} />
  );
};

export default ForgotPassScreen;
