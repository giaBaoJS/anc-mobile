import React from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle } from 'react-native';
// Type
import type { UtilityField } from '../../models/Widget';
// Theme
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
// Constants
import {
  kScaledSize,
  kSpacing,
  kTextSizes,
  kWidth,
} from '../../utils/Constants';
import { hasNotch } from '../../utils/Common';
// Components
import { SemiBoldText, RegularText } from '../texts';
// Translate
import i18next from 'i18next';
// Icon
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PlusIcon, SettingIcon } from '../../utils/SvgIcon';
// Redux
import { useNavigation } from '@react-navigation/core';
import { useAppSelector } from '../../hooks/RTKHooks';

type Props = {
  style?: ViewStyle;
  title: string;
  lists: UtilityField[];
};

type ItemProps = {
  item: UtilityField;
  isLogin: boolean;
};

const ITEM_WIDTH = kWidth / 4;

const UtilityWidgetItem: React.FC<ItemProps> = ({ item, isLogin }) => {
  const navigation = useNavigation<any>();

  const onPress = (): void => {
    navigation.navigate(`${item.slug}Stack`);
    // if (item.name === 'HomeSetting') {
    //   if (isLogin) {
    //     navigation.navigate(`${item.name}Screen`);
    //   } else {
    //     navigation.navigate('LoginStack');
    //   }
    //   return;
    // }
    // navigation.navigate(`${item.name}Stack`, {
    //   screen: `${item.name}Screen`,
    // });
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.item]}>
      <View style={styles.iconWrapper}>
        {item.slug === 'QR' && (
          <Ionicons
            name="qr-code-outline"
            size={hasNotch() ? kScaledSize(32) : kScaledSize(34)}
            color={item.color}
          />
        )}
        {item.slug === 'Helper' && (
          <Entypo
            name="help-with-circle"
            size={hasNotch() ? kScaledSize(33) : kScaledSize(35)}
            color={item.color}
          />
        )}
        {item.slug === 'TransactionRegister' && (
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
            <Entypo
              name="shop"
              size={hasNotch() ? kScaledSize(35) : kScaledSize(37)}
              color={item.color}
            />
          </View>
        )}
        {item.slug === 'HomeSetting' && (
          <Entypo
            name="add-to-list"
            size={hasNotch() ? kScaledSize(35) : kScaledSize(38)}
            color={item.color}
          />
        )}
      </View>
      <RegularText style={styles.itemName}>{item.name}</RegularText>
    </TouchableOpacity>
  );
};

const UtilityWidget: React.FC<Props> = ({ style, title, lists }) => {
  const { isLogin } = useAppSelector(state => state.auth);
  const navigation = useNavigation<any>();
  const onPress = (): void => {
    navigation.navigate('HomeSettingScreen');
  };
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.more, Layout.rowBetween]}>
        <SemiBoldText style={styles.title}>{title}</SemiBoldText>
        {isLogin && (
          <TouchableOpacity onPress={onPress} style={styles.settingIcon}>
            <SettingIcon color={Colors.grey5} />
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.widgetList, Layout.row, Layout.shadow]}>
        {lists &&
          lists.map(item => (
            <UtilityWidgetItem key={item.name} item={item} isLogin={isLogin} />
          ))}
      </View>
    </View>
  );
};

export default UtilityWidget;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: kSpacing.kSpacing15,
  },
  widgetList: {
    flexWrap: 'wrap',
    borderRadius: 5,
    backgroundColor: Colors.white,
    paddingTop: kSpacing.kSpacing5,
    paddingBottom: kSpacing.kSpacing10,
  },
  more: {
    paddingHorizontal: kSpacing.kSpacing15,
    marginBottom: kSpacing.kSpacing10,
  },
  title: {
    fontSize: kTextSizes.medium,
  },
  settingIcon: {
    width: kScaledSize(20),
    height: kScaledSize(20),
    marginLeft: kSpacing.kSpacing10,
  },
  item: {
    width: ITEM_WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconWrapper: {
    marginTop: kSpacing.kSpacing5,
    height: kScaledSize(38),
    alignItems: 'center',
  },
  itemName: {
    textAlign: 'center',
    fontSize: kTextSizes.xmini,
  },
  plus: {
    position: 'absolute',
    zIndex: 999,
    top: hasNotch() ? kScaledSize(15) : kScaledSize(17),
    height: kScaledSize(12),
    width: kScaledSize(12),
  },
});
