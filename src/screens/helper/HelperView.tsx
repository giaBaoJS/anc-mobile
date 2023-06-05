import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/buttons';
import { Container } from '../../components/container';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Layout from '../../theme/Layout';
import { ImageBottomSheet } from '../../components/bottomSheet';

interface Props {
  onShowSheet: () => void;
  bottomSheetRef: React.ForwardedRef<BottomSheetModal>;
}

const HelperView = ({ onShowSheet, bottomSheetRef }: Props) => {
  return (
    <Container>
      <View style={[Layout.fill, Layout.center]}>
        <Button title="Show Sheet" onPress={onShowSheet} />
      </View>
      <ImageBottomSheet bottomSheetRef={bottomSheetRef} />
    </Container>
  );
};

export default HelperView;

const styles = StyleSheet.create({});
