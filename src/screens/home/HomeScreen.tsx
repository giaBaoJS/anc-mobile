import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import {
  homeGetDefaultUserConfigData,
  homeGetUserConfigData,
} from '../../store/slices/HomeSettingSlice';
import {
  HomeGetAbout,
  homeGetBanner,
  homeGetNews,
  homeGetUtilityWidget,
} from '../../store/slices/HomeSlice';
import { HOME_DASHBOARD_ANC_UTILITIES_WIDGET } from '../../utils/Constants';
import { handleError } from '../../utils/HandleError';
import HomeView from './HomeView';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { banners, utilityWidget, projectWidget, newsWidget, resourceWidget } =
    useAppSelector(state => state.home);
  const { userInfo } = useAppSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { settingList, settingListDefault } = useAppSelector(
    state => state.homeSetting,
  );
  const { isLogin } = useAppSelector(state => state.auth);

  const onGetNewsDefault = useCallback(async (): Promise<void> => {
    try {
      setError(false);
      setIsLoading(true);
      await Promise.all([
        dispatch(
          homeGetDefaultUserConfigData({
            key: 'HOME_DASHBOARD_ANC_PAGE',
            is_recursive: true,
          }),
        ).unwrap(),
        dispatch(homeGetNews({ page: 1, items_in_page: 10 })).unwrap(),
        dispatch(HomeGetAbout()).unwrap(),
        dispatch(
          homeGetUtilityWidget({
            key: 'HOME_DASHBOARD_ANC_PAGE',
            is_recursive: true,
          }),
        ),
      ]);
    } catch (err) {
      setError(true);
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [userInfo]);

  const onGetNewsUser = useCallback(async (): Promise<void> => {
    try {
      setError(false);
      setIsLoading(true);
      await Promise.all([
        dispatch(
          homeGetUserConfigData({
            key: 'HOME_DASHBOARD_ANC_PAGE',
            is_recursive: true,
            serverCode: userInfo?.extra.config,
          }),
        ).unwrap(),
        dispatch(homeGetNews({ page: 1, items_in_page: 10 })).unwrap(),
        dispatch(HomeGetAbout()).unwrap(),
      ]);
    } catch (err) {
      handleError(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [userInfo]);

  const onGetData = async (): Promise<void> => {
    if (userInfo === null) {
      // Default
      onGetNewsDefault();
    } else {
      // After Login
      onGetNewsUser();
    }
  };

  useEffect(() => {
    onGetData();
  }, [userInfo]);

  return (
    <HomeView
      isLogin={isLogin}
      isLoading={isLoading}
      error={error}
      settingList={settingList}
      settingListDefault={settingListDefault}
      banners={banners}
      utilityWidget={utilityWidget}
      projectWidget={projectWidget}
      newsWidget={newsWidget}
      resourceWidget={resourceWidget}
      onGetData={onGetData}
    />
  );
};

export default HomeScreen;
