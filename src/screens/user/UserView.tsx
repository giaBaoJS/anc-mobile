import i18next from 'i18next';
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';
// Container
import { Container } from '../../components/container';
import { HomeHeader } from '../../components/headers';
import { AppLoader } from '../../components/loaders';
// Constants
import Layout from '../../theme/Layout';
import {
  kScaledSize,
  kSpacing,
  kTextSizes,
  kWidth,
} from '../../utils/Constants';
import Colors from '../../theme/Colors';
import {
  BoldText,
  MediumText,
  RegularText,
  SemiBoldText,
} from '../../components/texts';
//Icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatNumber, hasNotch } from '../../utils/Common';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { PlusIcon, SettingIcon, TeamConnectIcon } from '../../utils/SvgIcon';
// Component
import { Line } from '../../components/line';
import { LineChart } from '../../components/chart';
import { NewsWidget } from '../../components/widgets';
// Interface
import { UserStackParamList } from '../../navigators/stacks/UserStack';
import {
  UserFeatureField,
  UserHome,
  UserListFeatureField,
} from '../../models/UserHome';
import { NewsWidgetField } from '../../models/Widget';

interface Props {
  handleLogout: () => void;
  isLoading: boolean;
  isShowMoney: boolean;
  userHomeList: UserHome[];
  newsWidget: NewsWidgetField;
  features: UserListFeatureField;
  onNavigate: (link: keyof UserStackParamList) => void;
  onShowMonneyScreen: () => void;
}

interface ItemListProps {
  type: string;
  newsWidget: NewsWidgetField;
  features: UserListFeatureField;
  onNavigate: (link: keyof UserStackParamList) => void;
}

interface FeaturesContainerProps {
  features: UserListFeatureField;
  onNavigate: (link: keyof UserStackParamList) => void;
}
interface ListHeaderContainerProps {
  isShowMonney: boolean;
  onShowMonneyScreen: () => void;
  onNavigate: (link: keyof UserStackParamList) => void;
}

interface ItemProps {
  item: UserFeatureField;
  onNavigate: (link: keyof UserStackParamList) => void;
  numColumns: number;
}

const ICON_SIZE40 = hasNotch() ? kScaledSize(40) : kScaledSize(42);
const ICON_SIZE20 = hasNotch() ? kScaledSize(20) : kScaledSize(22);

const FeatureItem = ({ item, onNavigate, numColumns }: ItemProps) => {
  const onPress = (): void => {
    onNavigate(item.link);
  };
  const GenItem = () => {
    switch (item.name) {
      case 'Project':
        return (
          <Entypo name="briefcase" size={ICON_SIZE40} color={item.color} />
        );
      case 'AddProject':
        return (
          <View
            style={[
              Layout.center,
              {
                transform: [{ translateY: -kSpacing.kSpacing3 }],
              },
            ]}>
            <View style={styles.plus}>
              <PlusIcon color={item.color} />
            </View>
            <Entypo name="briefcase" size={ICON_SIZE40} color={item.color} />
          </View>
        );
      case 'AddTransactionSource':
        return (
          <View
            style={[
              Layout.center,
              {
                transform: [{ translateY: -kSpacing.kSpacing3 }],
              },
            ]}>
            <View style={styles.plus}>
              <PlusIcon color={item.color} />
            </View>
            <Entypo name="shop" size={ICON_SIZE40} color={item.color} />
          </View>
        );
      case 'TransactionSource':
        return <Entypo name="shop" size={ICON_SIZE40} color={item.color} />;
      case 'ApiKeyCode':
        return (
          <MaterialCommunityIcons
            name="api"
            size={ICON_SIZE40}
            color={item.color}
          />
        );
      case 'PolicyPattern':
        return (
          <Ionicons name="library" size={ICON_SIZE40} color={item.color} />
        );
      case 'TransactionRole':
        return (
          <View style={styles.imgSvg}>
            <TeamConnectIcon color={item.color} />
          </View>
        );
      case 'UserSettingLayout':
        return (
          <Entypo name="add-to-list" size={ICON_SIZE40} color={item.color} />
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          {
            width: kWidth / numColumns,
          },
          styles.itemContainer,
        ]}>
        {item.notiCount > 0 && (
          <View style={[styles.noti, Layout.center]}>
            <RegularText style={styles.notiText}>
              {item.notiCount <= 99 ? item.notiCount : 99}
            </RegularText>
          </View>
        )}
        <View style={[Layout.center, styles.imgContainer]}>{GenItem()}</View>
        <RegularText style={styles.itemName}>
          {i18next.t(`PersonalHomeScreen.${item.name}`)}
        </RegularText>
      </View>
    </TouchableOpacity>
  );
};

const FeaturesContainer = ({
  features,
  onNavigate,
}: FeaturesContainerProps) => {
  return (
    <View style={[styles.container, Layout.boxShadow]}>
      <View style={[styles.more, Layout.rowBetween]}>
        <BoldText>{i18next.t('PersonalHomeScreen.Feature')}</BoldText>
        <TouchableOpacity
          onPress={() => onNavigate('UserSettingLayoutStack')}
          style={styles.settingIcon}>
          <SettingIcon color={Colors.grey5} />
        </TouchableOpacity>
      </View>
      <View style={Layout.whiteBg}>
        <FlatList
          data={features.listFeatures}
          renderItem={({ item }) => (
            <FeatureItem
              item={item}
              numColumns={features.numColumns}
              onNavigate={onNavigate}
            />
          )}
          numColumns={features.numColumns}
        />
      </View>
    </View>
  );
};

const ListHeaderContainer = ({
  isShowMonney,
  onShowMonneyScreen,
  onNavigate,
}: ListHeaderContainerProps) => {
  return (
    <>
      <View
        style={[
          Layout.whiteBg,
          styles.container,
          styles.more,
          Layout.boxShadow,
        ]}>
        {/* line 1 */}
        <View
          style={[Layout.row, Layout.justifyContentBetween, styles.marginRow]}>
          <View style={Layout.rowCenter}>
            <MediumText style={[styles.labelGreen]}>
              {i18next.t('PersonalHomeScreen.TotalPrice')} (VNĐ)
            </MediumText>
            <TouchableOpacity onPress={onShowMonneyScreen}>
              <Ionicons
                name={isShowMonney ? 'eye' : 'eye-off'}
                size={ICON_SIZE20}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: Colors.grey6,
                  marginLeft: kSpacing.kSpacing10,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={Layout.rowCenter}>
            <MediumText style={styles.titleTransactionHistory}>
              {i18next.t('PersonalHomeScreen.TransactionHistory')}
            </MediumText>
          </View>
        </View>
        {/* end line 1 */}
        {/* line 2 */}
        <View
          style={[Layout.row, Layout.justifyContentBetween, styles.marginRow]}>
          <View style={[styles.numberWrapper, Layout.rowCenter]}>
            <MediumText
              allowFontScaling={false}
              style={[
                styles.colorGray5,
                {
                  fontSize:
                    Platform.OS === 'android' && !isShowMonney
                      ? kTextSizes.small
                      : kTextSizes.xlarge,
                },
              ]}>
              {isShowMonney ? formatNumber(1000000000) : '●●●●●●'}
            </MediumText>
          </View>
          <View style={[styles.numberWrapper, Layout.rowCenter]}>
            <MediumText
              allowFontScaling={false}
              style={[
                styles.colorGray5,
                {
                  fontSize:
                    Platform.OS === 'android' && !isShowMonney
                      ? kTextSizes.mini
                      : kTextSizes.small,
                },
              ]}>
              {isShowMonney ? formatNumber(8214000) : '●●●●●●'}
            </MediumText>
          </View>
        </View>
        {/* end line 2 */}
        <Line
          style={{
            borderBottomColor: Colors.grey7,
            marginBottom: kSpacing.kSpacing10,
          }}
        />

        {/* line 3 */}
        <View
          style={[Layout.row, Layout.justifyContentBetween, styles.marginRow]}>
          <View style={Layout.rowCenter}>
            <Fontisto
              name="wallet"
              size={ICON_SIZE20}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                color: Colors.purple2,
                marginRight: kSpacing.kSpacing10,
              }}
            />
            <RegularText>
              {i18next.t('PersonalHomeScreen.Wallet')} SP{' '}
              {i18next.t('PersonalHomeScreen.Personal')}:
            </RegularText>
          </View>
          <View style={[styles.numberWrapper, Layout.rowCenter]}>
            <SemiBoldText
              allowFontScaling={false}
              style={[
                styles.colorGray5,
                {
                  fontSize:
                    Platform.OS === 'android' && !isShowMonney
                      ? kTextSizes.mini
                      : kTextSizes.middle,
                },
              ]}>
              {isShowMonney ? formatNumber(444000) : '●●●●●●'}{' '}
            </SemiBoldText>
            <SemiBoldText
              style={[styles.colorGray5, { fontSize: kTextSizes.small }]}>
              SP
            </SemiBoldText>
          </View>
        </View>
        {/* end line 3 */}

        {/* line 4 */}
        <View
          style={[Layout.row, Layout.justifyContentBetween, styles.marginRow]}>
          <View style={Layout.rowCenter}>
            <Fontisto
              name="wallet"
              size={ICON_SIZE20}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                color: Colors.navy,
                marginRight: kSpacing.kSpacing10,
              }}
            />
            <RegularText>
              {i18next.t('PersonalHomeScreen.Wallet')} P{' '}
              {i18next.t('PersonalHomeScreen.Personal')}:
            </RegularText>
          </View>
          <View style={[styles.numberWrapper, Layout.rowCenter]}>
            <SemiBoldText
              allowFontScaling={false}
              style={[
                styles.colorGray5,
                {
                  fontSize:
                    Platform.OS === 'android' && !isShowMonney
                      ? kTextSizes.mini
                      : kTextSizes.middle,
                },
              ]}>
              {isShowMonney ? formatNumber(444000) : '●●●●●●'}{' '}
            </SemiBoldText>
            <SemiBoldText
              style={[styles.colorGray5, { fontSize: kTextSizes.small }]}>
              SP
            </SemiBoldText>
          </View>
        </View>
        {/* end line 4 */}
      </View>

      <View style={[Layout.whiteBg, Layout.boxShadow]}>
        <View style={[styles.container, styles.more, Layout.rowBetween]}>
          <SemiBoldText>{i18next.t('PersonalHomeScreen.Summary')}</SemiBoldText>
          <TouchableOpacity
            onPress={() => onNavigate('UserSettingLayoutStack')}
            style={styles.settingIcon}>
            <SettingIcon color={Colors.grey5} />
          </TouchableOpacity>
        </View>
        <View style={[Layout.center]}>
          <LineChart
            bezier
            data={{
              labels: [' text', 'text', 'text', 'text', 'text'],
              datasets: [
                {
                  data: [10, 50, 60, 40, 45],
                  strokeWidth: 2,
                  color: (opacity = 1) => Colors.navy, // optional
                },
                {
                  data: [50, 20, 60, 86, 80],
                  strokeWidth: 2,
                  color: (opacity = 1) => Colors.green2, // optional
                },
                {
                  data: [100],
                  withDots: false,
                },
              ],
              legend: ['Title1', 'Title2'],
            }}
            width={kWidth}
            height={kScaledSize(200)}
            segments={4}
            yLabelsOffset={10}
            withShadow={false}
            withHorizontalLines={true}
            withInnerLines={true}
            fromZero={true}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={{
              marginVertical: kSpacing.kSpacing8,
              padding: 0,
            }}
            renderDotContent={({ x, y, index, indexData }) => {
              if (index === 0) {
                x += kSpacing.kSpacing10;
              }
              return (
                <View
                  key={Math.random()}
                  style={{
                    position: 'absolute',
                    top: y - kSpacing.kSpacing16,
                    left: x - kSpacing.kSpacing20,
                  }}>
                  <RegularText
                    style={{
                      color: Colors.grey5,
                      fontSize: kTextSizes.xxmini,
                    }}>
                    {indexData}
                  </RegularText>
                </View>
              );
            }}
          />
        </View>
      </View>
    </>
  );
};

const ItemList = ({
  type,
  newsWidget,
  features,
  onNavigate,
}: ItemListProps) => {
  const genItem = () => {
    switch (type) {
      case 'feature':
        return (
          <FeaturesContainer features={features} onNavigate={onNavigate} />
        );
      case 'news':
        return (
          <NewsWidget
            title={i18next.t('Widget.News')}
            lists={newsWidget.news}
          />
        );
      default:
        null;
    }
  };
  return <View>{genItem()}</View>;
};

const UserView = ({
  isLoading,
  isShowMoney,
  userHomeList,
  newsWidget,
  features,
  onNavigate,
  onShowMonneyScreen,
}: Props) => {
  return (
    <Container>
      <HomeHeader />
      {isLoading && <AppLoader />}
      <FlatList
        data={userHomeList}
        ListHeaderComponent={
          <ListHeaderContainer
            isShowMonney={isShowMoney}
            onShowMonneyScreen={onShowMonneyScreen}
            onNavigate={onNavigate}
          />
        }
        keyExtractor={item => item.type}
        renderItem={({ item }) => (
          <ItemList
            type={item.type}
            newsWidget={newsWidget}
            features={features}
            onNavigate={onNavigate}
          />
        )}
      />
    </Container>
  );
};

export default UserView;

const ICON_HEIGHT = hasNotch() ? kScaledSize(40) : kScaledSize(42);
const ICON_WIDTH = hasNotch() ? kScaledSize(40) : kScaledSize(42);
const ITEM_WIDTH = kWidth / 4;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: kSpacing.kSpacing15,
  },
  title: {
    fontSize: kTextSizes.medium,
  },
  more: {
    paddingHorizontal: kSpacing.kSpacing15,
    marginBottom: kSpacing.kSpacing10,
    padding: kSpacing.kSpacing10,
  },
  labelGreen: {
    color: Colors.primary,
  },
  titleTransactionHistory: {
    fontSize: kTextSizes.xmini,
    color: Colors.grey6,
  },
  numberWrapper: {
    height: kScaledSize(30),
  },
  marginRow: {
    marginBottom: kSpacing.kSpacing10,
  },
  plus: {
    position: 'absolute',
    zIndex: 999,
    top: hasNotch() ? kScaledSize(15) : kScaledSize(17),
    height: kScaledSize(12),
    width: kScaledSize(12),
  },
  itemName: {
    textAlign: 'center',
    fontSize: kTextSizes.xmini,
    padding: 0,
    margin: 0,
  },
  imgContainer: {
    width: kScaledSize(60),
    height: kScaledSize(60),
  },
  itemContainer: {
    marginBottom: kScaledSize(40),
    alignItems: 'center',
    height: kScaledSize(50),
  },
  imgSvg: {
    height: ICON_HEIGHT,
    width: ICON_WIDTH,
  },
  noti: {
    position: 'absolute',
    zIndex: 999,
    top: kSpacing.kSpacing2,
    right: ITEM_WIDTH / 4,
    width: kScaledSize(14),
    height: kScaledSize(14),
    borderRadius: kScaledSize(7),
    backgroundColor: Colors.orange,
  },
  notiText: {
    color: Colors.white,
    fontSize: kTextSizes.xxmini,
  },
  colorGray5: {
    color: Colors.grey5,
  },
  settingIcon: {
    width: kScaledSize(20),
    height: kScaledSize(20),
    marginLeft: kSpacing.kSpacing10,
  },
});
