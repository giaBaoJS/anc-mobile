import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
//Translate
import i18next from 'i18next';
//Icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/Entypo';
//Layout
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
import { RegularText, SemiBoldText } from '../texts';
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

interface Props {
  bottomSheetRef: React.ForwardedRef<BottomSheetModal>;
  onShare: (type: string) => Promise<void>;
}

const SNAP_HEIGHT = kScaledSize(242);

const ShareBottomSheet = ({ bottomSheetRef, onShare }: Props) => {
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

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundComponent={renderBackground}
      handleComponent={renderHandle}>
      <View style={styles.body}>
        <SemiBoldText style={styles.title}>
          {i18next.t('UserInfoScreen.TypeShare')}
        </SemiBoldText>
        <View>
          <TouchableOpacity
            onPress={() => onShare('image')}
            style={Layout.rowBetween}>
            <View style={[Layout.rowHCenter]}>
              <Icon
                name="image"
                size={kScaledSize(32)}
                color={Colors.primary}
                style={styles.icon}
              />
              <View>
                <SemiBoldText style={styles.fontBig}>
                  {i18next.t('UserInfoScreen.ShareImage')}
                </SemiBoldText>
                <RegularText style={styles.fontMini}>
                  {i18next.t('UserInfoScreen.TextShareImage')}
                </RegularText>
              </View>
            </View>
            <Ionicons
              name="arrow-forward-circle-outline"
              color={Colors.grey6}
              size={kScaledSize(24)}
            />
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => onShare('link')}
            style={Layout.rowBetween}>
            <View style={[Layout.rowHCenter]}>
              <Icon
                name="link"
                size={kScaledSize(32)}
                color={Colors.primary}
                style={styles.icon}
              />
              <View>
                <SemiBoldText style={styles.fontBig}>
                  {i18next.t('UserInfoScreen.ShareLink')}
                </SemiBoldText>
                <RegularText style={styles.fontMini}>
                  {i18next.t('UserInfoScreen.TextShareLink')}
                </RegularText>
              </View>
            </View>
            <Ionicons
              name="arrow-forward-circle-outline"
              color={Colors.grey6}
              size={kScaledSize(24)}
            />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default ShareBottomSheet;

const styles = StyleSheet.create({
  body: {
    padding: kSpacing.kSpacing16,
  },
  title: {
    textAlign: 'center',
    marginBottom: kScaledSize(30),
  },
  handle: {
    height: 5,
    width: 35,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: kSpacing.kSpacing10,
  },
  fontBig: {
    fontSize: kTextSizes.medium,
    color: Colors.primary,
    marginBottom: kSpacing.kSpacing3,
  },
  fontMini: {
    fontSize: kTextSizes.xmini,
  },
  icon: {
    marginRight: kSpacing.kSpacing15,
  },
  line: {
    borderWidth: 1,
    borderColor: Colors.grey7,
    marginVertical: kSpacing.kSpacing15,
  },
});
