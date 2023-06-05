import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import MediumText from '../texts/MediumText';
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
import i18next from 'i18next';
import { RegularText } from '../texts';

type Props = {
  onPress: () => void | Promise<void>;
};

const ButtonError = ({ onPress }: Props) => {
  return (
    <View style={[styles.container, Layout.center]}>
      <RegularText style={styles.reload}>
        {i18next.t('Error.Reload')}
      </RegularText>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[Layout.center, styles.button]}>
        <MediumText numberOfLines={1} style={styles.title}>
          {i18next.t('Button.Reload')}
        </MediumText>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: kSpacing.kSpacing7,
    paddingHorizontal: kSpacing.kSpacing20,
    borderRadius: 5,
  },
  title: {
    color: Colors.white,
    paddingVertical: kSpacing.kSpacing2,
    paddingHorizontal: kSpacing.kSpacing18,
  },
  reload: {
    marginBottom: kSpacing.kSpacing15,
  },
});
