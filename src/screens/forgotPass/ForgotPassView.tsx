import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
//Components
import { Button } from '../../components/buttons';
import { Container, ScrollContainer } from '../../components/container';
import { Header } from '../../components/headers';
import { RegularText, SemiBoldText } from '../../components/texts';
//Translate
import i18next from 'i18next';
//Icons
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//Layouts
import Layout from '../../theme/Layout';
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
import Colors from '../../theme/Colors';

interface Props {
  onNavigate: (byEmail: boolean) => void;
  onOpenSupport: () => void;
}

const ForgotPassView = ({ onNavigate, onOpenSupport }: Props) => {
  return (
    <Container>
      <Header name={i18next.t('ForgotPasswordScreen.Title')} />
      <ScrollContainer contentStyle={styles.container}>
        <SemiBoldText style={styles.title}>
          {i18next.t('ForgotPasswordScreen.FindPassword')}
        </SemiBoldText>
        <TouchableOpacity
          style={[styles.groupButtons, Layout.rowBetween]}
          onPress={() => onNavigate(true)}>
          <View style={[Layout.rowHCenter]}>
            <Entypo
              name="email"
              size={kScaledSize(19)}
              color={Colors.primary}
              style={styles.icons}
            />
            <RegularText>
              {i18next.t('ForgotPasswordScreen.FindPasswordByEmail')}
            </RegularText>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={kScaledSize(24)}
            color={Colors.grey5}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[Layout.rowBetween]}
          onPress={() => onNavigate(false)}>
          <View style={[Layout.rowHCenter]}>
            <Entypo
              name="mobile"
              size={kScaledSize(19)}
              color={Colors.primary}
              style={styles.icons}
            />
            <RegularText>
              {i18next.t('ForgotPasswordScreen.FindPasswordBySms')}
            </RegularText>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={kScaledSize(24)}
            color={Colors.grey5}
          />
        </TouchableOpacity>
        <View style={styles.line} />
        <View style={[Layout.colCenter]}>
          <View style={[styles.circle, Layout.rowCenter]}>
            <MaterialIcons
              name="support-agent"
              size={kScaledSize(30)}
              color={Colors.primary}
            />
          </View>
          <RegularText style={styles.textMethod}>
            {i18next.t('ForgotPasswordScreen.MethodNotAvailable')}
            <RegularText style={styles.textHelp} onPress={onOpenSupport}>
              {i18next.t('ForgotPasswordScreen.Help')}
            </RegularText>
          </RegularText>
        </View>
      </ScrollContainer>
    </Container>
  );
};

export default ForgotPassView;

const styles = StyleSheet.create({
  container: {
    padding: kSpacing.kSpacing16,
  },
  title: {
    marginVertical: kSpacing.kSpacing20,
    fontSize: kTextSizes.xlarge,
  },
  icons: {
    marginRight: kSpacing.kSpacing10,
  },
  groupButtons: {
    marginTop: kSpacing.kSpacing10,
    marginBottom: kScaledSize(20),
  },
  line: {
    borderBottomColor: Colors.grey7,
    borderBottomWidth: 1,
    marginVertical: kScaledSize(40),
  },
  circle: {
    backgroundColor: Colors.white,
    width: kScaledSize(57),
    height: kScaledSize(57),
    borderRadius: 100,
    marginBottom: kSpacing.kSpacing12,
  },
  textMethod: {
    color: Colors.grey6,
    fontSize: kTextSizes.mini,
  },
  textHelp: {
    color: Colors.warning,
    fontSize: kTextSizes.mini,
  },
});
