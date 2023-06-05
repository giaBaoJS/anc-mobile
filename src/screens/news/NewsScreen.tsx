import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import { newsGetType, onReset } from '../../store/slices/NewsSlice';
import NewsView from './NewsView';

const NewsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { newsListType, isLoading } = useAppSelector(state => state.news);
  const [searchText, setSearchText] = useState<string>('');
  const onGetNewsType = (): void => {
    dispatch(newsGetType());
  };
  useEffect(() => {
    onGetNewsType();
  }, []);

  return (
    <NewsView
      newsListType={newsListType}
      isLoading={isLoading}
      searchText={searchText}
      setSearchText={setSearchText}
    />
  );
};

export default NewsScreen;
