import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import { HomeSettingField, PrefsField } from '../../models/HomeSetting';
import {
  changeSettingList,
  PostDataCommon,
  updateConfigData,
} from '../../store/slices/HomeSettingSlice';
import HomeSettingView from './HomeSettingView';

const HomeSettingScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { settingListDefault, settingList, customConfig, listOptionSorted } =
    useAppSelector(state => state.homeSetting);
  const [data, setData] = useState<HomeSettingField[]>(settingList);
  const onToggleShow = (type: string, status: boolean): void => {};

  const onChangePosition = (updatedList: HomeSettingField[]): void => {
    dispatch(changeSettingList(updatedList));
  };

  const onUpdateSetting = async (dataPost: PostDataCommon): Promise<void> => {
    dispatch(updateConfigData(dataPost));
  };

  return (
    <HomeSettingView
      data={data}
      settingListDefault={settingListDefault}
      setData={setData}
      onChangePosition={onChangePosition}
      onToggleShow={onToggleShow}
      customConfig={customConfig}
      listOptionSorted={listOptionSorted}
      onUpdateSetting={onUpdateSetting}
    />
  );
};

export default HomeSettingScreen;
