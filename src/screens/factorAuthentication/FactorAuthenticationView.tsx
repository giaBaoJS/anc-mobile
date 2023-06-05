import i18next from 'i18next';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '../../components/container';
import { Header } from '../../components/headers';
import { MediumText, RegularText, SemiBoldText } from '../../components/texts';
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { SecurityActive2FaField } from '../../models/Security';

interface Props {
  isLoading: boolean;
  active2Fa: SecurityActive2FaField;
  onNavigate: (endpoint: string) => void;
}

const FactorAuthenticationView = ({
  isLoading,
  active2Fa,
  onNavigate,
}: Props) => {
  return (
    <Container>
      <Header name={i18next.t('FactorAuthenScreen.Title')} />
      <View style={styles.container}>
        <SemiBoldText style={styles.title}>
          {i18next.t('FactorAuthenScreen.Title')}
        </SemiBoldText>
        <RegularText style={[styles.textWarning, styles.fontCommon]}>
          {i18next.t('FactorAuthenScreen.Welcome')}
        </RegularText>
        <RegularText style={[styles.message, styles.fontMessage]}>
          {i18next.t('FactorAuthenScreen.Introduction')}
        </RegularText>
        <View style={Layout.rowBetween}>
          <TouchableOpacity
            onPress={() => onNavigate('google')}
            style={[
              styles.wrapButton,
              styles.left,
              Layout.boxShadow,
              {
                borderColor: active2Fa.authenticate_by_google
                  ? Colors.primary
                  : 'transparent',
              },
            ]}>
            <View style={[styles.groupContent, Layout.rowBetween]}>
              <Image
                style={styles.google}
                source={require('../../assets/images/google.png')}
              />
              <View style={Layout.rowBetween}>
                <RegularText
                  style={[
                    styles.fontStatus,
                    {
                      color: active2Fa.authenticate_by_google
                        ? Colors.primary
                        : Colors.black,
                    },
                  ]}>
                  {active2Fa.authenticate_by_google
                    ? i18next.t('FactorAuthenScreen.Active')
                    : i18next.t('FactorAuthenScreen.DeActive')}
                </RegularText>
                <Ionicons
                  name="radio-button-on"
                  color={
                    active2Fa.authenticate_by_google
                      ? Colors.primary
                      : Colors.grey6
                  }
                  size={kScaledSize(18)}
                />
              </View>
            </View>
            <RegularText style={[styles.fontCommon, styles.name]}>
              {i18next.t('FactorAuthenScreen.Google')}
            </RegularText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNavigate('sms')}
            style={[
              styles.wrapButton,
              Layout.boxShadow,
              {
                borderColor: active2Fa.authenticate_by_sms
                  ? Colors.primary
                  : 'transparent',
              },
            ]}>
            <View style={[styles.groupContent, Layout.rowBetween]}>
              <Entypo
                name="mobile"
                color={Colors.grey6}
                size={kScaledSize(35)}
              />
              <View style={Layout.rowBetween}>
                <RegularText
                  style={[
                    styles.fontStatus,
                    {
                      color: active2Fa.authenticate_by_sms
                        ? Colors.primary
                        : Colors.black,
                    },
                  ]}>
                  {active2Fa.authenticate_by_sms
                    ? i18next.t('FactorAuthenScreen.Active')
                    : i18next.t('FactorAuthenScreen.DeActive')}
                </RegularText>
                <Ionicons
                  name="radio-button-on"
                  color={
                    active2Fa.authenticate_by_sms
                      ? Colors.primary
                      : Colors.grey6
                  }
                  size={kScaledSize(18)}
                />
              </View>
            </View>
            <RegularText style={[styles.fontCommon, styles.name]}>
              {i18next.t('FactorAuthenScreen.SMS')}
            </RegularText>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default FactorAuthenticationView;

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
  fontMessage: {
    fontSize: kTextSizes.xmini,
  },
  fontStatus: {
    fontSize: kTextSizes.xmini,
    marginLeft: kSpacing.kSpacing12,
    marginRight: kSpacing.kSpacing5,
  },
  textWarning: {
    color: Colors.primary,
    marginBottom: kSpacing.kSpacing5,
  },
  message: {
    color: Colors.grey6,
    marginBottom: kScaledSize(40),
  },
  wrapButton: {
    backgroundColor: Colors.white,
    padding: kSpacing.kSpacing10,
    borderRadius: 5,
    flex: 1 / 2,
    borderWidth: 1,
  },
  left: {
    marginRight: kSpacing.kSpacing15,
  },
  groupContent: {
    marginBottom: kSpacing.kSpacing12,
  },
  google: {
    resizeMode: 'contain',
    width: kScaledSize(35),
    height: kScaledSize(35),
  },
  name: {
    textAlign: 'center',
  },
});
