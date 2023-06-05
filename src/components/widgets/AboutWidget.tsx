import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
// Components
import { BoldText, RegularText, SemiBoldText } from '../texts';
// Theme
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
// Constant
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/core';
import { hasNotch } from '../../utils/Common';
import { useAppSelector } from '../../hooks/RTKHooks';
import dayjs from 'dayjs';
// Type

type Props = {
  title: string;
  style?: ViewStyle;
};

const AboutWidget: React.FC<Props> = ({ title, style }) => {
  const navigation = useNavigation<any>();
  const { aboutWidget } = useAppSelector(state => state.home);
  const onPressItem = () => {
    navigation.navigate('AboutStack', {
      screen: 'AboutScreen',
    });
  };
  return (
    <View style={[styles.container, style]}>
      <SemiBoldText style={styles.title}>{title}</SemiBoldText>
      <TouchableOpacity
        onPress={onPressItem}
        activeOpacity={0.9}
        style={[styles.widgetList, Layout.shadow]}>
        <View style={styles.item}>
          <FastImage
            style={styles.image}
            // source={require('../../assets/images/background-about.png')}
            source={{ uri: aboutWidget?.thumbnail }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.info}>
            <FastImage
              style={styles.logo}
              source={require('../../assets/images/about.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
            <RegularText style={styles.text}>{dayjs().year()}</RegularText>
            <BoldText style={[styles.text, styles.intro]}>
              {/* {i18next.t('Widget.IntroANC')} */}
              {aboutWidget?.title}
            </BoldText>
            <RegularText
              numberOfLines={5}
              style={[styles.text, styles.content]}>
              {/* {i18next.t('Widget.IntroContent')} */}
              {aboutWidget?.intro}
            </RegularText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AboutWidget;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: kSpacing.kSpacing15,
    marginBottom: kSpacing.kSpacing20,
  },
  widgetList: {
    borderRadius: 5,
    backgroundColor: Colors.white,
    paddingTop: kSpacing.kSpacing12,
    paddingBottom: kSpacing.kSpacing7,
  },
  title: {
    fontSize: kTextSizes.medium,
    paddingHorizontal: kSpacing.kSpacing15,
    marginBottom: kSpacing.kSpacing10,
  },
  item: {
    marginHorizontal: kSpacing.kSpacing15,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: kScaledSize(100),
  },
  info: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingHorizontal: kSpacing.kSpacing17,
    paddingTop: kSpacing.kSpacing19,
    paddingBottom: kSpacing.kSpacing12,
  },
  logo: {
    width: kScaledSize(74),
    height: kScaledSize(74),
    position: 'absolute',
    right: kSpacing.kSpacing17,
    top: kScaledSize(-32),
  },
  text: {
    color: Colors.white,
    fontSize: kTextSizes.medium,
  },
  intro: {
    fontSize: kTextSizes.large,
    marginVertical: hasNotch() ? kSpacing.kSpacing10 : kSpacing.kSpacing5,
  },
  content: {
    fontSize: kTextSizes.mini,
    textAlign: 'justify',
  },
});
