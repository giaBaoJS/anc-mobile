import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { ForgotPassStackRouteProps } from '../../navigators/stacks/ForgotPassStack';
//Form
import { useForm } from 'react-hook-form';
//Components
import ForgotPassResetView from './ForgotPassResetView';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import { authForgotPassRequest } from '../../store/slices/AuthSlice';

interface Props {
  navigation: any;
  route: ForgotPassStackRouteProps<'ForgotPassResetScreen'>;
}
const ForgotPassResetScreen = ({ navigation, route }: Props) => {
  const { byEmail } = route.params;
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.auth);
  const [phoneCode, setPhoneCode] = useState<string>('84');
  const [phoneCountry, setPhoneCountry] = useState<any>('VN');
  // Form
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const multipleValues = getValues(['email', 'phone']);

  const onHandleSubmit = async (data: any): Promise<void> => {
    try {
      Keyboard.dismiss();
      if (data.email) {
        const res = await dispatch(
          authForgotPassRequest({
            type: 'email',
            email: data.email,
          }),
        ).unwrap();
        onNavigate(data, res.d[0].token, res.d[0].code);
      } else {
        const res = await dispatch(
          authForgotPassRequest({
            type: 'phone',
            phone: data.phone,
            phone_country: phoneCountry,
          }),
        ).unwrap();

        onNavigate(
          data,
          res.d[0].token,
          res.d[0].code,
          phoneCode,
          phoneCountry,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onNavigate = (
    data: any,
    token: string,
    code: string,
    phonecode?: string,
    phone_country?: string,
  ) => {
    navigation.navigate('ForgotPassCodeScreen', {
      formValue: data,
      token,
      code,
      phonecode,
      phone_country,
    });
  };
  return (
    <ForgotPassResetView
      isLoading={isLoading}
      control={control}
      errors={errors}
      byEmail={byEmail}
      phoneCode={phoneCode}
      setPhoneCode={setPhoneCode}
      phoneCountry={phoneCountry}
      setPhoneCountry={setPhoneCountry}
      onHandleSubmit={onHandleSubmit}
      handleSubmit={handleSubmit}
      checkError={multipleValues}
    />
  );
};

export default ForgotPassResetScreen;
