import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
// Components
import { ScrollContainer } from '../../components/container';
import { MediumText, RegularText, SemiBoldText } from '../../components/texts';
import { CommonTextInput, PasswordTextInput } from '../../components/inputs';
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
// Form
import { Control } from 'react-hook-form';
// SVG icon
import { FaceIcon, FingerprintIcon } from '../../utils/SvgIcon';

interface Props {
  isLoading: boolean;
  isSocialLoading: boolean;
  typeBio: string | null;
  handleLogin: (data: any) => void;
  handleSubmit: any;
  control: Control;
  errors: any;
  onNavigate: (screen: string) => void;
  onGoogleLogin: () => Promise<void>;
  onAppleLogin: () => Promise<void>;
  onLoginWithBiometric: () => Promise<void>;
}

const LoginView = ({
  isLoading,
  isSocialLoading,
  typeBio,
  handleLogin,
  handleSubmit,
  control,
  errors,
  onNavigate,
  onGoogleLogin,
  onAppleLogin,
  onLoginWithBiometric,
}: Props) => {
  return (
    <View style={Layout.fill}>
      {(isLoading || isSocialLoading) && <AppLoader />}
      <Header />
      <ScrollContainer contentStyle={styles.container}>
        <SemiBoldText style={styles.title}>
          {i18next.t('LoginScreen.Title')}
        </SemiBoldText>
        <RegularText style={styles.welcomeText}>
          {i18next.t('LoginScreen.Welcome')}
        </RegularText>
        <CommonTextInput
          controller={{
            name: 'username',
            control: control,
            rules: {
              required: {
                value: true,
                message: i18next.t('Validator.Require'),
              },
              validate: value =>
                value.length >= 6 ||
                `${i18next.t('Validator.Min').replace('$5', '6')}`,
            },
          }}
          errorText={errors?.username?.message}
          placeholder={i18next.t('Input.Username')}
          inputProps={{
            autoCapitalize: 'none',
          }}
        />
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
        <GradientButton
          label={i18next.t('Button.Login')}
          onPress={handleSubmit(handleLogin)}
          style={styles.loginButton}
        />
        <View style={[styles.groupButton, Layout.rowBetween]}>
          <RegularText
            style={styles.text}
            onPress={() => onNavigate('ForgotPassStack')}>
            {i18next.t('Button.ForgetPassword')}
          </RegularText>
          <RegularText style={[styles.text, { color: Colors.black }]}>
            {i18next.t('Button.NoAccount')}{' '}
            <RegularText
              style={styles.text}
              onPress={() => onNavigate('RegisterScreen')}>
              {i18next.t('Button.Register')}
            </RegularText>
          </RegularText>
        </View>
        <View style={[styles.footer]}>
          <MediumText style={[styles.loginOption, Layout.textCenter]}>
            {i18next.t('LoginScreen.LoginOption')}
          </MediumText>
          <View style={[Layout.rowBetween]}>
            <TouchableOpacity
              onPress={onGoogleLogin}
              style={[
                styles.socialButton,
                Layout.center,
                { marginRight: kSpacing.kSpacing6 },
              ]}>
              <Image
                source={require('../../assets/images/icon-google.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onAppleLogin}
              style={[
                styles.socialButton,
                Layout.center,
                { marginLeft: kSpacing.kSpacing6 },
              ]}>
              <Image
                source={require('../../assets/images/icon-apple.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.biometric, Layout.rowCenter]}
            onPress={onLoginWithBiometric}>
            <RegularText style={[styles.text, { color: Colors.black }]}>
              {typeBio === 'FaceID' || typeBio === 'Face'
                ? i18next.t('LoginScreen.BiometricFace')
                : i18next.t('LoginScreen.BiometricFinger')}
            </RegularText>
            <View style={styles.faceIcon}>
              {typeBio === 'FaceID' || typeBio === 'Face' ? (
                <FaceIcon color={Colors.primary} />
              ) : (
                <FingerprintIcon color={Colors.primary} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: kSpacing.kSpacing16,
  },
  title: {
    marginTop: kSpacing.kSpacing20,
    fontSize: kTextSizes.xlarge,
  },
  welcomeText: {
    fontSize: kTextSizes.medium,
    color: Colors.primary,
    marginTop: kSpacing.kSpacing20,
    marginBottom: kScaledSize(30),
    lineHeight: Platform.OS === 'ios' ? 22 : 23,
  },
  loginButton: {
    marginTop: kScaledSize(22),
  },
  groupButton: {
    marginVertical: kSpacing.kSpacing11,
    flexWrap: 'wrap',
  },
  text: {
    color: Colors.primary,
    fontSize: kTextSizes.mini,
  },
  loginOption: {
    fontSize: kTextSizes.middle,
    marginBottom: kScaledSize(21),
  },
  footer: {
    paddingHorizontal: kSpacing.kSpacing10,
    marginTop: kScaledSize(50),
  },
  socialButton: {
    flex: 1,
    height: kScaledSize(64),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.grey6,
  },
  socialIcon: {
    width: kScaledSize(24),
    height: kScaledSize(24),
    resizeMode: 'contain',
  },
  biometric: {
    marginTop: kSpacing.kSpacing15,
  },
  faceIcon: {
    width: kScaledSize(15),
    height: kScaledSize(15),
    marginLeft: kSpacing.kSpacing10,
  },
});

export default LoginView;
