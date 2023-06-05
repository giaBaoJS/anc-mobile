import React, { useCallback, useEffect, useRef, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
// Components
import UserSettingView from './UserSettingView';
import { handleAlert } from '../../utils/Notification';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import {
  authGetQRcode,
  authGetReferMe,
  authLogout,
  authUpdateAvatar,
} from '../../store/slices/AuthSlice';
// Translate
import i18next from 'i18next';
import { securityGetActive2Fa } from '../../store/slices/SecuritySlice';

const UserSettingScreen: React.FC = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { userInfo, qrCode } = useAppSelector(state => state.auth);
  const { active2Fa } = useAppSelector(state => state.security);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isShowMail, setIsShowMail] = useState<boolean>(false);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [isLoadingLogout, setIsLooadingLogout] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string>('');
  const [avatar, setAvatar] = useState<any>(userInfo?.avatar || null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [newAvatar, setNewAvatar] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const onShowSheet = useCallback((): void => {
    bottomSheetRef.current?.present();
  }, []);
  // Toggle
  const [isEnabled, setIsEnabled] = useState<boolean | undefined>(
    userInfo?.is_active,
  );
  const onToggled = (): void => {
    // Handle logic toggle
    setIsEnabled(prev => !prev);
  };
  const onGetInfo = useCallback(async (): Promise<void> => {
    try {
      setIsLoadingUser(true);
      setIsError(false);
      await dispatch(authGetQRcode()).unwrap();
      await dispatch(securityGetActive2Fa()).unwrap();
      await dispatch(authGetReferMe()).unwrap();
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  const fetchCopiedText = async (): Promise<void> => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };
  const onActiveSecurity = (): void => {
    setIsEnabled(prev => !prev);
  };
  const onConfirmLogout = (): void => {
    handleAlert({
      message: i18next.t('UserSettingScreen.ConfirmLogout'),
      buttonText2: i18next.t('Button.Cancel'),
      onPress1: onHandleLogout,
    });
  };
  const onHandleLogout = async (): Promise<void> => {
    setIsLooadingLogout(true);
    await dispatch(authLogout()).unwrap();
    setIsLooadingLogout(false);
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    navigation.navigate('HomeScreen');
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Home' }],
    // });
  };

  const onNavigateUserInfo = (): void => {
    navigation.navigate('UserInfoStack');
  };

  const getImage = (val: any): void => {
    bottomSheetRef.current?.dismiss();
    setAvatar(val.path);
    setSelectedImage(val);
    console.log(val);
    setNewAvatar(true);
  };
  const getStatus = (val: boolean): void => {
    setIsEnabled(val);
  };
  const onCancelImage = (): void => {
    setAvatar(userInfo?.avatar ? userInfo?.avatar : null);
    setSelectedImage(null);
    setNewAvatar(false);
  };
  const onSaveNewImage = async (): Promise<void> => {
    try {
      await dispatch(authUpdateAvatar(selectedImage)).unwrap();
      setNewAvatar(false);
      setAvatar(selectedImage.path);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetInfo();
  }, []);

  return (
    <UserSettingView
      userInfo={userInfo}
      isLoadingUser={isLoadingUser}
      isLoadingLogout={isLoadingLogout}
      isShow={isShow}
      setIsShow={setIsShow}
      onToggled={onToggled}
      isShowMail={isShowMail}
      setIsShowMail={setIsShowMail}
      isEnabled={isEnabled}
      fetchCopiedText={fetchCopiedText}
      onActiveSecurity={onActiveSecurity}
      onConfirmLogout={onConfirmLogout}
      navigation={navigation}
      onShowSheet={onShowSheet}
      bottomSheetRef={bottomSheetRef}
      getImage={getImage}
      getStatus={getStatus}
      avatar={avatar}
      newAvatar={newAvatar}
      onCancelImage={onCancelImage}
      onSaveNewImage={onSaveNewImage}
      onNavigateUserInfo={onNavigateUserInfo}
      qrCode={qrCode}
      active2Fa={active2Fa}
      isError={isError}
      onGetInfo={onGetInfo}
    />
  );
};

export default UserSettingScreen;
