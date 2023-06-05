import React, { useEffect } from 'react';
// Form
import { useForm } from 'react-hook-form';
// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import {
  securityCreateQr,
  securityVerifyGoogleAuth,
} from '../../store/slices/SecuritySlice';
// Components
import FactorGoogleView from './FactorGoogleView';
import Clipboard from '@react-native-clipboard/clipboard';
import { StackActions } from '@react-navigation/routers';

const FactorGoogleScreen: React.FC = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { isLoading, code2Fa, qrData } = useAppSelector(
    state => state.security,
  );
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const singleValue = getValues('google');

  const onNavigate = () => {
    navigation.navigate('FactorGoogleActiveScreen');
  };

  const onGetQrCode = async (): Promise<void> => {
    await dispatch(
      securityCreateQr({
        code_2fa: code2Fa.code_2fa,
        token_2fa: code2Fa.token_2fa,
      }),
    ).unwrap();
  };

  const onVerifyGoogleAuth = async (): Promise<void> => {
    await dispatch(
      securityVerifyGoogleAuth({ otp_code: singleValue }),
    ).unwrap();
    navigation.dispatch(StackActions.popToTop());
  };

  useEffect(() => {
    onGetQrCode();
  }, []);

  return (
    <FactorGoogleView
      onNavigate={onNavigate}
      isLoading={isLoading}
      control={control}
      errors={errors}
      qrData={qrData}
      handleSubmit={handleSubmit}
      onVerifyGoogleAuth={onVerifyGoogleAuth}
    />
  );
};

export default FactorGoogleScreen;
