import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import {
  HambugerStackNavigationProp,
  HambugerStackParamList,
} from '../../navigators/stacks/HambugerStack';
import { onFilter } from '../../store/slices/HambugerSlice';

import HambugerView from './HambugerView';

interface Props {
  navigation: HambugerStackNavigationProp;
}

const HambugerScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const { personalFeatures, systemANCFeatures } = useAppSelector(
    state => state.hambuger,
  );

  useEffect(() => {
    dispatch(onFilter(searchText.toLowerCase().trim()));
  }, [searchText]);

  const onNavigate = (link: keyof HambugerStackParamList): void => {
    navigation.navigate(link);
  };

  return (
    <HambugerView
      tabPersonal={personalFeatures}
      tabSysANC={systemANCFeatures}
      searchText={searchText}
      setSearchText={setSearchText}
      onNavigate={onNavigate}
    />
  );
};

export default HambugerScreen;
