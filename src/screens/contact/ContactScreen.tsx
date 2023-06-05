import React, { useCallback, useRef, useState } from 'react';
import i18next from 'i18next';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import { onDeleteEmail, onDeletePhone } from '../../store/slices/ContactSlice';
import ContactView from './ContactView';
import { handleAlert } from '../../utils/Notification';

const ContactScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { phoneList, emailList, isLoading } = useAppSelector(
    state => state.contact,
  );
  const { userInfo } = useAppSelector(state => state.auth);
  const [isAddPhone, setAddPhone] = useState<boolean>(true);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const bottomSheetRef2 = useRef<BottomSheetModal>(null);
  const onShowSheet = useCallback((onShowPhone: boolean): void => {
    bottomSheetRef.current?.present();
    setAddPhone(onShowPhone ? true : false);
  }, []);
  const onShowSheetScocial = useCallback((): void => {
    bottomSheetRef2.current?.present();
  }, []);
  const onDismiss = (): void => {
    bottomSheetRef.current?.dismiss();
  };
  const removeEmail = async (index: number): Promise<void> => {
    handleAlert({
      message: i18next.t('ContactScreen.DeleteEmail'),
      buttonText1: i18next.t('Button.Accept'),
      buttonText2: i18next.t('Button.Cancel'),
      onPress1: async () => await dispatch(onDeleteEmail(index)),
    });
  };
  const removePhone = async (index: number): Promise<void> => {
    handleAlert({
      message: i18next.t('ContactScreen.DeletePhone'),
      buttonText1: i18next.t('Button.Accept'),
      buttonText2: i18next.t('Button.Cancel'),
      onPress1: async () => await dispatch(onDeletePhone(index)),
    });
  };
  return (
    <ContactView
      isLoading={isLoading}
      bottomSheetRef={bottomSheetRef}
      bottomSheetRef2={bottomSheetRef2}
      onShowSheetScocial={onShowSheetScocial}
      onShowSheet={onShowSheet}
      isAddPhone={isAddPhone}
      onDismiss={onDismiss}
      phoneList={phoneList}
      removePhone={removePhone}
      removeEmail={removeEmail}
      emailList={emailList}
      userInfo={userInfo}
    />
  );
};

export default ContactScreen;
