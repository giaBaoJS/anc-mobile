import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import MediumText from '../texts/MediumText';
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
import { kScaledSize, kSpacing } from '../../utils/Constants';

type Props = {
  style?: ViewStyle;
  isEnabled: boolean;
  isDisabled?: boolean;
  onToggled: () => void | Promise<void>;
};

const SwitchCustom = ({ style, isEnabled, onToggled, isDisabled }: Props) => {
  return (
    <ToggleSwitch
      isOn={isEnabled}
      onColor={Colors.primary}
      offColor={Colors.grey6}
      size="small"
      onToggle={onToggled}
      disabled={isDisabled}
    />
  );
};

export default SwitchCustom;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: kSpacing.kSpacing7,
    paddingHorizontal: kSpacing.kSpacing20,
    borderRadius: 5,
  },
  thumbs: {
    width: 10,
    height: 10,
  },
  track: {
    width: 30,
    height: 20,
  },
});
