import React from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from '../../theme/Layout';
import { IconButton } from '../buttons';
import i18next from 'i18next';
import Colors from '../../theme/Colors';
import { kSpacing } from '../../utils/Constants';
import { RegularText } from '../texts';

interface Props {
  onPress: () => void;
}

const Reload = ({ onPress }: Props) => {
  return (
    <View style={[Layout.center, Layout.fullDevice]}>
      <RegularText style={styles.text}>{i18next.t('Error.Reload')}</RegularText>
      <IconButton title={i18next.t('Button.Reload')} onPress={onPress} />
    </View>
  );
};

export default Reload;

const styles = StyleSheet.create({
  text: {
    color: Colors.primary,
    marginVertical: kSpacing.kSpacing10,
  },
});
