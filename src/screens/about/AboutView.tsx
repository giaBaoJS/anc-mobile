import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';
// Render HTML
import RenderHtml from 'react-native-render-html';
// Container
import { Header } from '../../components/headers';
import { CommonImage } from '../../components/image';
import { RegularText, SemiBoldText } from '../../components/texts';
import { NewsInfoField } from '../../models/News';
// Layout
import Layout from '../../theme/Layout';
// Constants
import Colors from '../../theme/Colors';
import {
  FONT_FAMILY_ITALIC,
  kScaledSize,
  kSpacing,
  kTextSizes,
  kWidth,
} from '../../utils/Constants';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { ToTopButton } from '../../components/buttons';
import i18next from 'i18next';

interface Props {
  item: any;
}

const AboutView = ({ item }: Props) => {
  const aref = useAnimatedRef<any>();
  const scroll = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scroll.value = event.contentOffset.y;
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scroll.value, [100, 200], [0, 1], Extrapolate.CLAMP),
    };
  });

  const onToTop = useCallback((): void => {
    aref.current.scrollTo({ x: 0, y: 0, animated: true });
  }, []);

  return (
    <View style={[Layout.whiteBg, Layout.fill]}>
      <Header name={i18next.t('AboutANCScreen.ANCIntro')} />
      <Animated.ScrollView
        ref={aref}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: kSpacing.kSpacing10,
        }}>
        {/* <CommonImage
          style={styles.thumbnail}
          source={item?.thumbnail}
          resize="cover"
        /> */}
        <View>
          {/* <SemiBoldText style={styles.title}>{item.title}</SemiBoldText>
          <View style={[Layout.rowHCenter]}>
            <View style={styles.dot} />
            <RegularText style={styles.date}>
              {dayjs(item.created).format('HH:MM | DD/MM/YYYY ')}
            </RegularText>
          </View>
          <View style={styles.intro}>
            <RegularText style={styles.introText}>{item.intro}</RegularText>
          </View> */}
          <RenderHtml
            contentWidth={kWidth}
            source={{ html: item.content }}
            baseStyle={{
              fontSize: kTextSizes.body,
            }}
          />
        </View>
      </Animated.ScrollView>

      <Animated.View style={[styles.toTopButton, animatedStyles]}>
        <ToTopButton onPress={onToTop} />
      </Animated.View>
    </View>
  );
};

export default AboutView;

const styles = StyleSheet.create({
  thumbnail: {
    height: kScaledSize(220),
    width: '100%',
    borderRadius: 5,
    marginTop: kSpacing.kSpacing10,
  },
  line: {
    height: 0.5,
    width: kWidth / 1.2,
    backgroundColor: Colors.grey7,
    marginBottom: kSpacing.kSpacing10,
  },
  title: {
    fontSize: kTextSizes.medium,
    marginTop: kSpacing.kSpacing15,
    marginBottom: kSpacing.kSpacing10,
  },
  content: {},
  intro: {
    marginTop: 10,
    backgroundColor: Colors.green20,
    padding: kSpacing.kSpacing10,
    borderRadius: 10,
  },
  introText: {
    fontFamily: FONT_FAMILY_ITALIC,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.purple2,
    marginRight: kSpacing.kSpacing5,
  },
  date: {
    fontSize: kTextSizes.mini,
  },
  relatedNews: {
    marginBottom: kSpacing.kSpacing15,
    paddingLeft: kSpacing.kSpacing10,
  },
  relatedText: {
    marginBottom: kSpacing.kSpacing10,
  },
  relatedItem: {
    paddingRight: kSpacing.kSpacing6,
    width: kScaledSize(kWidth / 2.5),
  },
  relatedImage: {
    width: '100%',
    height: kScaledSize(80),
    borderRadius: 5,
  },
  realtedTitle: {
    marginVertical: kSpacing.kSpacing5,
    fontSize: kTextSizes.small,
  },
  toTopButton: {
    position: 'absolute',
    zIndex: 999,
    bottom: 30,
    right: 20,
  },
});
