import React from 'react';
import { View, ViewStyle } from 'react-native';
import Colors from '../../theme/Colors';

interface LineProps {
  style?: ViewStyle;
}
const Line = ({ style }: LineProps) => {
  return (
    <View
      style={[
        {
          borderBottomWidth: 1,
        },
        style,
      ]}
    />
  );
};

export default Line;
