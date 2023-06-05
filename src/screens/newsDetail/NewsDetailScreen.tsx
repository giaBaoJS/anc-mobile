import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import NewsDetailView from './NewsDetailView';
import {
  NewsStackNavigationProp,
  NewsStackParamList,
  NewsStackRouteProps,
} from '../../navigators/stacks/NewsStack';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import { newsGetRelatedList } from '../../store/slices/NewsSlice';
import { NewsInfoField } from '../../models/News';

interface Props {
  navigation: NewsStackNavigationProp;
  route: NewsStackRouteProps<'NewsDetailScreen'>;
}

const NewsDetailScreen = ({ navigation, route }: Props) => {
  const { item, backToTopStack } = route.params;
  const dispatch = useAppDispatch();
  const { detailRelatedNews } = useAppSelector(state => state.news);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onNavigateToDetail = (relatedItem: NewsInfoField): void => {
    navigation.push('NewsDetailScreen', { item: relatedItem });
  };

  const onGetRelatedNews = async (): Promise<void> => {
    try {
      setError(false);
      setIsLoading(true);
      await dispatch(newsGetRelatedList({ id: item.id })).unwrap();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    onGetRelatedNews();
  }, [item]);

  return (
    <NewsDetailView
      newsIitem={item}
      isLoading={isLoading}
      detailRelatedNews={detailRelatedNews}
      onNavigateToDetail={onNavigateToDetail}
      error={error}
      backToTopStack={backToTopStack}
    />
  );
};

export default NewsDetailScreen;
