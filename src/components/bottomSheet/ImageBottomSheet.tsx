import React, { useCallback, useMemo } from 'react';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { kScaledSize, kSpacing } from '../../utils/Constants';
import Colors from '../../theme/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Layout from '../../theme/Layout';
import { RegularText } from '../texts';
import i18next from 'i18next';
import {
  checkCameraPermission,
  checkPhotoPermission,
} from '../../utils/Permission';
import { handleAlert } from '../../utils/Notification';
import ImagePicker from 'react-native-image-crop-picker';

interface Props {
  bottomSheetRef: React.ForwardedRef<BottomSheetModal>;
  getImage: (val: any) => void;
}

const SNAP_HEIGHT = kScaledSize(150);

const ImageBottomSheet = ({ bottomSheetRef, getImage }: Props) => {
  const snapPoints = useMemo(() => [SNAP_HEIGHT], []);

  const renderBackdrop = useCallback((props: any) => {
    return (
      <BottomSheetBackdrop
        {...props}
        opacity={0.1}
        animatedIndex={{
          value: 1,
        }}
        closeOnPress={true}
      />
    );
  }, []);
  const renderHandle = useCallback(({ style }) => {
    return (
      <View
        style={[
          styles.handle,
          {
            backgroundColor: Colors.grey6,
          },
          { ...style },
        ]}
      />
    );
  }, []);
  const renderBackground = useCallback(({ style }) => {
    return (
      <View
        style={[
          {
            backgroundColor: Colors.white,
            borderRadius: 20,
          },
          { ...style },
        ]}
      />
    );
  }, []);

  const onChooseImage = async (): Promise<void> => {
    if (Platform.OS === 'ios') {
      const photoPermission = await checkPhotoPermission();
      if (photoPermission === 'blocked') {
        handleAlert({
          message: i18next.t('Permission.Photo'),
          buttonText1: i18next.t('Button.Setting'),
          buttonText2: i18next.t('Button.Cancel'),
          onPress1: () => Linking.openURL('app-settings:'),
        });
        return;
      }
    }
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      getImage(image);
    });
  };

  const onOpenCamera = async (): Promise<void> => {
    try {
      if (Platform.OS === 'ios') {
        const cameraPermission = await checkCameraPermission();
        if (cameraPermission === 'blocked') {
          handleAlert({
            message: i18next.t('Permission.Camera'),
            buttonText1: i18next.t('Button.Setting'),
            buttonText2: i18next.t('Button.Cancel'),
            onPress1: () => Linking.openURL('app-settings:'),
          });
          return;
        }
      }
      ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
      }).then(image => {
        getImage(image);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundComponent={renderBackground}
      handleComponent={renderHandle}>
      <View style={styles.body}>
        <TouchableOpacity
          style={[styles.groupButton, Layout.rowHCenter]}
          onPress={onChooseImage}>
          <View style={[styles.icon, Layout.rowCenter]}>
            <Entypo name="images" size={kScaledSize(12)} color={Colors.black} />
          </View>
          <RegularText>{i18next.t('BottomSheet.PickImage')}</RegularText>
        </TouchableOpacity>
        <TouchableOpacity style={[Layout.rowHCenter]} onPress={onOpenCamera}>
          <View style={[styles.icon, Layout.rowCenter]}>
            <FontAwesome
              name="camera"
              size={kScaledSize(12)}
              color={Colors.black}
            />
          </View>
          <RegularText>{i18next.t('BottomSheet.Camera')}</RegularText>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

export default ImageBottomSheet;

const styles = StyleSheet.create({
  body: {
    padding: kSpacing.kSpacing15,
  },
  handle: {
    height: 5,
    width: 35,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: kSpacing.kSpacing10,
  },
  icon: {
    width: kScaledSize(30),
    height: kScaledSize(30),
    backgroundColor: Colors.grey7,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: kSpacing.kSpacing10,
  },
  groupButton: {
    marginBottom: kSpacing.kSpacing15,
  },
});
