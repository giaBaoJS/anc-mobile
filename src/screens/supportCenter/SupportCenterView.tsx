import i18next from 'i18next';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '../../components/container';
import { Header } from '../../components/headers';
import { RegularText, SemiBoldText } from '../../components/texts';
import Colors from '../../theme/Colors';
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Layout from '../../theme/Layout';

interface Props {
  onNavigate: (endpoint: string) => void;
}

const SupportCenterView = ({ onNavigate }: Props) => {
  return (
    <Container>
      <Header name={i18next.t('SupportCenterScreen.Title')} />
      <View style={styles.container}>
        <SemiBoldText style={styles.title}>
          {i18next.t('SupportCenterScreen.Title')}
        </SemiBoldText>
        <TouchableOpacity
          style={[styles.groupButtons, Layout.rowBetween]}
          onPress={() => onNavigate('SupportFaqScreen')}>
          <View style={[Layout.rowHCenter]}>
            <MaterialIcons
              name="help"
              size={kScaledSize(19)}
              color={Colors.primary}
              style={styles.icons}
            />
            <RegularText>
              {i18next.t('SupportCenterScreen.SupportCenter')}
            </RegularText>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={kScaledSize(24)}
            color={Colors.grey5}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.groupButtons, Layout.rowBetween]}
          onPress={() => onNavigate('SupportFeedBackScreen')}>
          <View style={[Layout.rowHCenter]}>
            <Ionicons
              name="settings-sharp"
              size={kScaledSize(19)}
              color={Colors.primary}
              style={styles.icons}
            />
            <RegularText>
              {i18next.t('SupportCenterScreen.FeedBack')}
            </RegularText>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={kScaledSize(24)}
            color={Colors.grey5}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.groupButtons, Layout.rowBetween]}
          onPress={() => onNavigate('SupportCallScreen')}>
          <View style={[Layout.rowHCenter]}>
            <MaterialIcons
              name="support-agent"
              size={kScaledSize(19)}
              color={Colors.primary}
              style={styles.icons}
            />
            <RegularText>{i18next.t('SupportCenterScreen.Call')}</RegularText>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={kScaledSize(24)}
            color={Colors.grey5}
          />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default SupportCenterView;

const styles = StyleSheet.create({
  container: {
    padding: kSpacing.kSpacing16,
  },
  title: {
    marginVertical: kSpacing.kSpacing20,
    fontSize: kTextSizes.xlarge,
  },
  groupButtons: {
    marginTop: kSpacing.kSpacing10,
    marginBottom: kScaledSize(15),
  },
  icons: {
    marginRight: kSpacing.kSpacing10,
  },
});
