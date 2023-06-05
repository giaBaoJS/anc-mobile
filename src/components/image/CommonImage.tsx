import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import FastImage from 'react-native-fast-image';
import Colors from '../../theme/Colors';

interface Props {
  wrapperStyle?: ViewStyle;
  style?: any;
  source: string;
  resize?: string;
}

const CommonImage = ({ wrapperStyle, style, source, resize }: Props) => {
  return (
    <View
      style={{
        padding: 0,
        backgroundColor: Colors.grey10,
        borderRadius: 5,
        ...wrapperStyle,
      }}>
      <FastImage
        style={[styles.image, style]}
        source={{
          uri: source,
        }}
        fallback
        resizeMode={
          resize === 'stretch'
            ? FastImage.resizeMode.stretch
            : resize === 'cover'
            ? FastImage.resizeMode.cover
            : FastImage.resizeMode.contain
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  holder: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1000,
  },
});

export default CommonImage;
