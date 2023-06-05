import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import NewsScreen from '../../screens/news';
import NewsDetailScreen from '../../screens/newsDetail';
import type { NewsInfoField } from '../../models/News';
import NewsListScreen from '../../screens/newsList';

export type NewsStackParamList = {
  NewsScreen: undefined;
  NewsDetailScreen: { item: NewsInfoField; backToTopStack?: string };
  NewsListScreen: undefined;
};

export type NewsStackNavigationProp =
  NativeStackNavigationProp<NewsStackParamList>;

export type NewsStackRouteProps<RouteName extends keyof NewsStackParamList> =
  RouteProp<NewsStackParamList, RouteName>;

const Stack = createNativeStackNavigator<NewsStackParamList>();

const forFade = ({ current }: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const NewsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
      <Stack.Screen name="NewsListScreen" component={NewsListScreen} />
      <Stack.Screen name="NewsDetailScreen" component={NewsDetailScreen} />
    </Stack.Navigator>
  );
};

export default NewsStack;
