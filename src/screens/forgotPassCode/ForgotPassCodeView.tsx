import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  LayoutChangeEvent,
  TextInput,
} from 'react-native';
// Components
import { Container } from '../../components/container';
import { MediumText, RegularText, SemiBoldText } from '../../components/texts';
import { GradientButton } from '../../components/buttons';
import { Header } from '../../components/headers';
import { AppLoader } from '../../components/loaders';
// Constants
import {
  kScaledSize,
  kSpacing,
  kTextSizes,
  kWidth,
} from '../../utils/Constants';
// Layout
import Layout from '../../theme/Layout';
import Colors from '../../theme/Colors';
// Translate
import i18next from 'i18next';
// CodeInput field
import {
  useBlurOnFulfill,
  CodeField,
  Cursor,
} from 'react-native-confirmation-code-field';
import { AuthRegisterValidationField } from '../../models/Auth';
import { CELL_COUNT } from '../otp/OTPScreen';
import { formValueType } from '../../navigators/stacks/ForgotPassStack';
import { formatFirstZero } from '../../utils/Common';

interface Props {
  codeProp: any;
  isLoadingOTP: boolean;
  getCellOnLayoutHandle: (index: number) => (event: LayoutChangeEvent) => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onConfirmCode: () => Promise<void>;
  onForgotPassWithPhone: () => Promise<void>;
  onForgotWithEmail: () => Promise<void>;
  formValue: formValueType;
  phoneCode: string | undefined;
  autoFocus: boolean;
  timerCount: any;
  setTimer: any;
}

const ForgotPassCodeView = ({
  codeProp,
  isLoadingOTP,
  getCellOnLayoutHandle,
  value,
  setValue,
  onConfirmCode,
  onForgotPassWithPhone,
  onForgotWithEmail,
  formValue,
  phoneCode,
  autoFocus,
  timerCount,
  setTimer,
}: Props) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        ref.current?.focus();
      }, 100);
    }
  }, [autoFocus]);
  return (
    <View style={[Layout.container]}>
      {isLoadingOTP && <AppLoader />}
      <Header name={i18next.t('ForgotPasswordScreen.Title')} />
      <KeyboardAvoidingView style={Layout.fill} behavior="padding">
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.container}>
            <View style={styles.typingText}>
              <SemiBoldText style={styles.title}>
                {i18next.t('ForgotPassCodeScreen.Title')}
              </SemiBoldText>
              <RegularText style={styles.welcomeText}>
                {i18next.t('ForgotPassCodeScreen.Welcome')}
              </RegularText>
              <RegularText>
                (
                {formValue?.phone
                  ? `+84${formatFirstZero(formValue?.phone)}`
                  : formValue?.email}
                )
              </RegularText>
            </View>
            <CodeField
              ref={ref}
              {...codeProp}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              blurOnSubmit={false}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                  onLayout={getCellOnLayoutHandle(index)}
                  key={index}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}>
                  <RegularText style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </RegularText>
                </View>
              )}
            />
            {timerCount <= 0 ? (
              <TouchableOpacity
                onPress={() => {
                  if (formValue?.phone) {
                    onForgotPassWithPhone();
                  } else {
                    onForgotWithEmail();
                  }
                }}>
                <RegularText style={[styles.textWarning, Layout.textCenter]}>
                  {i18next.t('ForgotPassCodeScreen.NotReceiveCode')}
                  <RegularText
                    style={[styles.textWarning, { color: Colors.warning }]}>
                    {i18next.t('ForgotPassCodeScreen.Resend')}
                  </RegularText>
                </RegularText>
              </TouchableOpacity>
            ) : (
              <View style={[Layout.rowCenter, styles.textWrapper]}>
                <RegularText style={[styles.text]}>
                  {i18next.t('OTPScreen.ReSendIn')}
                  {'   '}
                </RegularText>
                <MediumText style={styles.text}>
                  00:
                  {timerCount < 10 && '0'}
                  {timerCount >= 0 ? timerCount : 0}
                </MediumText>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={styles.button}>
          <GradientButton
            isDisable={value.length !== 6 ? true : false}
            label={i18next.t('Button.Continue')}
            onPress={onConfirmCode}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPassCodeView;

const styles = StyleSheet.create({
  container: {
    padding: kSpacing.kSpacing16,
  },
  title: {
    marginTop: kSpacing.kSpacing20,
    fontSize: kTextSizes.xlarge,
  },
  typingText: {
    marginBottom: kScaledSize(30),
  },
  welcomeText: {
    fontSize: kTextSizes.medium,
    color: Colors.primary,
    marginTop: kSpacing.kSpacing20,
    lineHeight: Platform.OS === 'ios' ? 22 : 23,
  },
  codeFieldRoot: {
    marginBottom: kScaledSize(40),
  },
  cellRoot: {
    width: kScaledSize(45),
    marginHorizontal: kSpacing.kSpacing5,
    height: kScaledSize(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
  },
  cellText: {
    color: '#000',
    fontSize: kScaledSize(26),
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
  },
  textWrapper: {
    marginTop: kScaledSize(30),
  },
  text: {
    fontSize: kTextSizes.small,
  },
  textWarning: {
    fontSize: kTextSizes.mini,
    marginBottom: kScaledSize(48),
  },
  button: {
    paddingHorizontal: kSpacing.kSpacing16,
    marginBottom: kScaledSize(30),
  },
});
