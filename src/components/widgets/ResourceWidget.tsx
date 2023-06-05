import React from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle } from 'react-native';
// Type
import type { ResourceField, ResourceWidgetField } from '../../models/Widget';
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
import { SettingIcon, TeamIcon, StructureIcon } from '../../utils/SvgIcon';
// Redux
import { useNavigation } from '@react-navigation/core';
import { useAppSelector } from '../../hooks/RTKHooks';

type Props = {
  style?: ViewStyle;
  title: string;
  lists: ResourceField[];
};

type ItemProps = {
  item: ResourceField;
  isLogin: boolean;
};

const ITEM_WIDTH = kWidth / 4;

const ResourceWidgetItem: React.FC<ItemProps> = ({ item, isLogin }) => {
  const navigation = useNavigation<any>();
  const onPress = (): void => {
    if (item.name === 'HomeSetting') {
      if (isLogin) {
        navigation.navigate(`${item.name}Screen`);
      } else {
        navigation.navigate('LoginStack');
      }
      return;
    }
    navigation.navigate(`${item.name}Stack`, {
      screen: `${item.name}Screen`,
    });
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.item]}>
      {item.notiCount > 0 && (
        <View style={[styles.noti, Layout.center]}>
          <RegularText style={styles.notiText}>
            {item.notiCount <= 99 ? item.notiCount : 99}
          </RegularText>
        </View>
      )}
      <View style={styles.iconWrapper}>
        {item.name === 'TransactionSource' && (
          <Entypo
            name="shop"
            size={hasNotch() ? kScaledSize(35) : kScaledSize(37)}
            color={item.color}
          />
        )}
        {item.name === 'TransactionRole' && (
          <View style={styles.teamIcon}>
            <TeamIcon color={item.color} />
          </View>
        )}
        {item.name === 'TransactionStructure' && (
          <View style={styles.structureIcon}>
            <StructureIcon color={item.color} />
          </View>
        )}
        {item.name === 'PolicyPattern' && (
          <Ionicons
            name="library"
            size={hasNotch() ? kScaledSize(32) : kScaledSize(34)}
            color={item.color}
          />
        )}
        {item.name === 'HomeSetting' && (
          <Entypo
            name="add-to-list"
            size={hasNotch() ? kScaledSize(35) : kScaledSize(38)}
            color={item.color}
          />
        )}
      </View>
      <RegularText style={styles.itemName}>
        {i18next.t(`BottomTab.${item.name}`)}
      </RegularText>
    </TouchableOpacity>
  );
};

const ResourceWidget: React.FC<Props> = ({ style, title, lists }) => {
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
        {lists.map(item => (
          <ResourceWidgetItem key={item.name} item={item} isLogin={isLogin} />
        ))}
      </View>
    </View>
  );
};

export default ResourceWidget;

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
  teamIcon: {
    width: kScaledSize(30),
    height: kScaledSize(30),
  },
  structureIcon: {
    width: kScaledSize(32),
    height: kScaledSize(32),
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
});
