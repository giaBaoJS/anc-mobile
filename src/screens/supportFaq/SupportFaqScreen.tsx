import React from 'react';
import { View } from 'react-native';
import SupportFaqView from './SupportFaqView';

const SupportFaqScreen: React.FC = ({ navigation }: any) => {
  const onNavigate = (endpoint: string) => {
    navigation.navigate(endpoint);
  };
  return <SupportFaqView onNavigate={onNavigate} />;
};

export default SupportFaqScreen;
