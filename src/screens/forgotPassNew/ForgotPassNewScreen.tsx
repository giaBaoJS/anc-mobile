import React, { useEffect, useRef } from 'react';
import { Keyboard } from 'react-native';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import { ForgotPassStackRouteProps } from '../../navigators/stacks/ForgotPassStack';
import { authForgotPassUpdateNew } from '../../store/slices/AuthSlice';
import { handleAlert } from '../../utils/Notification';
import ForgotPassNewView from './ForgotPassNewView';
interface Props {
  navigation: any;
  route: ForgotPassStackRouteProps<'ForgotPassNewScreen'>;
}

const ForgotPassNewScreen = ({ navigation, route }: Props) => {
  const { isLoading } = useAppSelector(state => state.auth);
  const { token, code } = route.params;
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    trigger,
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
        authForgotPassUpdateNew({
          code,
          token,
          ...data,
        }),
      ).unwrap();
      handleAlert({
        message: i18next.t('ForgotPassNewScreen.Success'),
        onPress1: onNavigate,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onNavigate = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };
  return (
    <ForgotPassNewView
      isLoading={isLoading}
      control={control}
      errors={errors}
      passwordRef={passwordRef}
      onUpdateNewPass={onUpdateNewPass}
      handleSubmit={handleSubmit}
    />
  );
};

export default ForgotPassNewScreen;
