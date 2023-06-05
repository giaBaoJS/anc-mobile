import i18next from 'i18next';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import {
  securityDeleteSms2Fa,
  securityGetActive2Fa,
} from '../../store/slices/SecuritySlice';
import { handleAlert } from '../../utils/Notification';
import FactorAuthenticationView from './FactorAuthenticationView';

const FactorAuthenticationScreen: React.FC = ({ navigation }: any) => {
  const { isLoading, active2Fa } = useAppSelector(state => state.security);

  const onNavigateOtp = (fromRoute: string): void => {
    if (fromRoute === 'removeGoogle') {
      navigation.navigate('FactorAuthRemoveGoogleScreen');
    } else {
      navigation.navigate('FactorMobileCodeScreen', { fromRoute });
    }
  };

  const onNavigate = (endpoint: string) => {
    if (endpoint === 'sms') {
      if (active2Fa.authenticate_by_sms) {
        handleAlert({
          message: i18next.t('FactorAuthenScreen.RemoveSms'),
          onPress1: () => onNavigateOtp('removeSms'),
          buttonText2: i18next.t('Button.Cancel'),
        });
      } else {
        onNavigateOtp('sms');
      }
    } else {
      if (active2Fa.authenticate_by_google) {
        handleAlert({
          message: i18next.t('FactorAuthenScreen.RemoveGoogleAuth'),
          onPress1: () => onNavigateOtp('removeGoogle'),
          buttonText2: i18next.t('Button.Cancel'),
        });
      } else {
        onNavigateOtp('google');
      }
    }
  };
  return (
    <FactorAuthenticationView
      onNavigate={onNavigate}
      isLoading={isLoading}
      active2Fa={active2Fa}
    />
  );
};

export default FactorAuthenticationScreen;
