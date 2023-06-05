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
import { CELL_COUNT } from './OTPScreen';
import { AuthRegisterValidationField } from '../../models/Auth';

interface Props {
  isLoading: boolean;
  isLoadingOTP: boolean;
  codeProp: any;
  getCellOnLayoutHandle: (index: number) => (event: LayoutChangeEvent) => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  timerCount: any;
  setTimer: any;
  userData: AuthRegisterValidationField;
  phoneCode: string;
  onSignInWithPhone: () => Promise<void>;
  onConfirmCode: () => Promise<void>;
  autoFocus: boolean;
}

const OTPView = ({
  isLoading,
  isLoadingOTP,
  codeProp,
  getCellOnLayoutHandle,
  value,
  setValue,
  timerCount,
  setTimer,
  userData,
  phoneCode,
  onSignInWithPhone,
  onConfirmCode,
  autoFocus,
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
      {(isLoading || isLoadingOTP) && <AppLoader />}
      <Header name={i18next.t('OTPScreen.Title')} />
      <KeyboardAvoidingView style={Layout.fill} behavior="padding">
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.typingText}>
            <SemiBoldText style={styles.title}>
              {i18next.t('OTPScreen.Typing')}
            </SemiBoldText>
            <RegularText style={styles.welcomeText}>
              {i18next.t('OTPScreen.Welcome')}
            </RegularText>
            <RegularText>
              (+{phoneCode}
              {userData.phone})
            </RegularText>
          </View>
          <CodeField
            ref={ref}
            {...codeProp}
            // autoFocus={autoFocus}
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
                onSignInWithPhone();
                setTimer(59, true);
              }}>
              <RegularText
                style={[
                  Layout.textCenter,
                  styles.textWrapper,
                  styles.text,
                  { color: Colors.warning },
                ]}>
                {i18next.t('OTPScreen.ReSend')}
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

export default OTPView;

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
    marginTop: kSpacing.kSpacing20,
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
  button: {
    paddingHorizontal: kSpacing.kSpacing16,
    marginBottom: kScaledSize(30),
  },
});
