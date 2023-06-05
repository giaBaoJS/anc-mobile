import React, { useCallback, useRef } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
// Components
import { NewsInfoField } from '../../models/News';
import { AppLoader, FooterLoader } from '../../components/loaders';
import { RegularText, SemiBoldText } from '../../components/texts';
import { Reload } from '../../components/reload';
// Layout
import Layout from '../../theme/Layout';
// Constants
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
import Colors from '../../theme/Colors';
import { formatDateTime } from '../../utils/Common';

// Translate
import i18next from 'i18next';
import { CommonImage } from '../../components/image';

interface Props {
  newsList: NewsInfoField[];
  onEndReachedCalledDuringMomentum: boolean;
  setOnEndReachedCalledDuringMomentum: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  onLoadMore: () => void;
  page: number;
  isLoading: boolean;
  onNavigateToDetail: (item: NewsInfoField) => void;
  error: boolean;
  onGetNews: () => Promise<void>;
  searchText: string;
  isRefreshing: boolean;
  startRefreshing: any;
}

interface NewsItemProps {
  item: NewsInfoField;
  index: number;
  onNavigateToDetail: (item: NewsInfoField) => void;
}

const NewsListView = ({
  newsList,
  onEndReachedCalledDuringMomentum,
  setOnEndReachedCalledDuringMomentum,
  onLoadMore,
  page,
  isLoading,
  onNavigateToDetail,
  error,
  onGetNews,
  searchText,
  isRefreshing,
  startRefreshing,
}: Props) => {
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  const NewsItem = useCallback(({ item, index }: NewsItemProps) => {
    return (
      <TouchableOpacity
        onPress={() => onNavigateToDetail(item)}
        activeOpacity={0.8}
        style={[styles.itemContainer, { marginTop: index === 0 ? 10 : 0 }]}>
        <SemiBoldText style={styles.title}>{item.title}</SemiBoldText>
        <CommonImage
          style={styles.thumbnail}
          source={item.thumbnail}
          resize="cover"
        />
        <View style={[styles.content, Layout.fill, Layout.colBetween]}>
          <RegularText style={styles.intro} numberOfLines={3}>
            {item.intro}
          </RegularText>
          <RegularText style={styles.datetime}>
            {formatDateTime(item.created)}
          </RegularText>
        </View>
      </TouchableOpacity>
    );
  }, []);
  return (
    <View>
      {isLoading && (page === 1 || searchText !== '') && <AppLoader />}
      {error && page === 1 && <Reload onPress={onGetNews} />}
      {!isLoading && newsList.length === 0 && searchText !== '' && (
        <View style={[Layout.fullDevice, Layout.center]}>
          <RegularText style={styles.emptyList}>
            {i18next.t('NewsScreen.EmptyNews')}
          </RegularText>
        </View>
      )}
      {!error && (
        <Tabs.FlatList
          ref={scrollRef}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={startRefreshing}
              tintColor={'transparent'}
            />
          }
          data={newsList}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <NewsItem
              item={item}
              index={index}
              onNavigateToDetail={onNavigateToDetail}
            />
          )}
          initialNumToRender={4}
          ListFooterComponent={<FooterLoader loading={isLoading} page={page} />}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum) {
              onLoadMore();
            }
          }}
          onEndReachedThreshold={0.01}
        />
      )}
    </View>
  );
};

export default NewsListView;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: kSpacing.kSpacing16,
  },
  itemContainer: {
    paddingVertical: kSpacing.kSpacing10,
    borderBottomWidth: 1,
    borderColor: Colors.grey7,
  },
  title: {
    lineHeight: 20,
    marginBottom: kSpacing.kSpacing10,
  },
  thumbnail: {
    width: '100%',
    height: kScaledSize(200),
    borderRadius: 5,
  },
  content: {
    marginTop: kSpacing.kSpacing10,
  },
  intro: {
    fontSize: kTextSizes.small,
  },
  datetime: {
    fontSize: kTextSizes.mini,
    color: Colors.grey6,
    marginTop: kSpacing.kSpacing10,
  },
  emptyList: {
    color: Colors.primary,
  },
});
