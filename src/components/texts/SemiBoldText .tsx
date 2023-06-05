import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { FONT_FAMILY_SEMIBOLD, kTextSizes } from '../../utils/Constants';

const SemiBoldText = (props: TextProps) => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: kTextSizes.body,
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontWeight: 'bold',
  },
});

export default SemiBoldText;
