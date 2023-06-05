import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Platform } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import { NewsInfoField } from '../../models/News';
import { NewsStackNavigationProp } from '../../navigators/stacks/NewsStack';
import { newsGetList } from '../../store/slices/NewsSlice';
import NewsListView from './NewsListView';
import { useRefresh } from '../../hooks/RefreshHook';

interface Props {
  categoryId: number;
  type: string;
  searchText: string;
}

const NewsListScreen: React.FC<Props> = ({ categoryId, type, searchText }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NewsStackNavigationProp>();
  const { allNews, isLoading } = useAppSelector(state => state.news);
  const [isRefreshing, startRefreshing] = useRefresh();
  const [isReset, setIsReset] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState<boolean>(true);
  const onNavigateToDetail = (item: NewsInfoField): void => {
    navigation.push('NewsDetailScreen', { item });
  };

  // const focusedTab = useFocusedTab();

  const onLoadMore = useCallback((): void => {
    if (allNews[type].totalPage <= page) {
      return;
    }
    setPage(prev => prev + 1);
  }, [page, allNews]);

  const onGetNews = async (customPage?: number): Promise<void> => {
    try {
      setError(false);
      await dispatch(
        newsGetList({
          page: customPage ? customPage : page,
          items_in_page: 4,
          search: searchText,
          type,
          ...(categoryId && { category_id: categoryId }),
        }),
      ).unwrap();
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    if (isRefreshing) {
      onGetNews(1);
      setPage(1);
    }
  }, [isRefreshing]);

  useEffect(() => {
    if (searchText === '' && !isReset) {
      return;
    }
    setIsReset(true);
    onGetNews(1);
  }, [searchText]);

  useEffect(() => {
    if (!isRefreshing) {
      if (page === 1) {
        setTimeout(() => {
          onGetNews();
          setOnEndReachedCalledDuringMomentum(false);
        }, 200);
      } else {
        onGetNews();
      }
    }
  }, [page]);

  return (
    <NewsListView
      newsList={allNews[type] ? allNews[type].data : []}
      onEndReachedCalledDuringMomentum={onEndReachedCalledDuringMomentum}
      setOnEndReachedCalledDuringMomentum={setOnEndReachedCalledDuringMomentum}
      onLoadMore={onLoadMore}
      page={page}
      isLoading={isLoading}
      onNavigateToDetail={onNavigateToDetail}
      error={error}
      onGetNews={onGetNews}
      searchText={searchText}
      isRefreshing={isRefreshing}
      startRefreshing={startRefreshing}
    />
  );
};

export default NewsListScreen;
