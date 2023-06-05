import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryPicker, {
  CountryFilter,
} from 'react-native-country-picker-modal';
//Form
import { Control } from 'react-hook-form';
//Components
import { Header } from '../../components/headers';
import { GradientButton } from '../../components/buttons';
import { RegularText, SemiBoldText } from '../../components/texts';
import { CommonTextInput } from '../../components/inputs';
//Translate
import i18next from 'i18next';
//Layout
import Layout from '../../theme/Layout';
import Colors from '../../theme/Colors';
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
import { AppLoader } from '../../components/loaders';

interface Props {
  isLoading: boolean;
  byEmail: boolean;
  control: Control;
  errors: any;
  phoneCode: string;
  setPhoneCode: React.Dispatch<React.SetStateAction<string>>;
  phoneCountry: any;
  setPhoneCountry: React.Dispatch<React.SetStateAction<string>>;
  onHandleSubmit: (data: any) => Promise<void>;
  handleSubmit: any;
  checkError: any;
}

const ForgotPassResetView = ({
  isLoading,
  byEmail,
  control,
  errors,
  phoneCode,
  setPhoneCode,
  phoneCountry,
  setPhoneCountry,
  onHandleSubmit,
  handleSubmit,
  checkError,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <View style={Layout.fill}>
      {isLoading && <AppLoader />}
      <Header name={i18next.t('ForgotPasswordScreen.Title')} />
      <KeyboardAvoidingView style={Layout.fill} behavior="padding">
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.spacingContent}>
            <SemiBoldText style={styles.title}>
              {i18next.t(
                `ForgotPassResetScreen.${byEmail ? 'TitleEmail' : 'TitleSMS'}`,
              )}
            </SemiBoldText>
            <RegularText style={styles.warningText}>
              {i18next.t(
                `ForgotPassResetScreen.${
                  byEmail ? 'MakeSureSecurityEmail' : 'MakeSureSecuritySMS'
                }`,
              )}
            </RegularText>
          </View>

          <View style={[styles.boxInput, Layout.boxShadow]}>
            <SemiBoldText style={styles.titleInput}>
              {i18next.t(
                `ForgotPassResetScreen.${
                  byEmail ? 'EmailRegistered' : 'PhoneRegistered'
                }`,
              )}
            </SemiBoldText>
            {byEmail ? (
              <CommonTextInput
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
                    marginBottom: errors?.phone?.message
                      ? 0
                      : kSpacing.kSpacing18,
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
                <CommonTextInput
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
            {/* Phone validator */}
            {errors?.phone?.message && (
              <RegularText style={styles.error}>
                {errors?.phone?.message}
              </RegularText>
            )}
            <RegularText style={styles.textNote}>
              {i18next.t('ForgotPassResetScreen.SendCodeEmail')}
            </RegularText>
          </View>
        </ScrollView>
        <View style={styles.nextButton}>
          <GradientButton
            isDisable={
              checkError[0] !== undefined || checkError[1] !== undefined
                ? false
                : true
            }
            label={i18next.t('Button.Continue')}
            onPress={handleSubmit(onHandleSubmit)}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPassResetView;

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  spacingContent: {
    padding: kSpacing.kSpacing16,
  },
  title: {
    marginTop: kSpacing.kSpacing20,
    fontSize: kTextSizes.xlarge,
  },
  warningText: {
    marginTop: kScaledSize(40),
    marginBottom: kSpacing.kSpacing20,
    fontSize: kTextSizes.medium,
    color: Colors.primary,
    lineHeight: Platform.OS === 'ios' ? 22 : 23,
  },
  boxInput: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.grey10,
    paddingHorizontal: kSpacing.kSpacing16,
    paddingVertical: kSpacing.kSpacing20,
  },
  titleInput: {
    marginBottom: kSpacing.kSpacing15,
  },
  textNote: {
    fontSize: kTextSizes.xmini,
    color: '#84878E',
  },
  nextButton: {
    paddingHorizontal: kSpacing.kSpacing16,
    marginBottom: kScaledSize(30),
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
});
