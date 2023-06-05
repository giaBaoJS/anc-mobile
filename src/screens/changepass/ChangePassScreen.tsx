import React, { useEffect, useRef } from 'react';
import { Keyboard } from 'react-native';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import { handleAlert } from '../../utils/Notification';
import ChangePassView from './ChangePassView';
import {
  authChangePass,
  authLogout,
  onLogout,
} from '../../store/slices/AuthSlice';
import { removeFromStorage } from '../../utils/Common';
interface Props {
  navigation: any;
}

const ChangePassScreen = ({ navigation }: Props) => {
  const { isLoading } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    watch,
  } = useForm({ mode: 'all' });
  const passwordRef = useRef({});
  passwordRef.current = watch('password', '');
  const rePasswordRef = useRef({});
  rePasswordRef.current = watch('re_password', '');

  useEffect(() => {
    if (rePasswordRef?.current !== '') {
      trigger('re_password');
    }
  }, [passwordRef.current]);

  const onUpdateNewPass = async (data: any): Promise<void> => {
    try {
      Keyboard.dismiss();
      await dispatch(
        authChangePass({
          password: data.old_password,
          new_password: data.password,
          re_new_password: data.re_password,
        }),
      ).unwrap();
      reset();
      handleAlert({
        message: i18next.t('ForgotPassNewScreen.Success'),
        onPress1: onNavigate,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onNavigate = async (): Promise<void> => {
    await removeFromStorage('authToken');
    await removeFromStorage('BiometricConfig');
    dispatch(onLogout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'UserScreen' }],
    });
  };
  return (
    <ChangePassView
      isLoading={isLoading}
      control={control}
      errors={errors}
      passwordRef={passwordRef}
      onUpdateNewPass={onUpdateNewPass}
      handleSubmit={handleSubmit}
    />
  );
};

export default ChangePassScreen;
