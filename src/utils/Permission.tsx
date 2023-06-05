import messaging from '@react-native-firebase/messaging';
import i18next from 'i18next';
import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { handleAlert } from './Notification';

export const checkApplicationPermission = async (): Promise<void | number> => {
  const authorizationStatus = await messaging().requestPermission();
  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    return authorizationStatus;
  }
  return 0;
};

export const checkCameraPermission = async (): Promise<string | undefined> => {
  try {
    const status = await check(PERMISSIONS.IOS.CAMERA);
    return status;
  } catch (err: any) {
    handleAlert(err.toString());
  }
};

export const requestCameraPermission = async (): Promise<void> => {
  try {
    await request(PERMISSIONS.IOS.CAMERA);
  } catch (err: any) {
    handleAlert(err.toString());
  }
};

export const checkPhotoPermission = async (): Promise<string | undefined> => {
  try {
    if (Platform.OS === 'ios') {
      const status = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      return status;
    } else {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: i18next.t('Permission.Setting'),
          message: i18next.t('Permission.SavePhoto'),
          buttonNegative: i18next.t('Button.Cancel'),
          buttonPositive: i18next.t('Button.Accept'),
        },
      );
      return status;
    }
  } catch (err: any) {
    handleAlert(err.toString());
  }
};
