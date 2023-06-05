import React, { useCallback } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
// Render HTML
import RenderHtml from 'react-native-render-html';
// Translate
import i18next from 'i18next';
// Container
import { Header } from '../../components/headers';
import { CommonImage } from '../../components/image';
import { RegularText, SemiBoldText } from '../../components/texts';
import { NewsDetailField, NewsInfoField } from '../../models/News';
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
import { AppLoader } from '../../components/loaders';

interface Props {
  newsIitem: NewsInfoField;
  isLoading: boolean;
  detailRelatedNews: null | NewsDetailField;
  onNavigateToDetail: (item: NewsInfoField) => void;
  error: boolean;
  backToTopStack: string | undefined;
}

interface RelatedItemProps {
  item: NewsInfoField;
}

const NewsDetailView = ({
  newsIitem,
  isLoading,
  detailRelatedNews,
  error,
  onNavigateToDetail,
  backToTopStack,
}: Props) => {
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

  // Item
  const RelatedItem = useCallback(({ item }: RelatedItemProps) => {
    return (
      <TouchableOpacity
        onPress={() => onNavigateToDetail(item)}
        style={styles.relatedItem}>
        <CommonImage
          source={item.thumbnail}
          style={styles.relatedImage}
          resize="cover"
        />
        <RegularText style={styles.realtedTitle} numberOfLines={2}>
          {item.title}
        </RegularText>
        <RegularText style={[styles.date, { color: Colors.grey6 }]}>
          {dayjs(newsIitem.created).format('HH:MM | DD/MM/YYYY ')}
        </RegularText>
      </TouchableOpacity>
    );
  }, []);
  return (
    <View style={[Layout.whiteBg, Layout.fill]}>
      {isLoading && <AppLoader />}
      <Header name={newsIitem.title} backToTopStack={backToTopStack} />
      {!isLoading && !error && detailRelatedNews && (
        <Animated.ScrollView
          ref={aref}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: kSpacing.kSpacing10,
          }}>
          <CommonImage
            style={styles.thumbnail}
            source={newsIitem.thumbnail}
            resize="cover"
          />
          <View>
            <SemiBoldText style={styles.title}>{newsIitem.title}</SemiBoldText>
            <View style={[Layout.rowHCenter]}>
              <View style={styles.dot} />
              <RegularText style={styles.date}>
                {dayjs(newsIitem.created).format('HH:MM | DD/MM/YYYY ')}
              </RegularText>
            </View>
            <View style={styles.intro}>
              <RegularText style={styles.introText}>
                {newsIitem.intro}
              </RegularText>
            </View>
            <RenderHtml
              contentWidth={kWidth}
              source={{ html: newsIitem.content }}
              baseStyle={{
                fontSize: kTextSizes.body,
              }}
            />
          </View>
          <View style={[styles.line, Layout.alignSelfCenter]} />
          <View style={styles.relatedNews}>
            {error === false &&
              detailRelatedNews &&
              detailRelatedNews.related_news.length > 0 && (
                <>
                  <SemiBoldText style={styles.relatedText}>
                    {i18next.t('NewsDetailScreen.RelatedNews')}
                  </SemiBoldText>
                  <FlatList
                    data={detailRelatedNews?.related_news}
                    keyExtractor={item => item.id}
                    nestedScrollEnabled
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <RelatedItem item={item} />}
                  />
                </>
              )}
          </View>
        </Animated.ScrollView>
      )}
      <Animated.View style={[styles.toTopButton, animatedStyles]}>
        <ToTopButton onPress={onToTop} />
      </Animated.View>
    </View>
  );
};

export default NewsDetailView;

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
