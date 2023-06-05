import i18next from 'i18next';
import React from 'react';
import { Control } from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GradientButton } from '../../components/buttons';
import { Container } from '../../components/container';
import { Header } from '../../components/headers';
import { CommonTextInput } from '../../components/inputs';
import { MediumText, RegularText, SemiBoldText } from '../../components/texts';
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';

interface Props {
  control: Control;
  errors: any;
  checkError: any;
}

const FactorGoogleActiveView = ({ control, errors, checkError }: Props) => {
  return (
    <Container>
      <Header name={i18next.t('FactorGoogleActiveScreen.TitleHeader')} />
      <KeyboardAvoidingView style={Layout.fill} behavior="padding">
        <ScrollView>
          <View style={styles.container}>
            <SemiBoldText style={styles.title}>
              {i18next.t('FactorGoogleActiveScreen.Title')}
            </SemiBoldText>
          </View>

          <View style={[styles.boxInput, Layout.boxShadow]}>
            <SemiBoldText style={styles.titleInput}>
              {i18next.t('FactorGoogleActiveScreen.PhoneCode')}
            </SemiBoldText>
            <View style={Layout.rowBetween}>
              <CommonTextInput
                controller={{
                  name: 'sms',
                  control: control,
                  rules: {
                    required: {
                      value: true,
                      message: i18next.t('Validator.Require'),
                    },
                  },
                }}
                style={styles.input}
                errorText={errors?.sms?.message}
                placeholder={i18next.t('Input.EnterCode')}
                inputProps={{
                  autoCapitalize: 'none',
                }}
              />
              <TouchableOpacity>
                <MediumText style={[styles.fontCommon, styles.copy]}>
                  {i18next.t('FactorGoogleScreen.GetCode')}
                </MediumText>
              </TouchableOpacity>
            </View>
            <RegularText style={styles.textNote}>
              {i18next.t('FactorGoogleActiveScreen.NotePhoneCode')} 092789771
            </RegularText>
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
                },
              }}
              errorText={errors?.google?.message}
              placeholder={i18next.t('Input.EnterCode')}
              inputProps={{
                autoCapitalize: 'none',
              }}
            />
            <RegularText style={styles.textNote}>
              {i18next.t('FactorGoogleActiveScreen.NoteGoogleCode')}
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
            onPress={() => {}}
          />
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default FactorGoogleActiveView;

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
  boxInput: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.grey10,
    paddingHorizontal: kSpacing.kSpacing16,
    paddingVertical: kSpacing.kSpacing20,
    marginBottom: kScaledSize(30),
  },
  titleInput: {
    marginBottom: kSpacing.kSpacing15,
  },
  textNote: {
    fontSize: kTextSizes.xmini,
    color: '#84878E',
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
