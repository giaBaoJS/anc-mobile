import React from 'react';
import { Image } from 'react-native';

interface Props {
  image: any;
  width: number;
}

const ResizeImage = ({ image, width }: Props) => {
  return (
    <Image
      source={{ uri: image.path }}
      resizeMode="cover"
      style={{
        width,
        height: image.height * (width / image.width),
        borderRadius: 5,
      }}
    />
  );
};

export default ResizeImage;
