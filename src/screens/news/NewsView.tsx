import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
// Header
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
// Components
import { Container } from '../../components/container';
import { Header, SearchHeader } from '../../components/headers';
import NewsListScreen from '../newsList';
// Constants
import Colors from '../../theme/Colors';
import { FONT_FAMILY_MEDIUM, kTextSizes } from '../../utils/Constants';
// Type
import type { NewsLabelField } from '../../models/News';
import { AppLoader } from '../../components/loaders';
// Translate
import i18next from 'i18next';

interface Props {
  newsListType: NewsLabelField[];
  isLoading: boolean;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const NewsView = ({
  newsListType,
  isLoading,
  searchText,
  setSearchText,
}: Props) => {
  let listType = [
    { id: 0, name: 'Highlight', des: 'des', type: 'highlight' },
    ...newsListType,
  ];

  const renderHeader = useCallback(() => {
    return <SearchHeader setSearchText={setSearchText} />;
  }, []);

  return (
    <Container>
      {/* {isLoading && <AppLoader />} */}
      <Header
        name={i18next.t('NewsScreen.Title')}
        showBackButton={false}
        style={{ zIndex: 999 }}
      />
      <Tabs.Container
        TabBarComponent={props => (
          <MaterialTabBar
            {...props}
            scrollEnabled
            indicatorStyle={{ backgroundColor: Colors.primary }}
            activeColor={Colors.primary}
            inactiveColor={Colors.grey6}
            labelStyle={{
              fontFamily: FONT_FAMILY_MEDIUM,
              fontSize: kTextSizes.middle,
            }}
          />
        )}
        renderHeader={renderHeader} // optional
        snapThreshold={0.5}
        lazy
        headerContainerStyle={styles.tab}>
        {newsListType &&
          listType.map(item => {
            return (
              <Tabs.Tab name={item.type} key={item.id} label={item.name}>
                <NewsListScreen
                  categoryId={item.id}
                  type={item.type}
                  searchText={searchText}
                />
              </Tabs.Tab>
            );
          })}
      </Tabs.Container>
    </Container>
  );
};

export default NewsView;

const styles = StyleSheet.create({
  tab: {
    backgroundColor: Colors.background,
    shadowOpacity: 0.1,
  },
});
