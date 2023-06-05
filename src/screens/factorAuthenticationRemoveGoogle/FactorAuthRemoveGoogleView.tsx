import React, { useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from 'react-native';
// Components
import { Container } from '../../components/container';
import { MediumText, RegularText, SemiBoldText } from '../../components/texts';
import { GradientButton } from '../../components/buttons';
import { Header } from '../../components/headers';
import { AppLoader } from '../../components/loaders';
// Constants
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
// Layout
import Layout from '../../theme/Layout';
import Colors from '../../theme/Colors';
// Translate
import i18next from 'i18next';
import { CommonTextInput } from '../../components/inputs';
import { Control } from 'react-hook-form';

interface Props {
  isLoading: boolean;
  isLoadingOTP: boolean;
  timerCount: any;
  setTimer: any;
  phoneData: any;
  onSignInWithPhone: () => Promise<void>;
  onConfirm2Fa: () => void;
  autoFocus: boolean;
  control: Control;
  handleSubmit: any;
  errors: any;
}

const FactorAuthRemoveGoogleView = ({
  isLoading,
  isLoadingOTP,
  timerCount,
  setTimer,
  phoneData,
  onSignInWithPhone,
  onConfirm2Fa,
  autoFocus,
  control,
  handleSubmit,
  errors,
}: Props) => {
  return (
    <View style={[Layout.container]}>
      {(isLoading || isLoadingOTP) && <AppLoader />}
      <Header name={i18next.t('LoginVerifyTokenScreen.Title')} />
      <KeyboardAvoidingView style={Layout.fill} behavior="padding">
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.typingText}>
            <SemiBoldText style={styles.title}>
              {i18next.t('LoginVerifyTokenScreen.Header')}
            </SemiBoldText>
          </View>

          <View style={[styles.boxInput, Layout.boxShadow]}>
            <SemiBoldText style={styles.titleInput}>
              {i18next.t('LoginVerifyTokenScreen.PhoneCode')}
            </SemiBoldText>
            <View style={(Layout.rowBetween, Layout.rowHCenter)}>
              <CommonTextInput
                controller={{
                  name: 'phone',
                  control: control,
                  rules: {
                    required: {
                      value: true,
                      message: i18next.t('Validator.Require'),
                    },
                    validate: value =>
                      value.length === 6 ||
                      `${i18next.t('Validator.Length').replace('$5', '6')}`,
                  },
                }}
                style={styles.input}
                errorText={errors?.phone?.message}
                placeholder={i18next.t('Input.EnterCode')}
                inputProps={{
                  keyboardType: 'number-pad',
                  maxLength: 6,
                }}
              />
              <View style={[{ marginLeft: kSpacing.kSpacing10 }]}>
                {timerCount <= 0 ? (
                  <TouchableOpacity onPress={onSignInWithPhone}>
                    <RegularText
                      style={[styles.text, { color: Colors.purple }]}>
                      {i18next.t('LoginVerifyTokenScreen.ReSend')}
                    </RegularText>
                  </TouchableOpacity>
                ) : (
                  <MediumText style={styles.text}>
                    00:
                    {timerCount < 10 && '0'}
                    {timerCount >= 0 ? timerCount : 0}
                  </MediumText>
                )}
              </View>
            </View>
            <RegularText style={styles.textNote}>
              {i18next.t('LoginVerifyTokenScreen.NotePhoneCode')}{' '}
              <RegularText style={[styles.textNote, { color: Colors.black }]}>
                {phoneData.phone_full}
              </RegularText>
            </RegularText>
          </View>

          <View style={[styles.boxInput, Layout.boxShadow]}>
            <SemiBoldText style={styles.titleInput}>
              {i18next.t('LoginVerifyTokenScreen.GoogleCode')}
            </SemiBoldText>
            <CommonTextInput
              controller={{
                name: 'google',
                control: control,
                rules: {
                  required: {
                    value: true,
                    message: i18next.t('Validator.Require'),
                  },
                  validate: value =>
                    value.length === 6 ||
                    `${i18next.t('Validator.Length').replace('$5', '6')}`,
                },
              }}
              errorText={errors?.google?.message}
              placeholder={i18next.t('Input.EnterCode')}
              inputProps={{
                keyboardType: 'number-pad',
                maxLength: 6,
              }}
            />
            <RegularText style={styles.textNote}>
              {i18next.t('LoginVerifyTokenScreen.NoteGoogleCode')}
            </RegularText>
          </View>
        </ScrollView>
        <View style={styles.button}>
          <GradientButton
            label={i18next.t('Button.Continue')}
            onPress={handleSubmit(onConfirm2Fa)}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default FactorAuthRemoveGoogleView;

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
  boxInput: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.grey10,
    paddingHorizontal: kSpacing.kSpacing16,
    paddingVertical: kSpacing.kSpacing20,
    marginVertical: kSpacing.kSpacing15,
  },
  titleInput: {
    marginBottom: kSpacing.kSpacing15,
  },
  textNote: {
    fontSize: kTextSizes.mini,
    color: Colors.note,
  },
  fontCommon: {
    fontSize: kTextSizes.mini,
  },
  copy: {
    color: Colors.purple,
    marginLeft: kScaledSize(30),
  },
  nextButton: {
    paddingHorizontal: kSpacing.kSpacing16,
    marginBottom: kScaledSize(30),
  },
  input: {
    flex: 1,
  },
});
