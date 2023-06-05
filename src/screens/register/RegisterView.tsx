import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from 'react-native';
// Components
import { ScrollContainer } from '../../components/container';
import { MediumText, RegularText, SemiBoldText } from '../../components/texts';
import {
  CommonTextInput,
  PasswordTextInput,
  QRTextInput,
} from '../../components/inputs';
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
// Phone
import CountryPicker, {
  CountryFilter,
} from 'react-native-country-picker-modal';

CountryFilter.defaultProps = {
  autoFocus: false,
  placeholder: i18next.t('Input.Search'),
};

interface Props {
  isLoading: boolean;
  isSocialLoading: boolean;
  handleRegister: (data: any) => Promise<void>;
  handleSubmit: any;
  control: Control;
  errors: any;
  phoneCode: string;
  setPhoneCode: React.Dispatch<React.SetStateAction<string>>;
  phoneCountry: any;
  setPhoneCountry: React.Dispatch<React.SetStateAction<string>>;
  passwordRef: React.MutableRefObject<{}>;
  onOpenPolicy: () => void;
  onGoback: () => void;
  onGoogleLogin: () => Promise<void>;
  onAppleLogin: () => Promise<void>;
  googleToken: string;
  appleToken: string;
}

const RegisterView = ({
  isLoading,
  isSocialLoading,
  handleRegister,
  handleSubmit,
  control,
  errors,
  phoneCode,
  setPhoneCode,
  phoneCountry,
  setPhoneCountry,
  passwordRef,
  onOpenPolicy,
  onGoback,
  onGoogleLogin,
  onAppleLogin,
  googleToken,
  appleToken,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <View style={Layout.fill}>
      {(isLoading || isSocialLoading) && <AppLoader />}
      <Header />
      <ScrollContainer contentStyle={styles.container}>
        <SemiBoldText style={styles.title}>
          {i18next.t('RegisterScreen.Title')}
        </SemiBoldText>
        <RegularText style={styles.welcomeText}>
          {i18next.t('RegisterScreen.Welcome')}
        </RegularText>
        <CommonTextInput
          controller={{
            name: 'surname',
            control: control,
            rules: {
              required: {
                value: true,
                message: i18next.t('Validator.Require'),
              },
            },
          }}
          errorText={errors?.surname?.message}
          placeholder={i18next.t('Input.SurName')}
          inputProps={{
            autoCapitalize: 'words',
          }}
        />
        <CommonTextInput
          controller={{
            name: 'name',
            control: control,
            rules: {
              required: {
                value: true,
                message: i18next.t('Validator.Require'),
              },
            },
          }}
          errorText={errors?.name?.message}
          placeholder={i18next.t('Input.Name')}
          inputProps={{
            autoCapitalize: 'words',
          }}
        />
        <View
          style={[
            styles.phoneWrapper,
            Layout.row,
            { marginBottom: errors?.phone?.message ? 0 : kSpacing.kSpacing18 },
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
              borderColor: errors?.phone?.message ? Colors.error : Colors.grey6,
            }}
            style={{
              flex: 1,
              height: kScaledSize(40),
            }}
          />
        </View>
        {/* Phone validator */}
        {errors?.phone?.message && (
          <RegularText style={styles.error}>
            {errors?.phone?.message}
          </RegularText>
        )}
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
        <QRTextInput
          controller={{
            name: 'present_code',
            control: control,
          }}
          placeholder={i18next.t('Input.Presenter')}
        />
        <GradientButton
          label={i18next.t('Button.Continue')}
          onPress={handleSubmit(handleRegister)}
          style={styles.registerButton}
        />
        <RegularText
          style={[styles.text, styles.policy, { color: Colors.black }]}>
          {i18next.t('RegisterScreen.ContinuePolicy')}
          <RegularText onPress={onOpenPolicy} style={[styles.text]}>
            {' '}
            {i18next.t('RegisterScreen.Policy')}{' '}
          </RegularText>
          <RegularText style={[styles.text, { color: Colors.black }]}>
            {i18next.t('Common.And')}
          </RegularText>
          <RegularText onPress={onOpenPolicy} style={[styles.text]}>
            {' '}
            {i18next.t('RegisterScreen.Secure')}{' '}
          </RegularText>
          {i18next.t('Common.ANCs')}.
        </RegularText>
        <View style={[styles.footer]}>
          <MediumText style={[styles.loginOption, Layout.textCenter]}>
            {i18next.t('RegisterScreen.RegisterOption')}
          </MediumText>
          <View style={[Layout.rowBetween]}>
            <TouchableOpacity
              onPress={onGoogleLogin}
              style={[
                styles.socialButton,
                Layout.center,
                {
                  marginRight: kSpacing.kSpacing6,
                  borderColor:
                    googleToken !== '' ? Colors.primary : Colors.grey6,
                },
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
                {
                  marginLeft: kSpacing.kSpacing6,
                  borderColor:
                    appleToken !== '' ? Colors.primary : Colors.grey6,
                },
              ]}>
              <Image
                source={require('../../assets/images/icon-apple.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
          <RegularText
            style={[
              styles.text,
              Layout.textCenter,
              { color: Colors.black, marginVertical: kSpacing.kSpacing17 },
            ]}>
            {i18next.t('RegisterScreen.AlreadyRegisted')}
            <RegularText onPress={onGoback} style={[styles.text]}>
              {' '}
              {i18next.t('RegisterScreen.SignIn')}
            </RegularText>
          </RegularText>
        </View>
      </ScrollContainer>
    </View>
  );
};

export default RegisterView;

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
  text: {
    color: Colors.primary,
    fontSize: kTextSizes.mini,
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
  registerButton: {
    marginTop: kScaledSize(22),
  },
  policy: {
    marginTop: kSpacing.kSpacing10,
    marginBottom: kSpacing.kSpacing20,
  },
  loginOption: {
    fontSize: kTextSizes.middle,
    marginBottom: kScaledSize(21),
  },
  footer: {
    paddingHorizontal: kScaledSize(10),
    marginBottom: kSpacing.kSpacing20,
  },
  socialButton: {
    flex: 1,
    height: kScaledSize(64),
    borderWidth: 1,
    borderRadius: 8,
  },
  socialIcon: {
    width: kScaledSize(24),
    height: kScaledSize(24),
    resizeMode: 'contain',
  },
  error: {
    marginTop: kSpacing.kSpacing10,
    color: Colors.error,
    fontSize: kTextSizes.xmini,
  },
});
