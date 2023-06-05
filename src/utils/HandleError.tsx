/* eslint-disable eqeqeq */
import { Alert } from 'react-native';
import i18next from 'i18next';
import {
  AuthError,
  CustomError,
  MaintenanceError,
  VersionError,
} from '../models/Error';

export const handlerErrorType = (response: any) => {
  const { data, status } = response;
  const { c: errorCode, m: errorMessage } = data;
  switch (status) {
    case 400: {
      if (errorCode === 'W100101') {
        return new VersionError(errorCode, errorMessage);
      }

      if (errorCode === 'W100104') {
        return new AuthError(errorCode, errorMessage);
      }

      if (errorCode === 'W100105') {
        return new MaintenanceError(errorCode, errorMessage);
      }
      return new CustomError(errorCode, errorMessage);
    }
    case 408: {
      return new CustomError(errorCode, errorMessage);
    }
    default: {
      return new CustomError(errorCode, i18next.t('Error.General'));
    }
  }
};

export const handleError = (
  error: any,
  onPressHandler?: () => void | Promise<void>,
) => {
  const isNetworkError = error?.toString() === 'Error: Network Error';
  const defaultTimeoutError = {
    status: isNetworkError ? 400 : 408,
    data: {
      c: isNetworkError ? '400' : '408',
      m: isNetworkError
        ? i18next.t('Error.Network')
        : i18next.t('Error.General'),
    },
  };
  const convertError = handlerErrorType(
    error.status === undefined ? defaultTimeoutError : error,
  );
  console.log('Error', convertError);
  const onPress =
    convertError.code == '-1' || convertError.code == '-2'
      ? onPressHandler
      : () => {};
  return Alert.alert(
    i18next.t('Notification.Noti'),
    `${convertError.message}`,
    [
      {
        text: i18next.t('OK'),
        onPress: onPress,
      },
    ],
    { cancelable: false },
  );
};
