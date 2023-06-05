import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
// Components
import { RegularText, SemiBoldText } from '../../components/texts';
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
import { PasswordTextInput } from '../../components/inputs';
import { Control } from 'react-hook-form';

interface Props {
  control: Control;
  errors: any;
  passwordRef: React.MutableRefObject<{}>;
  onUpdateNewPass: (data: any) => Promise<void>;
  handleSubmit: any;
  isLoading: boolean;
}

const ForgotPassNewView = ({
  control,
  errors,
  passwordRef,
  onUpdateNewPass,
  handleSubmit,
  isLoading,
}: Props) => {
  return (
    <View style={[Layout.container]}>
      {isLoading && <AppLoader />}
      <Header name={i18next.t('ForgotPassNewScreen.TitleHeader')} />
      <KeyboardAvoidingView style={Layout.fill} behavior="padding">
        <ScrollView contentContainerStyle={styles.container}>
          <SemiBoldText style={styles.title}>
            {i18next.t('ForgotPassNewScreen.Title')}
          </SemiBoldText>
          <RegularText style={styles.warningText}>
            {i18next.t('ForgotPassNewScreen.TextWarning')}
          </RegularText>
          <PasswordTextInput
            controller={{
              name: 'password',
              control: control,
              rules: {
                required: {
                  value: true,
                  message: i18next.t('Validator.Require'),
                },
                validate: value =>
                  value.length >= 8 ||
                  `${i18next.t('Validator.Min').replace('$5', '8')}`,
              },
            }}
            errorText={errors?.password?.message}
            placeholder={i18next.t('Input.Password')}
          />
          <PasswordTextInput
            controller={{
              name: 're_password',
              control: control,
              rules: {
                required: {
                  value: true,
                  message: i18next.t('Validator.Require'),
                },
                validate: value =>
                  value === passwordRef.current ||
                  `${i18next.t('Validator.ConfirmPassword')}`,
              },
            }}
            errorText={errors?.re_password?.message}
            placeholder={i18next.t('Input.ConfirmPassword')}
          />
        </ScrollView>
        <View style={styles.buttonSend}>
          <GradientButton
            label={i18next.t('Button.Send')}
            onPress={handleSubmit(onUpdateNewPass)}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPassNewView;

const styles = StyleSheet.create({
  container: {
    padding: kSpacing.kSpacing16,
  },
  title: {
    marginTop: kSpacing.kSpacing20,
    fontSize: kTextSizes.xlarge,
    marginBottom: kScaledSize(40),
  },
  warningText: {
    fontSize: kTextSizes.mini,
    color: Colors.warning,
    marginBottom: kScaledSize(30),
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
  buttonSend: {
    padding: kSpacing.kSpacing16,
    marginBottom: kScaledSize(10),
  },
});
