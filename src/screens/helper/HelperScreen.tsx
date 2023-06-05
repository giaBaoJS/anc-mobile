import React, { useRef, useCallback } from 'react';
import { View } from 'react-native';
import HelperView from './HelperView';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const HelperScreen: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const onShowSheet = useCallback((): void => {
    bottomSheetRef.current?.present();
  }, []);
  return (
    <HelperView onShowSheet={onShowSheet} bottomSheetRef={bottomSheetRef} />
  );
};

export default HelperScreen;
