import React, { useCallback, useMemo, useState } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useForm } from 'react-hook-form';
import CountryPicker from 'react-native-country-picker-modal';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
//Translate
import i18next from 'i18next';
//Hooks & model
import { useAppDispatch } from '../../hooks/RTKHooks';
import { onAddEmail, onAddPhone } from '../../store/slices/ContactSlice';
//Components
import { Button } from '../buttons';
import { RegularText, SemiBoldText } from '../texts';
import { SheetTextInput } from '../inputs';
//Layouts
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';

interface Props {
  bottomSheetRef: React.ForwardedRef<BottomSheetModal>;
  addPhone: boolean;
  onDismiss: () => void;
}

const SNAP_HEIGHT = kScaledSize(310);

const ContactBottomSheet = ({ bottomSheetRef, addPhone, onDismiss }: Props) => {
  // Form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const dispatch = useAppDispatch();
  const [phoneCode, setPhoneCode] = useState<string>('84');
  const [phoneCountry, setPhoneCountry] = useState<any>('VN');
  const [open, setOpen] = useState<boolean>(false);

  const snapPoints = useMemo(() => [SNAP_HEIGHT], []);

  const onHandleSubmit = async (data: any): Promise<void> => {
    try {
      Keyboard.dismiss();
      if (data.email) {
        await dispatch(
          onAddEmail({
            title: data.title,
            email: data.email,
          }),
        );
        onCancel();
        reset({ data: 'email' });
        console.log(data);
      } else {
        await dispatch(
          onAddPhone({
            title: data.title,
            phone: data.phone,
          }),
        );
        onCancel();
        reset({ data: 'phone' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCancel = (): void => {
    onDismiss();
    reset();
  };
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
      keyboardBlurBehavior="restore"
      handleComponent={renderHandle}>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.body]}>
        <SemiBoldText style={styles.title}>
          {i18next.t(`BottomSheet.${addPhone ? 'AddPhone' : 'AddEmail'}`)}
        </SemiBoldText>
        <SheetTextInput
          controller={{
            name: 'title',
            control: control,
            rules: {
              required: {
                value: true,
                message: i18next.t('Validator.Require'),
              },
            },
          }}
          errorText={errors?.title?.message}
          placeholder={i18next.t('Input.Title')}
          inputProps={{
            autoCapitalize: 'words',
          }}
        />
        {!addPhone ? (
          <SheetTextInput
            controller={{
              name: 'email',
              control: control,
              rules: {
                required: {
                  value: true,
                  message: i18next.t('Validator.Require'),
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: i18next.t('Validator.Email'),
                },
              },
            }}
            errorText={errors?.email?.message}
            placeholder={i18next.t('Input.Email')}
            inputProps={{
              autoCapitalize: 'none',
            }}
          />
        ) : (
          <View
            style={[
              styles.phoneWrapper,
              Layout.row,
              {
                marginBottom: errors?.phone?.message ? 0 : kSpacing.kSpacing18,
              },
            ]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setOpen(true)}
              style={[styles.phoneCode, Layout.rowHCenter]}>
              <CountryPicker
                countryCode={phoneCountry}
                withFilter
                withCallingCode
                onSelect={(data: any) => {
                  setPhoneCode(data.callingCode);
                  setPhoneCountry(data.cca2);
                }}
                onClose={() => setOpen(false)}
                visible={open}
              />
              <RegularText>+{phoneCode}</RegularText>
            </TouchableOpacity>
            <SheetTextInput
              controller={{
                name: 'phone',
                control: control,
                rules: {
                  required: {
                    value: true,
                    message: i18next.t('Validator.Require'),
                  },
                  pattern: {
                    value: /(3|5|7|8|9|0[3|5|7|8|9])+([0-9]{8})\b/g,
                    message: i18next.t('Validator.Phone'),
                  },
                },
              }}
              inputProps={{
                maxLength: 10,
                keyboardType: 'numeric',
              }}
              placeholder={i18next.t('Input.Phone')}
              inputStyle={{
                borderColor: errors?.phone?.message
                  ? Colors.error
                  : Colors.grey6,
              }}
              style={{
                flex: 1,
                height: kScaledSize(40),
              }}
            />
          </View>
        )}

        {errors?.phone?.message && (
          <RegularText style={styles.error}>
            {errors?.phone?.message}
          </RegularText>
        )}

        <View style={[Layout.rowBetween, styles.groupButton]}>
          <Button
            title={i18next.t('Input.Cancel')}
            style={styles.buttonCancel}
            onPress={onCancel}
          />
          <Button
            title={i18next.t('Input.Save')}
            style={styles.buttonSave}
            onPress={handleSubmit(onHandleSubmit)}
          />
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default ContactBottomSheet;

const styles = StyleSheet.create({
  body: {
    padding: kSpacing.kSpacing15,
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: kScaledSize(20),
  },
  container: {
    padding: kSpacing.kSpacing15,
  },
  handle: {
    height: 5,
    width: 35,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: kSpacing.kSpacing10,
  },
  phoneWrapper: {
    height: kScaledSize(40),
  },
  phoneCode: {
    borderBottomWidth: 1,
    borderColor: Colors.grey6,
    paddingHorizontal: kSpacing.kSpacing10,
    marginRight: kScaledSize(30),
  },
  error: {
    marginVertical: kSpacing.kSpacing10,
    color: Colors.error,
    fontSize: kTextSizes.xmini,
  },
  buttonCancel: {
    backgroundColor: '#DA1414',
    width: '50%',
    marginRight: kSpacing.kSpacing2,
  },
  buttonSave: {
    backgroundColor: Colors.primary,
    width: '50%',
  },
  groupButton: {
    marginVertical: kScaledSize(15),
  },
});
