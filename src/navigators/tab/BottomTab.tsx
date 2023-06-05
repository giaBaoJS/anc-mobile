import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// Animated
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
// Components
import MediumText from '../../components/texts/MediumText';
// Style
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
// Stack
import {
  AboutStack,
  CurrencyStack,
  HelperStack,
  HomeStack,
  NewsStack,
  PolicyPatternStack,
  UserStack,
  ProjectStack,
  QRStack,
  TransactionPropertiesStack,
  TransactionSourceStack,
  TransactionStructureStack,
  PolicyStack,
  TransactionStack,
  KeyStack,
  WalletStack,
  LinkStack,
  MenuSettingStack,
} from '../stacks';
// Translate
import i18next from 'i18next';
// Common
import { hasNotch } from '../../utils/Common';
import {
  kScaledSize,
  kSpacing,
  kTextSizes,
  kWidth,
} from '../../utils/Constants';
// SVG icon
import { LogoIcon } from '../../utils/SvgIcon';
// Icon
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// Selector
import { useAppSelector } from '../../hooks/RTKHooks';
import { CommonImage } from '../../components/image';

export type BottomTabParamList = {
  User: undefined;
  Home: undefined;
  News: undefined;
  Project: undefined;
  QrScan: undefined;
  Helper: undefined;
  AboutANC: undefined;
  TransactionSource: undefined;
  TransactionStructure: undefined;
  TransactionProperties: undefined;
  PolicyPattern: undefined;
  Currency: undefined;
  Policy: undefined;
  Transaction: undefined;
  Key: undefined;
  Wallet: undefined;
  Link: undefined;
  MenuSetting: undefined;
};

export type BottomTabNavigationProps =
  BottomTabNavigationProp<BottomTabParamList>;

const TAB_HEIGHT = kScaledSize(76);
const TAB_ITEM = (kWidth - kScaledSize(144)) / 4;

const Tab = createBottomTabNavigator();

const MyTabBar: React.FC<BottomTabBarProps> = props => {
  const [mainFocus, setMainFocus] = useState<string>('Home');
  const { state: tabState, navigation } = props;
  const { homeTabItemList, userTabItemList } = useAppSelector(
    state => state.bottomtab,
  );
  const { isLogin, userInfo } = useAppSelector(state => state.auth);

  const routeName = () => {
    switch (tabState.index) {
      case 1:
        return 'User';
      case 2:
        return 'News';
      case 3:
        return 'Project';
      case 4:
        return 'QR';
      case 5:
        return 'Helper';
      case 6:
        return 'AboutANC';
      case 7:
        return 'TransactionSource';
      case 8:
        return 'TransactionStructure';
      case 9:
        return 'TransactionProperties';
      case 10:
        return 'PolicyPattern';
      case 11:
        return 'Currency';
      case 12:
        return 'Policy';
      case 13:
        return 'Transaction';
      case 14:
        return 'Key';
      case 15:
        return 'Wallet';
      case 16:
        return 'Synthesis';
      case 17:
        return 'Link';
      case 18:
        return 'MenuSetting';
      default:
        return 'Home';
    }
  };
  // Animated Bottom Tab
  const homeHeightValue = useSharedValue(0);
  const homeOpacity = useSharedValue(1);
  const userHeightValue = useSharedValue(TAB_HEIGHT);
  const userOpacity = useSharedValue(0);
  const homeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: homeHeightValue.value }],
      opacity: homeOpacity.value,
    };
  });
  const userAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: userHeightValue.value }],
      opacity: userOpacity.value,
    };
  });
  const onToggleFocus = (name: string): void => {
    if (name === 'Home') {
      userHeightValue.value = withTiming(TAB_HEIGHT);
      userOpacity.value = withTiming(0);
      homeHeightValue.value = withTiming(0);
      homeOpacity.value = withTiming(1);
    } else if (name === 'User' && !isLogin) {
      navigation.navigate('LoginStack');
      return;
    } else {
      homeHeightValue.value = withTiming(TAB_HEIGHT);
      homeOpacity.value = withTiming(0);
      userHeightValue.value = withTiming(0);
      userOpacity.value = withTiming(1);
    }

    setMainFocus(name);
    navigation.navigate(name);
  };

  useEffect(() => {
    onToggleFocus(isLogin ? 'User' : 'Home');
  }, [isLogin]);

  return (
    <View style={[styles.tabBar, Layout.shadow, Layout.justifyContentBetween]}>
      <TouchableOpacity
        disabled={tabState.index === 0 ? true : false}
        onPress={() => onToggleFocus('Home')}
        activeOpacity={0.8}
        style={[
          styles.mainItem,
          {
            backgroundColor:
              mainFocus === 'Home' && tabState.index === 0
                ? Colors.primary
                : mainFocus === 'Home' && tabState.index !== 1
                ? Colors.green20
                : Colors.light_grey,
          },
        ]}>
        <View style={{ marginBottom: kSpacing.kSpacing8 }}>
          <LogoIcon
            focused={
              mainFocus === 'Home' && tabState.index === 0 ? true : false
            }
          />
        </View>
        <MediumText
          allowFontScaling={false}
          style={{
            fontSize: kTextSizes.xmini,
            color:
              mainFocus === 'Home' && tabState.index === 0
                ? Colors.white
                : Colors.grey,
          }}>
          {i18next.t('BottomTab.Home')}
        </MediumText>
      </TouchableOpacity>
      <Animated.View style={[styles.tabWrapper, Layout.row, homeAnimatedStyle]}>
        {homeTabItemList.map(route => {
          const label = route.tabBarLabel;
          const currentRouteName = route.name;
          const isFocused = routeName() === currentRouteName;
          const onPress = () => {
            if (!isFocused) {
              navigation.navigate({ name: route.name, key: '' });
            }
          };
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={[styles.tabBarItem]}>
              <View style={[styles.iconWrapper]}>
                {route.name === 'News' && (
                  <Foundation
                    name="megaphone"
                    size={hasNotch() ? kScaledSize(30) : kScaledSize(35)}
                    color={isFocused ? Colors.primary : Colors.grey6}
                  />
                )}
                {route.name === 'Project' && (
                  <Entypo
                    name="briefcase"
                    size={hasNotch() ? kScaledSize(26) : kScaledSize(30)}
                    color={isFocused ? Colors.primary : Colors.grey6}
                  />
                )}
                {route.name === 'QR' && (
                  <Ionicons
                    name="qr-code-outline"
                    size={hasNotch() ? kScaledSize(26) : kScaledSize(30)}
                    color={isFocused ? Colors.primary : Colors.grey6}
                  />
                )}
                {route.name === 'Helper' && (
                  <Entypo
                    name="help-with-circle"
                    size={hasNotch() ? kScaledSize(26) : kScaledSize(30)}
                    color={isFocused ? Colors.primary : Colors.grey6}
                  />
                )}
                {route.name === 'AboutANC' && (
                  <Entypo
                    name="info-with-circle"
                    size={hasNotch() ? kScaledSize(26) : kScaledSize(30)}
                    color={isFocused ? Colors.primary : Colors.grey6}
                  />
                )}
                {route.name === 'TransactionSource' && (
                  <FontAwesome5
                    name="store"
                    style={{ marginTop: kSpacing.kSpacing2 }}
                    size={hasNotch() ? kScaledSize(23) : kScaledSize(26)}
                    color={isFocused ? Colors.primary : Colors.grey6}
                  />
                )}
              </View>
              <MediumText
                allowFontScaling={false}
                style={{
                  textAlign: 'center',
                  fontSize: hasNotch() ? kTextSizes.xxmini : kTextSizes.xmini,
                  color: isFocused ? Colors.primary : Colors.grey,
                }}>
                {label}
              </MediumText>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      <Animated.View style={[styles.tabWrapper, Layout.row, userAnimatedStyle]}>
        {userTabItemList.map(route => {
          const label = route.tabBarLabel;
          const currentRouteName = route.name;
          const isFocused = routeName() === currentRouteName;
          const onPress = () => {
            if (!isFocused) {
              navigation.navigate({ name: route.name, key: '' });
            }
          };
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={[styles.tabBarItem]}>
              <View style={[styles.iconWrapper]}>
                {route.name === 'Project' && (
                  <Entypo
                    name="briefcase"
                    size={hasNotch() ? kScaledSize(27) : kScaledSize(28)}
                    color={isFocused ? Colors.primary : Colors.grey6}
                  />
                )}
                {/* User */}
                {route.name === 'Policy' && (
                  <MaterialIcons
                    name="policy"
                    size={hasNotch() ? kScaledSize(26) : kScaledSize(28)}
                    color={isFocused ? Colors.primary : Colors.grey6}
                  />
                )}
                {route.name === 'Key' && (
                  <MaterialCommunityIcons
                    name="folder-key"
                    size={hasNotch() ? kScaledSize(26) : kScaledSize(28)}
                    color={isFocused ? Colors.primary : Colors.grey6}
                  />
                )}
                {route.name === 'Transaction' && (
                  <Entypo
                    name="layers"
                    size={hasNotch() ? kScaledSize(26) : kScaledSize(28)}
                    color={isFocused ? Colors.primary : Colors.grey6}
                  />
                )}
                {route.name === 'Wallet' && (
                  <Entypo
                    name="wallet"
                    size={hasNotch() ? kScaledSize(26) : kScaledSize(28)}
                    color={isFocused ? Colors.primary : Colors.grey6}
                  />
                )}
              </View>
              <MediumText
                allowFontScaling={false}
                style={{
                  textAlign: 'center',
                  fontSize: hasNotch() ? kTextSizes.xxmini : kTextSizes.xmini,
                  color: isFocused ? Colors.primary : Colors.grey,
                }}>
                {label}
              </MediumText>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      <TouchableOpacity
        disabled={tabState.index === 1 ? true : false}
        onPress={() => onToggleFocus('User')}
        activeOpacity={0.8}
        style={[
          styles.mainItem,
          {
            backgroundColor:
              mainFocus === 'User' && tabState.index === 1
                ? Colors.primary
                : mainFocus === 'User' && tabState.index !== 0
                ? Colors.green20
                : Colors.light_grey,
          },
        ]}>
        {isLogin && userInfo?.avatar ? (
          <View style={[Layout.center, { marginBottom: kSpacing.kSpacing5 }]}>
            <CommonImage
              source={userInfo?.avatar}
              wrapperStyle={styles.userCircle}
              style={[
                styles.userCircle,
                { borderWidth: 1, borderColor: Colors.white },
              ]}
              resize="cover"
            />
          </View>
        ) : (
          <View
            style={[
              styles.userCircle,
              Layout.center,
              {
                backgroundColor: Colors.white,
                marginBottom:
                  !hasNotch() && Platform.OS === 'ios'
                    ? kSpacing.kSpacing8
                    : kSpacing.kSpacing5,
              },
            ]}>
            <Image
              source={require('../../assets/images/icon-user.png')}
              style={styles.userIcon}
            />
          </View>
        )}

        <MediumText
          allowFontScaling={false}
          style={{
            fontSize: kTextSizes.xmini,
            color:
              mainFocus === 'User' && tabState.index === 1
                ? Colors.white
                : Colors.grey,
          }}>
          {i18next.t('BottomTab.User')}
        </MediumText>
      </TouchableOpacity>
    </View>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.Home'),
        }}
        name={'Home'}
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.User'),
        }}
        name={'User'}
        component={UserStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.News'),
        }}
        name={'News'}
        component={NewsStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.Project'),
        }}
        name={'Project'}
        component={ProjectStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.QrScan'),
        }}
        name={'QR'}
        component={QRStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.Helper'),
        }}
        name={'Helper'}
        component={HelperStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.AboutANC'),
        }}
        name={'AboutANC'}
        component={AboutStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.TransactionSource'),
        }}
        name={'TransactionSource'}
        component={TransactionSourceStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.TransactionStructure'),
        }}
        name={'TransactionStructure'}
        component={TransactionStructureStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.TransactionProperties'),
        }}
        name={'TransactionProperties'}
        component={TransactionPropertiesStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.PolicyPattern'),
        }}
        name={'PolicyPattern'}
        component={PolicyPatternStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.Currency'),
        }}
        name={'Currency'}
        component={CurrencyStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.Policy'),
        }}
        name={'Policy'}
        component={PolicyStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.Transaction'),
        }}
        name={'Transaction'}
        component={TransactionStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.Key'),
        }}
        name={'Key'}
        component={KeyStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.Wallet'),
        }}
        name={'Wallet'}
        component={WalletStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.Synthesis'),
        }}
        name={'Synthesis'}
        component={LinkStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.Link'),
        }}
        name={'Link'}
        component={LinkStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: i18next.t('BottomTab.MenuSetting'),
        }}
        name={'MenuSetting'}
        component={MenuSettingStack}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: TAB_HEIGHT,
    backgroundColor: Colors.white,
  },
  mainItem: {
    height: '100%',
    width: kScaledSize(72),
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: hasNotch() ? kSpacing.kSpacing18 : kSpacing.kSpacing11,
  },
  homeIcon: {
    resizeMode: 'contain',
    width: kScaledSize(37.12),
    marginBottom: kSpacing.kSpacing5,
  },
  userCircle: {
    width: kScaledSize(32),
    height: kScaledSize(32),
    borderRadius: kScaledSize(20),
    // marginBottom: hasNotch() ? kSpacing.kSpacing5 : kSpacing.kSpacing8,
  },
  userIcon: {
    resizeMode: 'contain',
    width: kScaledSize(18),
    marginRight: kScaledSize(0.5),
  },
  tabWrapper: {
    height: TAB_HEIGHT,
    position: 'absolute',
    width: kWidth - kScaledSize(144),
    left: kScaledSize(72),
  },
  tabBarItem: {
    height: '100%',
    width: TAB_ITEM,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: kSpacing.kSpacing10,
  },
  iconWrapper: {
    height: hasNotch() ? kScaledSize(26) : kScaledSize(32),
    alignItems: 'center',
    marginBottom: kSpacing.kSpacing5,
  },
});

export default BottomTab;
