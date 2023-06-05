import React, { useState } from 'react';
import { Keyboard } from 'react-native';
//Form
import { useForm } from 'react-hook-form';
//Components
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import FactorMobileView from './FactorMobileView';

interface Props {
  navigation: any;
}
const FactorMobileScreen = ({ navigation }: Props) => {
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
  const singleValue = getValues('phone');

  const onHandleSubmit = async (data: any): Promise<void> => {
    try {
      Keyboard.dismiss();
      navigation.navigate('FactorMobileCodeScreen', {
        phoneCode: data.phone,
      });
      // onNavigate(data, res.d[0].token, res.d[0].code, phoneCode, phoneCountry);
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
    <FactorMobileView
      isLoading={isLoading}
      control={control}
      errors={errors}
      phoneCode={phoneCode}
      setPhoneCode={setPhoneCode}
      phoneCountry={phoneCountry}
      setPhoneCountry={setPhoneCountry}
      onHandleSubmit={onHandleSubmit}
      handleSubmit={handleSubmit}
      checkError={singleValue}
    />
  );
};

export default FactorMobileScreen;
