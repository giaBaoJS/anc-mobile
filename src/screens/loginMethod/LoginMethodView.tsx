import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
//Translate
import i18next from 'i18next';
//Components
import { Container } from '../../components/container';
import { MediumText, RegularText, SemiBoldText } from '../../components/texts';
import { Header } from '../../components/headers';
//Layout
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
import { hideEmail } from '../../utils/Common';
//Icon
import AntDesign from 'react-native-vector-icons/AntDesign';
import SwitchCustom from '../../components/switch/Switch';
import { FaceIcon, FingerprintIcon } from '../../utils/SvgIcon';
import { AppLoader } from '../../components/loaders';
import { UserInfoField } from '../../models/Auth';
import { LoginMethodField } from './LoginMethodScreen';
interface Props {
  isLoading: boolean;
  isEnabled: LoginMethodField;
  isBioEnbale: boolean;
  isSupported: boolean;
  typeBio: string | null;
  onActiveBiometric: () => Promise<void>;
  onActiveGoogle: () => Promise<void>;
  onActiveApple: () => Promise<void>;
  userInfo: null | UserInfoField;
}

const LoginMethodView = ({
  isEnabled,
  isLoading,
  typeBio,
  isBioEnbale,
  onActiveBiometric,
  isSupported,
  onActiveGoogle,
  onActiveApple,
  userInfo,
}: Props) => {
  return (
    <Container>
      {isLoading && <AppLoader />}
      <Header name={i18next.t('LoginMethodScreen.Title')} />
      <View style={{ zIndex: -1 }}>
        <View style={styles.container}>
          <SemiBoldText style={styles.title}>
            {i18next.t('LoginMethodScreen.Title')}
          </SemiBoldText>
          <MediumText style={[styles.textWarning, styles.fontCommon]}>
            {i18next.t('LoginMethodScreen.TextWarning')}
          </MediumText>
          <RegularText style={[styles.message, styles.fontCommon]}>
            {i18next.t('LoginMethodScreen.Message')}
          </RegularText>
        </View>
        <View
          style={[styles.groupFeature, Layout.rowBetween, Layout.boxShadow]}>
          <View style={[Layout.rowHCenter]}>
            <View style={styles.faceIcon}>
              {typeBio === 'FaceID' || typeBio === 'Face' ? (
                <FaceIcon color={Colors.primary} />
              ) : (
                <FingerprintIcon color={Colors.primary} />
              )}
            </View>
            <RegularText style={styles.spacing}>
              {i18next.t('LoginMethodScreen.Biometric')}
            </RegularText>
          </View>
          <SwitchCustom isEnabled={isBioEnbale} onToggled={onActiveBiometric} />
        </View>
        <View
          style={[styles.groupFeature, Layout.rowBetween, Layout.boxShadow]}>
          <View style={[Layout.rowHCenter]}>
            <AntDesign
              name="google"
              size={kScaledSize(22)}
              color={Colors.primary}
            />
            <RegularText style={styles.spacing}>
              {i18next.t('LoginMethodScreen.Google')}
            </RegularText>
          </View>
          <SwitchCustom
            isEnabled={isEnabled.google}
            onToggled={onActiveGoogle}
          />
        </View>
        {isEnabled.google && userInfo?.google_account.google_email && (
          <View style={[styles.idLogin, Layout.rowBetween]}>
            <RegularText style={[styles.fontCommon, { color: Colors.grey6 }]}>
              {i18next.t('LoginMethodScreen.IdLogin')}
            </RegularText>
            <MediumText style={[styles.fontCommon, { color: Colors.grey5 }]}>
              {userInfo?.google_account.google_email &&
                hideEmail(userInfo?.google_account.google_email)}
            </MediumText>
          </View>
        )}
        <View
          style={[styles.groupFeature, Layout.rowBetween, Layout.boxShadow]}>
          <View style={[Layout.rowHCenter]}>
            <AntDesign
              name="apple1"
              size={kScaledSize(22)}
              color={Colors.primary}
            />
            <RegularText style={styles.spacing}>
              {i18next.t('LoginMethodScreen.Apple')}
            </RegularText>
          </View>
          <SwitchCustom isEnabled={isEnabled.apple} onToggled={onActiveApple} />
        </View>
        {isEnabled.apple && userInfo?.apple_account.apple_email && (
          <View style={[styles.idLogin, Layout.rowBetween]}>
            <RegularText style={[styles.fontCommon, { color: Colors.grey6 }]}>
              {i18next.t('LoginMethodScreen.IdLogin')}
            </RegularText>
            <MediumText style={[styles.fontCommon, { color: Colors.grey5 }]}>
              {userInfo?.apple_account.apple_email &&
                hideEmail(userInfo?.apple_account.apple_email)}
            </MediumText>
          </View>
        )}
      </View>
    </Container>
  );
};

export default LoginMethodView;

const styles = StyleSheet.create({
  container: {
    padding: kSpacing.kSpacing16,
  },
  title: {
    marginVertical: kSpacing.kSpacing20,
    fontSize: kTextSizes.xlarge,
  },
  fontCommon: {
    fontSize: kTextSizes.mini,
  },
  textWarning: {
    color: Colors.primary,
    marginBottom: kSpacing.kSpacing5,
  },
  message: {
    color: Colors.grey6,
    marginBottom: kSpacing.kSpacing15,
  },
  groupFeature: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingHorizontal: kSpacing.kSpacing15,
    paddingVertical: kSpacing.kSpacing10,
    marginBottom: kSpacing.kSpacing15,
  },
  spacing: {
    marginLeft: kSpacing.kSpacing10,
  },
  idLogin: {
    paddingHorizontal: kSpacing.kSpacing16,
    paddingBottom: kSpacing.kSpacing15,
    marginBottom: kSpacing.kSpacing15,
    borderBottomWidth: 1,
    borderColor: Colors.grey7,
  },
  faceIcon: {
    width: kScaledSize(22),
    height: kScaledSize(22),
  },
});
