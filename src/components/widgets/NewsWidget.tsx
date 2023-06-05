import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import dayjs from 'dayjs';
// Components
import { CommonImage } from '../image';
import { MediumText, RegularText, SemiBoldText } from '../texts';
// Theme
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
// Constant
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
// Type
import type { NewsInfoField } from '../../models/News';
// Redux
import { useNavigation } from '@react-navigation/core';
import { useAppSelector } from '../../hooks/RTKHooks';
// Icon
import { SettingIcon } from '../../utils/SvgIcon';
// Translate
import i18next from 'i18next';

type Props = {
  title: string;
  lists: NewsInfoField[];
  style?: ViewStyle;
};

type ItemProps = {
  item: NewsInfoField;
  index: number;
  navigation: any;
};

const NewItem: React.FC<ItemProps> = ({ item, index, navigation }) => {
  const onPressItem = () => {
    navigation.navigate('News', {
      screen: 'NewsDetailScreen',
      params: { item, backToTopStack: 'News' },
    });
  };
  return (
    <TouchableOpacity
      onPress={onPressItem}
      activeOpacity={0.8}
      style={[
        styles.item,
        { marginLeft: index === 0 ? kSpacing.kSpacing15 : 0 },
      ]}>
      <CommonImage
        source={item.thumbnail}
        wrapperStyle={styles.thumbnail}
        resize="cover"
      />
      <View style={[Layout.scrollSpaceBetween]}>
        <MediumText numberOfLines={2} style={styles.text}>
          {item.title}
        </MediumText>
        <View>
          <View style={styles.line} />
          <View
            style={[Layout.rowBetween, { marginVertical: kSpacing.kSpacing5 }]}>
            <RegularText style={styles.date}>
              {dayjs(item.created).format('HH:MM')}
            </RegularText>
            <RegularText style={styles.date}>
              {dayjs(item.created).format('DD/MM/YYYY')}
            </RegularText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const NewsWidget: React.FC<Props> = ({ title, lists, style }) => {
  const { isLogin } = useAppSelector(state => state.auth);
  const navigation = useNavigation<any>();
  const onPress = (type: string): void => {
    if (type === 'News') {
      navigation.navigate('News', { screen: 'NewsScreen' });
    } else {
      navigation.navigate('HomeSettingScreen');
    }
  };
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.more, Layout.rowBetween]}>
        <SemiBoldText style={styles.title}>{title}</SemiBoldText>
        <View style={[Layout.row]}>
          <TouchableOpacity
            onPress={() => onPress('News')}
            activeOpacity={0.6}
            style={[Layout.center]}>
            <MediumText style={styles.moreText}>
              {i18next.t('Common.More')}
            </MediumText>
          </TouchableOpacity>
          {isLogin && (
            <TouchableOpacity
              onPress={() => onPress('Setting')}
              style={styles.settingIcon}>
              <SettingIcon color={Colors.grey5} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={[styles.widgetList, Layout.shadow]}>
        <FlatList
          data={lists}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <NewItem item={item} index={index} navigation={navigation} />
          )}
        />
      </View>
    </View>
  );
};

export default NewsWidget;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: kSpacing.kSpacing15,
  },
  widgetList: {
    borderRadius: 5,
    backgroundColor: Colors.white,
    paddingTop: kSpacing.kSpacing12,
    paddingBottom: kSpacing.kSpacing7,
  },
  more: {
    paddingHorizontal: kSpacing.kSpacing15,
    marginBottom: kSpacing.kSpacing10,
  },
  moreText: {
    fontSize: kTextSizes.mini,
    color: Colors.purple,
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
    width: kScaledSize(180),
    marginRight: kSpacing.kSpacing10,
  },
  thumbnail: {
    width: kScaledSize(180),
    height: kScaledSize(105),
    borderRadius: 5,
    overflow: 'hidden',
  },
  text: {
    marginVertical: kSpacing.kSpacing7,
    fontSize: kTextSizes.mini,
    color: Colors.black80,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.grey7,
  },
  date: {
    color: Colors.grey6,
    fontSize: kTextSizes.xmini,
  },
});
