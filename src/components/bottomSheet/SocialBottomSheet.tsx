import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
//Translate
import i18next from 'i18next';
//Icon
import Fontisto from 'react-native-vector-icons/Fontisto';
//Layout
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
import { RegularText, SemiBoldText } from '../texts';
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

interface Props {
  bottomSheetRef: React.ForwardedRef<BottomSheetModal>;
}

const SNAP_HEIGHT = kScaledSize(310);

const SocialBottomSheet = ({ bottomSheetRef }: Props) => {
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
          {i18next.t('BottomSheet.AddSocial')}
        </SemiBoldText>
        <View style={Layout.rowCenter}>
          <TouchableOpacity style={(Layout.colCenter, styles.groupButton)}>
            <Fontisto
              name="facebook"
              color={Colors.black}
              size={kScaledSize(24)}
              style={{ alignSelf: 'center' }}
            />
            <RegularText style={styles.textSocial}>Facebook</RegularText>
          </TouchableOpacity>
          <TouchableOpacity style={Layout.colVCenter}>
            <Fontisto
              name="viber"
              color={Colors.black}
              size={kScaledSize(24)}
            />
            <RegularText style={styles.textSocial}>Viber</RegularText>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default SocialBottomSheet;

const styles = StyleSheet.create({
  body: {
    padding: kSpacing.kSpacing15,
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
  groupButton: {
    marginRight: kScaledSize(30),
  },
  textSocial: {
    fontSize: kTextSizes.xxmini,
    marginTop: kScaledSize(10),
  },
});
