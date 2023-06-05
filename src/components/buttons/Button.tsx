import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import MediumText from '../texts/MediumText';
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
import { kScaledSize, kSpacing } from '../../utils/Constants';

type Props = {
  title: string;
  style?: ViewStyle;
  onPress: () => void | Promise<void>;
};

const Button = ({ title, style, onPress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[Layout.center, styles.button, style]}>
      <MediumText numberOfLines={1} style={styles.title}>
        {title}
      </MediumText>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: kSpacing.kSpacing7,
    paddingHorizontal: kSpacing.kSpacing20,
    borderRadius: 5,
  },
  title: {
    color: Colors.white,
  },
});
