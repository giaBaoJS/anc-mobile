import React from 'react';
import { View } from 'react-native';
import SupportCenterView from './SupportCenterView';

const SupportCenterScreen: React.FC = ({ navigation }: any) => {
  const onNavigate = (endpoint: string) => {
    navigation.navigate(endpoint);
  };
  return <SupportCenterView onNavigate={onNavigate} />;
};

export default SupportCenterScreen;
