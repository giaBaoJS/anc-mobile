import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
// Redux
import { useAppSelector } from '../../hooks/RTKHooks';
// Theme
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
// Constants
import {
  kHeaderHeight,
  kScaledSize,
  kSpacing,
  kTextSizes,
} from '../../utils/Constants';
import { CommonImage } from '../image';
import MediumText from '../texts/MediumText';
import RegularText from '../texts/RegularText';
import { hasNotch, getCurrentTime } from '../../utils/Common';
import i18next from 'i18next';

const HomeHeader: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isLogin, userInfo } = useAppSelector(state => state.auth);
  const onPressUser = (): void => {
    // navigation.navigate('UserSettingStack');
    if (isLogin) {
      navigation.navigate('UserSettingStack');
    } else {
      navigation.navigate('LoginStack');
    }
  };
  const onPress = (name: string): void => {
    navigation.navigate(name);
  };
  return (
    <View style={[styles.container, Layout.row]}>
      <View style={[Layout.row, styles.profile]}>
        <TouchableOpacity onPress={onPressUser}>
          {isLogin && userInfo?.avatar ? (
            <CommonImage
              source={userInfo?.avatar}
              wrapperStyle={styles.userCircle}
              style={[
                styles.userCircle,
                { borderWidth: 1, borderColor: Colors.white },
              ]}
              resize="cover"
            />
          ) : (
            <View
              style={[
                styles.userCircle,
                Layout.center,
                {
                  backgroundColor: Colors.background,
                },
              ]}>
              <Image
                source={require('../../assets/images/icon-user.png')}
                style={styles.userIcon}
              />
            </View>
          )}
        </TouchableOpacity>
        {isLogin && userInfo && (
          <View style={styles.textContainer}>
            <MediumText
              allowFontScaling={false}
              style={[styles.text, { fontSize: kTextSizes.small }]}>
              Chào {userInfo.display_name}!
            </MediumText>
            <RegularText
              allowFontScaling={false}
              numberOfLines={1}
              style={[
                styles.text,
                { marginTop: Platform.OS === 'ios' ? 2 : 0 },
              ]}>
              {i18next.t('Common.Greeting')} {i18next.t('Common.You')}
              {getCurrentTime()} {i18next.t('Common.GoodDay')}
            </RegularText>
          </View>
        )}
      </View>
      <View style={[styles.bottomGroup, Layout.rowCenter]}>
        <TouchableOpacity onPress={() => onPress('QRScreen')}>
          <Ionicons
            name="qr-code-outline"
            size={kScaledSize(25)}
            color={Colors.white}
            style={styles.icon}
          />
        </TouchableOpacity>
        {isLogin && (
          <TouchableOpacity onPress={() => onPress('NotificationScreen')}>
            <Ionicons
              name="notifications"
              size={kScaledSize(25)}
              color={Colors.white}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => onPress('HambugerStack')}>
          <AntDesign
            name="menu-fold"
            size={kScaledSize(25)}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    height: kHeaderHeight,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: Colors.primary,
    paddingBottom: kScaledSize(10),
    paddingHorizontal: kScaledSize(16),
    borderBottomWidth: 0.3,
    borderColor: Colors.grey10,
  },
  profile: {
    flex: 1,
    alignItems: 'flex-end',
  },
  userCircle: {
    width: kScaledSize(32),
    height: kScaledSize(32),
    borderRadius: kScaledSize(20),
  },
  userIcon: {
    resizeMode: 'contain',
    width: kScaledSize(18),
    marginRight: kScaledSize(0.5),
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  bottomGroup: {},
  icon: {
    marginRight: kSpacing.kSpacing5,
  },
  textContainer: {
    justifyContent: 'flex-end',
    marginHorizontal: 10,
  },
  text: {
    fontSize: kTextSizes.mini,
    color: Colors.white,
    lineHeight: Platform.OS === 'ios' && !hasNotch() ? 12 : 15,
  },
});
