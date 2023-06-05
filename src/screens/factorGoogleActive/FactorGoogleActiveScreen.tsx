import React from 'react';
import { useForm } from 'react-hook-form';
import FactorGoogleActiveView from './FactorGoogleActiveView';

const FactorGoogleActiveScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const multipleValues = getValues(['sms', 'google']);

  return (
    <FactorGoogleActiveView
      control={control}
      errors={errors}
      checkError={multipleValues}
    />
  );
};

export default FactorGoogleActiveScreen;
