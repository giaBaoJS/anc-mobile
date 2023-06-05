import i18next from 'i18next';
import React from 'react';
import { Control } from 'react-hook-form';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GradientButton } from '../../components/buttons';
import { Container, ScrollContainer } from '../../components/container';
import { Header } from '../../components/headers';
import { CommonTextInput } from '../../components/inputs';
import { AppLoader } from '../../components/loaders';
import { MediumText, RegularText, SemiBoldText } from '../../components/texts';
import { SecurityQrField } from '../../models/Security';
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
import { copyToClipboard } from '../../utils/Common';
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';

interface Props {
  onNavigate: () => void;
  isLoading: boolean;
  control: Control;
  errors: any;
  qrData: SecurityQrField;
  handleSubmit: any;
  onVerifyGoogleAuth: () => Promise<void>;
}

const FactorGoogleView = ({
  onNavigate,
  control,
  errors,
  isLoading,
  qrData,
  handleSubmit,
  onVerifyGoogleAuth,
}: Props) => {
  return (
    <View style={[Layout.fill]}>
      {isLoading && <AppLoader />}
      <Header name={i18next.t('FactorGoogleScreen.TitleHeader')} />
      <ScrollContainer>
        <View style={Layout.fill}>
          <View style={styles.container}>
            <SemiBoldText style={styles.title}>
              {i18next.t('FactorGoogleScreen.Title')}
            </SemiBoldText>
            <RegularText style={[styles.textWarning, styles.fontCommon]}>
              {i18next.t('FactorGoogleScreen.Welcome')}
            </RegularText>
            <RegularText style={[styles.message, styles.fontMessage]}>
              {i18next.t('FactorGoogleScreen.Introduction')}
            </RegularText>
            <RegularText style={styles.fontCommon}>
              {i18next.t('FactorGoogleScreen.ScanQR')}
            </RegularText>
            <View style={[styles.wrapImage, Layout.boxShadow]}>
              {qrData.url_qrcode !== '' && (
                <Image
                  style={styles.googleQR}
                  source={{ uri: qrData.url_qrcode }}
                />
              )}
            </View>
            <RegularText style={styles.fontCommon}>
              {i18next.t('FactorGoogleScreen.CannotScan')}
            </RegularText>
          </View>
          <View style={styles.wrapCode}>
            <View style={[styles.groupCode, Layout.rowBetween]}>
              <SemiBoldText style={Layout.fill}>
                {qrData.google_authenticatior_code}
              </SemiBoldText>
              <TouchableOpacity
                onPress={() =>
                  copyToClipboard(qrData.google_authenticatior_code)
                }>
                <MediumText style={[styles.fontCommon, styles.copy]}>
                  {i18next.t('FactorGoogleScreen.Copy')}
                </MediumText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.boxInput, Layout.boxShadow]}>
            <SemiBoldText style={styles.titleInput}>
              {i18next.t('FactorGoogleActiveScreen.GoogleCode')}
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
              {i18next.t('FactorGoogleActiveScreen.NoteGoogleCode')}
            </RegularText>
          </View>
        </View>
        <View style={styles.button}>
          <GradientButton
            label={i18next.t('FactorGoogleScreen.Link')}
            onPress={handleSubmit(onVerifyGoogleAuth)}
          />
        </View>
      </ScrollContainer>
    </View>
  );
};

export default FactorGoogleView;

const styles = StyleSheet.create({
  container: {
    padding: kSpacing.kSpacing16,
  },
  title: {
    marginTop: kScaledSize(25),
    marginBottom: kSpacing.kSpacing10,
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
    marginBottom: kScaledSize(30),
  },
  wrapImage: {
    width: kScaledSize(200),
    height: kScaledSize(200),
    marginTop: kSpacing.kSpacing15,
    marginBottom: kScaledSize(30),
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  googleQR: {
    width: kScaledSize(200),
    height: kScaledSize(200),
    resizeMode: 'contain',
  },
  wrapCode: {
    paddingVertical: kSpacing.kSpacing10,
    marginTop: kSpacing.kSpacing10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.grey7,
  },
  groupCode: {
    paddingHorizontal: kSpacing.kSpacing16,
  },
  copy: {
    color: Colors.purple,
    marginLeft: kSpacing.kSpacing5,
  },
  button: {
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
    fontSize: kTextSizes.xmini,
    color: Colors.note,
  },
});
