import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
// Carousel
import Carousel from 'react-native-reanimated-carousel';
import { CarouselPagination, CarouselItem } from '../../components/carousel';
// Components
import { Container } from '../../components/container';
import { HomeHeader } from '../../components/headers';
// Constants
import { kScaledSize, kSpacing, kWidth } from '../../utils/Constants';
import Layout from '../../theme/Layout';
// Type
import { BannerItemField } from '../../models/Banner';
import {
  NewsWidgetField,
  ProjectWidgetField,
  ResourceWidgetField,
  UtilityField,
} from '../../models/Widget';
import {
  NewsWidget,
  UtilityWidget,
  ProjectWidget,
} from '../../components/widgets';
// Translate
import i18next from 'i18next';
import AboutWidget from '../../components/widgets/AboutWidget';
import ResourceWidget from '../../components/widgets/ResourceWidget';
import { HomeSettingField } from '../../models/HomeSetting';
import { AppLoader } from '../../components/loaders';
import ButtonError from '../../components/buttons/ButtonError';

interface Props {
  isLogin: boolean;
  isLoading: boolean;
  error: boolean;
  settingList: HomeSettingField[];
  settingListDefault: HomeSettingField[];
  banners: BannerItemField[];
  utilityWidget: UtilityField[];
  projectWidget: ProjectWidgetField;
  newsWidget: NewsWidgetField;
  resourceWidget: ResourceWidgetField;
  onGetData: () => Promise<void>;
}

const HomeView: React.FC<Props> = ({
  isLogin,
  isLoading,
  error,
  settingList,
  banners,
  utilityWidget,
  projectWidget,
  newsWidget,
  resourceWidget,
  settingListDefault,
  onGetData,
}) => {
  const progressValue = useSharedValue<number>(0);
  return (
    <Container>
      <HomeHeader />
      {isLoading ? (
        <AppLoader />
      ) : error ? (
        <ButtonError onPress={onGetData} />
      ) : (
        <FlatList
          data={isLogin ? settingList : settingListDefault}
          keyExtractor={item => item.key}
          ListHeaderComponent={
            <View style={styles.carousel}>
              <Carousel
                onProgressChange={(_: any, absoluteProgress: any) => {
                  progressValue.value = absoluteProgress;
                }}
                mode="parallax"
                modeConfig={{
                  parallaxScrollingScale: 0.9,
                  parallaxScrollingOffset: 50,
                }}
                width={kWidth}
                height={kScaledSize(150)}
                data={JSON.parse(JSON.stringify(banners))}
                renderItem={({ item }) => <CarouselItem item={item} />}
              />
              {!!progressValue && (
                <View style={[styles.pagination, Layout.rowCenter]}>
                  {banners.map((_, index) => {
                    return (
                      <CarouselPagination
                        animValue={progressValue}
                        index={index}
                        key={index}
                        length={banners.length}
                      />
                    );
                  })}
                </View>
              )}
            </View>
          }
          renderItem={({ item }): any => {
            const { key } = item;
            if (!item.is_show) {
              return null;
            }
            switch (key) {
              case 'HOME_DASHBOARD_ANC_UTILITIES_WIDGET':
                return (
                  <UtilityWidget
                    title={i18next.t('Widget.Utility')}
                    lists={utilityWidget}
                  />
                );
              case 'HOME_DASHBOARD_ANC_PUBLIC_PROJECT_WIDGET':
                return (
                  projectWidget.isShow && (
                    <ProjectWidget
                      title={i18next.t('Widget.PublicProject')}
                      lists={projectWidget.projects}
                      row={projectWidget.row}
                    />
                  )
                );
              case '':
                return (
                  isLogin && (
                    <ResourceWidget
                      title={i18next.t('Widget.Resource')}
                      lists={resourceWidget.resources}
                    />
                  )
                );
              case 'HOME_DASHBOARD_ANC_NEWS_WIDGET':
                return (
                  newsWidget.isShow && (
                    <NewsWidget
                      title={i18next.t('Widget.News')}
                      lists={newsWidget.news}
                    />
                  )
                );
              case 'HOME_DASHBOARD_ANC_ABOUT_ANC_WIDGET':
                return <AboutWidget title={i18next.t('Widget.About')} />;
              default:
                null;
            }
          }}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  carousel: {
    alignItems: 'center',
    marginTop: kSpacing.kSpacing15,
  },
  pagination: {},
});

export default HomeView;
