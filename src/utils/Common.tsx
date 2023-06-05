import { Dimensions, Platform, Linking } from 'react-native';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-community/async-storage';
import i18next from 'i18next';
import RNFS from 'react-native-fs';
import Clipboard from '@react-native-clipboard/clipboard';
import * as Keychain from 'react-native-keychain';

export const AppSetting = () => {
  Linking.openSettings();
};

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const IP12_ZOOM_WIDTH = 320;
const IP12_ZOOM_HEIGHT = 693;

const IP12_WIDTH = 390;
const IP12_HEIGHT = 844;

const IP12MAX_WIDTH = 428;
const IP12MAX_HEIGHT = 926;

export const hasNotch = (): boolean => {
  if (Platform.OS !== 'ios' || Platform.isPad || Platform.isTVOS) {
    return false;
  }
  const { width, height } = Dimensions.get('window');
  if (
    (width === X_WIDTH && height === X_HEIGHT) ||
    (width === XSMAX_WIDTH && height === XSMAX_HEIGHT) ||
    (width === IP12_ZOOM_WIDTH && height === IP12_ZOOM_HEIGHT) ||
    (width === IP12_WIDTH && height === IP12_HEIGHT) ||
    (width === IP12MAX_WIDTH && height === IP12MAX_HEIGHT)
  ) {
    return true;
  }
  return false;
};

export const isZoomed = (): boolean => {
  if (Platform.OS !== 'ios' || Platform.isPad || Platform.isTVOS) {
    return false;
  }
  const { width, height } = Dimensions.get('window');
  if (width === IP12_ZOOM_WIDTH && height === IP12_ZOOM_HEIGHT) {
    return true;
  }
  return false;
};

export const formatMoney = (number: number) => {
  return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ`;
};

export const formatNumber = (number: number) => {
  return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

export const formatDateMonth = (date: Date) => dayjs(date).format('DD/MM/YYYY');

export const saveToStorage = async (
  key: string,
  value: string,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const removeFromStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentTime = (): string => {
  const d = new Date();
  let hour = d.getHours();
  if (hour < 12) {
    return i18next.t('Common.Morning');
  } else if (hour > 12 && hour < 17) {
    return i18next.t('Common.Noon');
  } else {
    return i18next.t('Common.Evening');
  }
};

export const formatDateTime = (date: string): string => {
  return dayjs(date).format('HH:MM | DD/MM/YYYY ');
};

export const hideEmail = (email: string): string => {
  const partialEmail = email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1•••@$2');
  return partialEmail;
};

export const hidePhone = (phone: string | any): string => {
  const partialPhone =
    phone.slice(0, 4) +
    phone.slice(4, -3).replace(/[0-9]/g, '•') +
    phone.slice(-3);

  return partialPhone;
};

export const formatFirstZero = (phone: string): string => {
  const phoneFormat = `${phone.replace(/^0+/, '')}`;
  return phoneFormat;
};

export const otpFormat = (message: string) => {
  let otp: any = message.match(/[0-9]{6}/g);
  if (otp) {
    otp = otp[0];
  }
  return otp;
};

export const copyToClipboard = (text: string | any): void => {
  Clipboard.setString(text);
};

export const BIOMETRY_CONFIG = {
  accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
  accessible: Keychain.ACCESSIBLE.ALWAYS,
  storage: Keychain.STORAGE_TYPE.RSA,
};

export const onCheckSupportBiometric =
  async (): Promise<Keychain.BIOMETRY_TYPE | null> => {
    const response = await Keychain.getSupportedBiometryType();
    return response;
  };

export const convertBase64 = async (image: string) => {
  try {
    const res = RNFS.readFile(image, 'base64');
    return res;
  } catch (error) {
    console.log(error);
  }
};
