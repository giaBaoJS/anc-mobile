import i18next from 'i18next';
import React, { useCallback, useRef, useState } from 'react';
import {
  TouchableOpacity,
  Platform,
  StyleSheet,
  View,
  PixelRatio,
  FlatList,
  Dimensions,
} from 'react-native';
// Container
import { Container } from '../../components/container';
import { Header, SearchHeader } from '../../components/headers';
import { Line } from '../../components/line';
// Layout
import Layout from '../../theme/Layout';
// Contants
import Colors from '../../theme/Colors';
import {
  FONT_FAMILY_MEDIUM,
  kScaledSize,
  kSpacing,
  kTextSizes,
} from '../../utils/Constants';
import { RegularText, SemiBoldText } from '../../components/texts';
// Icon
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import {
  PlusIcon,
  ChangeFeatureIcon,
  TeamConnectIcon,
  LogoIcon,
} from '../../utils/SvgIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { hasNotch } from '../../utils/Common';
// Animation
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
// Tab
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { useNavigation } from '@react-navigation/native';
// Interface
import { FeatureField, GroupFeatureField } from '../../models/Hambuger';
import {
  HambugerStackNavigationProp,
  HambugerStackParamList,
} from '../../navigators/stacks/HambugerStack';

interface Props {
  tabPersonal: GroupFeatureField[];
  tabSysANC: GroupFeatureField[];
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  onNavigate: (link: keyof HambugerStackParamList) => void;
}

interface ItemProps {
  item: FeatureField;
  onNavigate: (link: keyof HambugerStackParamList) => void;
  numColumns: number;
}

const IconAnimated = Animated.createAnimatedComponent(MaterialIcons);

const ICON_SIZE35 = hasNotch() ? kScaledSize(35) : kScaledSize(37);
const ICON_SIZE40 = hasNotch() ? kScaledSize(40) : kScaledSize(42);

const FeatureItem: React.FC<ItemProps> = ({ item, onNavigate, numColumns }) => {
  const navigation = useNavigation<HambugerStackNavigationProp>();
  const onPress = (): void => {
    onNavigate(item.link);
  };
  const GenItem = () => {
    switch (item.name) {
      case 'PersonalProject':
        return (
          <Entypo name="briefcase" size={ICON_SIZE35} color={item.color} />
        );
      case 'TransactionFromSource':
        return (
          <MaterialCommunityIcons
            name="bank-transfer-out"
            size={ICON_SIZE40}
            color={item.color}
          />
        );
      case 'ApiKeyCode':
        return (
          <MaterialCommunityIcons
            name="api"
            size={ICON_SIZE40}
            color={item.color}
          />
        );
      case 'PersonalPolicyTemplate':
        return (
          <Ionicons name="library" size={ICON_SIZE35} color={item.color} />
        );
      case 'AccountManagement':
        return (
          <MaterialCommunityIcons
            name="account-arrow-left"
            size={ICON_SIZE40}
            color={item.color}
          />
        );
      case 'CompositeFrame':
        return (
          <MaterialCommunityIcons
            name="view-grid-plus"
            size={ICON_SIZE40}
            color={item.color}
          />
        );
      case 'QuickLink':
        return (
          <Ionicons
            name="arrow-redo-sharp"
            size={ICON_SIZE40}
            color={item.color}
          />
        );
      case 'ChangePass':
        return <Fontisto name="locked" size={ICON_SIZE35} color={item.color} />;
      case 'ChangePinCode':
        return (
          <Ionicons name="keypad-sharp" size={ICON_SIZE35} color={item.color} />
        );
      case 'LoginMethod':
        return <Entypo name="login" size={ICON_SIZE35} color={item.color} />;
      case 'AccountIntroduction':
        return (
          <View style={styles.imgSvg}>
            <TeamConnectIcon color={item.color} />
          </View>
        );
      case 'UpgradeAccount':
        return (
          <MaterialCommunityIcons
            name="account-arrow-up"
            size={ICON_SIZE40}
            color={item.color}
          />
        );
      case 'News':
        return (
          <Foundation name="megaphone" size={ICON_SIZE40} color={item.color} />
        );
      case 'PublicProject':
        return (
          <Entypo name="briefcase" size={ICON_SIZE35} color={item.color} />
        );
      case 'IntroductionToANC':
        return <LogoIcon focused={false} />;
      case 'ScanQR':
        return (
          <Ionicons
            name="qr-code-outline"
            size={ICON_SIZE40}
            color={item.color}
          />
        );
      case 'Helper':
        return (
          <Entypo
            name="help-with-circle"
            size={ICON_SIZE40}
            color={item.color}
          />
        );
      case 'TransactionSourceRegistration':
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
      default:
        return (
          <View style={styles.imgSvg}>
            <ChangeFeatureIcon color={item.color} />
          </View>
        );
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          { width: Dimensions.get('window').width / numColumns },
          styles.itemContainer,
        ]}>
        <View style={[Layout.center, styles.imgContainer]}>{GenItem()}</View>
        <RegularText style={styles.itemName}>
          {i18next.t(`HambugerScreen.${item.name}`)}
        </RegularText>
      </View>
    </TouchableOpacity>
  );
};

interface GroupExtendProps {
  listGroups: GroupFeatureField[];
  onNavigate: (link: keyof HambugerStackParamList) => void;
}

const GroupExtend: React.FC<GroupExtendProps> = ({
  listGroups,
  onNavigate,
}) => {
  const ref: any = useRef();

  const TabView = useCallback(
    ({ isExpand, nameGroup, listFeatures, numColumns }: GroupFeatureField) => {
      const RenderGroup = () => {
        const iconRotate = useSharedValue<any>('0deg');
        const [expanded, setExpanded] = useState<boolean>(false);
        const contentHeight = useSharedValue<number>(0);
        const contentOpacity = useSharedValue<number>(0);
        const [dynamicHeight, setDynamicHeight] = useState(0);
        const iconAnimatedStyle = useAnimatedStyle(() => {
          return {
            transform: [{ rotate: iconRotate.value }],
          };
        });
        const contentAnimatedStyles = useAnimatedStyle(() => {
          return {
            height: interpolate(
              contentHeight.value,
              [0, 1],
              [0, dynamicHeight],
              Extrapolate.CLAMP,
            ),
            opacity: contentOpacity.value,
          };
        });
        const onToggleFocus = (): void => {
          if (expanded) {
            iconRotate.value =
              Platform.OS === 'ios' ? withTiming('0deg') : '0deg';
            contentHeight.value = withTiming(0);
            setTimeout(() => {
              contentOpacity.value = withTiming(0);
            }, 100);
          } else {
            iconRotate.value =
              Platform.OS === 'ios' ? withTiming('90deg') : '90deg';
            contentHeight.value = withTiming(1);
            setTimeout(() => {
              contentOpacity.value = withTiming(1);
            }, 100);
          }
          setExpanded(!expanded);
        };

        return (
          <TouchableOpacity
            onPress={onToggleFocus}
            style={[styles.rowItem, Layout.shadow]}
            activeOpacity={0.9}>
            <View style={[Layout.rowBetween]}>
              <View style={[Layout.rowHCenter, { paddingHorizontal: 10 }]}>
                <SemiBoldText>{nameGroup}</SemiBoldText>
              </View>
              <IconAnimated
                name="keyboard-arrow-right"
                size={kScaledSize(22)}
                style={[iconAnimatedStyle]}
              />
            </View>
            <Animated.View
              style={[
                { minHeight: 40, paddingHorizontal: kSpacing.kSpacing10 },
                contentAnimatedStyles,
              ]}>
              {expanded && (
                <View
                  onLayout={event => {
                    const { x, y, width, height } = event.nativeEvent.layout;
                    setDynamicHeight(height);
                  }}>
                  <Line
                    style={{
                      borderBottomColor: Colors.grey6,
                      marginTop: kSpacing.kSpacing14,
                    }}
                  />
                  <View style={styles.userAccContainer}>
                    <FlatList
                      data={listFeatures}
                      renderItem={({ item }) => (
                        <FeatureItem
                          item={item}
                          onNavigate={onNavigate}
                          numColumns={numColumns}
                        />
                      )}
                      numColumns={numColumns}
                    />
                  </View>
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
        );
      };

      return (
        <View style={[Layout.fill]}>
          {listFeatures.length === 0 && (
            <RegularText
              style={[
                Layout.textCenter,
                { marginVertical: kSpacing.kSpacing10 },
              ]}>
              {i18next.t('HambugerScreen.SearchEmpty')}
            </RegularText>
          )}
          {!isExpand && listFeatures.length > 0 && (
            <View style={[Layout.whiteBg, { marginTop: 10 }]}>
              <FlatList
                data={listFeatures}
                style={{ width: '100%' }}
                renderItem={({ item }) => (
                  <FeatureItem
                    item={item}
                    onNavigate={onNavigate}
                    numColumns={numColumns}
                  />
                )}
                numColumns={numColumns}
              />
            </View>
          )}
          {isExpand && listFeatures.length > 0 && RenderGroup()}
        </View>
      );
    },
    [],
  );

  return (
    <Tabs.FlatList
      data={listGroups}
      renderItem={({ item }) => (
        <TabView
          isExpand={item.isExpand}
          nameGroup={item.nameGroup}
          listFeatures={item.listFeatures}
          numColumns={item.numColumns}
        />
      )}
    />
  );
};

const TabsView: React.FC<Props> = ({
  tabPersonal,
  tabSysANC,
  searchText,
  setSearchText,
  onNavigate,
}: Props) => {
  const HeaderTabs = useCallback(() => {
    return (
      <SearchHeader
        setSearchText={setSearchText}
        style={{ backgroundColor: Colors.grey8 }}
      />
    );
  }, []);

  return (
    <Tabs.Container
      renderHeader={() => HeaderTabs()}
      headerHeight={300}
      TabBarComponent={props => (
        <MaterialTabBar
          {...props}
          indicatorStyle={{ backgroundColor: Colors.primary }}
          activeColor={Colors.primary}
          inactiveColor={Colors.grey6}
          labelStyle={{
            fontFamily: FONT_FAMILY_MEDIUM,
            fontSize: kTextSizes.middle,
          }}
        />
      )}
      headerContainerStyle={{
        backgroundColor: Colors.grey8,
        shadowOpacity: 0.1,
      }}>
      <Tabs.Tab name={i18next.t('HambugerScreen.TabPersonalTitle')}>
        <GroupExtend listGroups={tabPersonal} onNavigate={onNavigate} />
      </Tabs.Tab>
      <Tabs.Tab name={i18next.t('HambugerScreen.TabSystemANC')}>
        <GroupExtend listGroups={tabSysANC} onNavigate={onNavigate} />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const HambugerView: React.FC<Props> = ({
  tabPersonal,
  tabSysANC,
  searchText,
  setSearchText,
  onNavigate,
}: Props) => {
  return (
    <Container>
      <Header
        name={i18next.t('HambugerScreen.Title')}
        style={{ zIndex: 999 }}
      />
      <TabsView
        tabPersonal={tabPersonal}
        tabSysANC={tabSysANC}
        searchText={searchText}
        setSearchText={setSearchText}
        onNavigate={onNavigate}
      />
    </Container>
  );
};

export default HambugerView;

const ICON_HEIGHT = hasNotch() ? kScaledSize(40) : kScaledSize(42);
const ICON_WIDTH = hasNotch() ? kScaledSize(40) : kScaledSize(42);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: kSpacing.kSpacing10,
  },
  imgContainer: {
    width: kScaledSize(60),
    height: kScaledSize(60),
  },
  plus: {
    position: 'absolute',
    zIndex: 999,
    top: hasNotch() ? kScaledSize(15) : kScaledSize(17),
    height: kScaledSize(12),
    width: kScaledSize(12),
  },
  helpIcon: {
    height: ICON_HEIGHT,
    width: ICON_WIDTH,
    padding: 0,
    margin: 0,
  },
  itemName: {
    textAlign: 'center',
    fontSize: kTextSizes.xmini,
    padding: 0,
    margin: 0,
  },
  itemContainer: {
    marginBottom: kScaledSize(40),
    alignItems: 'center',
    height: kScaledSize(50),
  },
  rowItem: {
    marginTop: kSpacing.kSpacing10,
    paddingVertical: kSpacing.kSpacing10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    flexGrow: 1,
  },
  userAccContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: kSpacing.kSpacing10,
  },
  imgSvg: {
    height: ICON_HEIGHT,
    width: ICON_WIDTH,
  },
});
