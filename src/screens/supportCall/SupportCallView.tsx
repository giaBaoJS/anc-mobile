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

const SupportCallView = ({ onNavigate }: Props) => {
  return (
    <Container>
      <View>
        <Text>SupportCallView</Text>
      </View>
    </Container>
  );
};

export default SupportCallView;

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
