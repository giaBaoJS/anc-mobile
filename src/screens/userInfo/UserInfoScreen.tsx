import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Linking, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';
// Share
import Share from 'react-native-share';
// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
// Components
import UserInfoView from './UserInfoView';
import { handleAlert } from '../../utils/Notification';
// Snapshot
import { captureRef } from 'react-native-view-shot';
// Common
import i18next from 'i18next';
import { checkPhotoPermission } from '../../utils/Permission';
import { convertBase64 } from '../../utils/Common';
//Toast
import Toast from 'react-native-toast-message';
import { useForm } from 'react-hook-form';
import { UpdateName } from '../../store/slices/AuthSlice';

const UserInfoScreen: React.FC = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { userInfo, qrCode, userRefer } = useAppSelector(state => state.auth);
  const [isShow, setShowEyes] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoadingSave, setIsLoadingSave] = useState<boolean>(false);
  const [pathQR, setPath] = useState<any>('');
  const viewRef = useRef<any>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const onCancelEdit = useCallback((): void => {
    setIsEdit(false);
    reset();
  }, []);
  const updateDisPlayName = useCallback(async (data: any): Promise<void> => {
    setIsLoadingSave(true);
    setIsEdit(false);
    await dispatch(UpdateName(data.name));
    setIsLoadingSave(false);
    reset();
  }, []);
  const onToggleEyes = useCallback((): void => {
    setShowEyes(prev => !prev);
  }, [isShow]);

  const onShowSheet = useCallback((): void => {
    bottomSheetRef.current?.present();
  }, []);

  const getPathQr = useCallback(async (): Promise<void> => {
    try {
      const status = await checkPhotoPermission();
      if (Platform.OS === 'ios' && status === 'blocked') {
        handleAlert({
          message: i18next.t('Permission.SavePhoto'),
          buttonText1: i18next.t('Button.Setting'),
          buttonText2: i18next.t('Button.Cancel'),
          onPress1: () => Linking.openURL('app-settings:'),
        });
        return;
      } else if (Platform.OS === 'android' && status === 'denied') {
        return;
      }
      const path = await captureRef(viewRef.current, {
        quality: 1,
        format: 'jpg',
      });
      setIsLoadingSave(true);
      await CameraRoll.save(path, { type: 'photo' });
      setTimeout(() => {
        setIsLoadingSave(false);
        Toast.show({
          type: 'success',
          text1: i18next.t('Common.Success'),
          text2: i18next.t('Common.DownloadSuccess'),
          visibilityTime: 2000,
          topOffset: 40,
        });
      }, 500);
      return RNFS.unlink(path);
    } catch (error) {
      console.log(error);
      handleAlert({
        message: i18next.t('Error.Save'),
      });
    }
  }, []);

  const onShare = useCallback(async (type: string): Promise<void> => {
    try {
      if (type === 'image') {
        const path = await captureRef(viewRef.current, {
          quality: 1,
          format: 'jpg',
        });
        const base64Data = await convertBase64(path);
        const base64Image = 'data:image/png;base64,' + base64Data;
        // here's base64 encoded image
        await Share.open({
          url: base64Image,
          message: i18next.t('UserInfoScreen.ShareQRCodeImage'),
        });
        RNFS.unlink(path);
      } else {
        await Share.open({
          url: 'https://www.ceolead.com/',
          message: i18next.t('UserInfoScreen.ShareQRCodeLink'),
        });
      }
      bottomSheetRef.current?.dismiss();
      // remove the file from storage
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <UserInfoView
      isLoadingSave={isLoadingSave}
      getPathQr={getPathQr}
      viewRef={viewRef}
      qrCode={qrCode}
      navigation={navigation}
      userInfo={userInfo}
      isShow={isShow}
      onToggleEyes={onToggleEyes}
      bottomSheetRef={bottomSheetRef}
      onShowSheet={onShowSheet}
      onShare={onShare}
      userRefer={userRefer}
      isEdit={isEdit}
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      setIsEdit={setIsEdit}
      updateDisPlayName={updateDisPlayName}
      onCancelEdit={onCancelEdit}
    />
  );
};

export default UserInfoScreen;
