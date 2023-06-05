import React from 'react';
import { View } from 'react-native';
import SupportCallView from './SupportCallView';

const SupportCallScreen: React.FC = ({ navigation }: any) => {
  const onNavigate = (endpoint: string) => {
    navigation.navigate(endpoint);
  };
  return <SupportCallView onNavigate={onNavigate} />;
};

export default SupportCallScreen;
