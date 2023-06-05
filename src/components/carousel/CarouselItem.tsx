import { StyleSheet, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

type Props = {
  item: any;
};

const CarouselItem: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={item.uri}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
