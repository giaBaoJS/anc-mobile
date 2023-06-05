import React from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
//Translate
import i18next from 'i18next';
//Components
import { Container } from '../../components/container';
import { UserSettingHeader } from '../../components/headers';
import { MediumText, RegularText } from '../../components/texts';
//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Layouts
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
import {
  kScaledSize,
  kSpacing,
  kTextSizes,
  kWidth,
} from '../../utils/Constants';
import { copyToClipboard, hideEmail, hidePhone } from '../../utils/Common';
import {
  ListItemField,
  UserSettingField,
  USER_SETTING_LIST,
} from '../../models/UserInfo';
import { CommonImage } from '../../components/image';
import { Button } from '../../components/buttons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ImageBottomSheet } from '../../components/bottomSheet';
import { UserInfoField } from '../../models/Auth';
import { AppLoader } from '../../components/loaders';
import QRCode from 'react-native-qrcode-svg';
import { SecurityActive2FaField } from '../../models/Security';
import ButtonError from '../../components/buttons/ButtonError';

interface Props {
  userInfo: UserInfoField | null;
  isShow: boolean;
  isShowMail: boolean;
  onToggled: () => void;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowMail: React.Dispatch<React.SetStateAction<boolean>>;
  isEnabled: any;
  onActiveSecurity: () => void;
  fetchCopiedText: () => Promise<void>;
  onConfirmLogout: () => void;
  navigation: any;
  onShowSheet: () => void;
  bottomSheetRef: React.ForwardedRef<BottomSheetModal>;
  getImage: (val: any) => void;
  getStatus: (val: boolean) => void;
  avatar: any;
  newAvatar: boolean;
  onCancelImage: () => void;
  onSaveNewImage: () => void;
  isLoadingUser: boolean;
  isLoadingLogout: boolean;
  isError: boolean;
  onNavigateUserInfo: () => void;
  qrCode: string;
  active2Fa: SecurityActive2FaField;
  onGetInfo: () => Promise<void>;
}

interface ItemProps {
  items: UserSettingField;
  navigation: any;
}
interface ListItemDataProps {
  content: ListItemField;
  navigation: any;
}

const ListItemData = ({ content, navigation }: ListItemDataProps) => {
  const onNavigate = (name: string) => {
    navigation.navigate(`${name}Stack`);
  };
  const renderIcon = (): any => {
    switch (content?.type) {
      case 'InfoIdentity':
        return (
          <AntDesign
            name="idcard"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'UpAccount':
        return (
          <MaterialCommunityIcons
            name="account-arrow-up"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'Introduction':
        return (
          <MaterialCommunityIcons
            name="account-group"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'Contact':
        return (
          <MaterialCommunityIcons
            name="card-account-mail"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'SupportCenter':
        return (
          <MaterialIcons
            name="support-agent"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'Language':
        return (
          <Ionicons
            name="earth"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'Notification':
        return (
          <Ionicons
            name="notifications"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'DeviceConnect':
        return (
          <MaterialCommunityIcons
            name="block-helper"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'AddressBook':
        return (
          <AntDesign
            name="contacts"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'Ewallet':
        return (
          <Fontisto
            name="wallet"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'SettingPrivate':
        return (
          <MaterialCommunityIcons
            name="account-cog"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'IntroducePersonal':
        return (
          <MaterialCommunityIcons
            name="account-arrow-left"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'BlockUsers':
        return (
          <MaterialCommunityIcons
            name="account-cancel"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'BlockProjects':
        return (
          <Icon
            name="briefcase"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      default:
        null;
    }
  };
  return (
    <TouchableOpacity
      style={[Layout.rowBetween, styles.wrapList, styles.forPadding2]}
      onPress={() => onNavigate(content?.type)}>
      <View style={[Layout.rowHCenter]}>
        <View style={styles.wrapIcon}>{renderIcon()}</View>
        <RegularText style={styles.textList}>{content?.name}</RegularText>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={kScaledSize(22)} />
    </TouchableOpacity>
  );
};
const UserSettingItem = ({ items, navigation }: ItemProps) => {
  return (
    <View style={styles.forPadding}>
      {items.title !== '' && (
        <MediumText style={styles.wrapList}>{items.title}</MediumText>
      )}
      <FlatList
        data={items.listItem}
        keyExtractor={content => content.type}
        showsVerticalScrollIndicator={false}
        bounces={false}
        renderItem={({ item }) => (
          <ListItemData content={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

const UserSettingView = ({
  isLoadingUser,
  isLoadingLogout,
  userInfo,
  getImage,
  onToggled,
  avatar,
  isShow,
  isShowMail,
  setIsShow,
  setIsShowMail,
  isEnabled,
  onActiveSecurity,
  onConfirmLogout,
  fetchCopiedText,
  navigation,
  onShowSheet,
  bottomSheetRef,
  newAvatar,
  onCancelImage,
  onSaveNewImage,
  onNavigateUserInfo,
  active2Fa,
  qrCode,
  isError,
  onGetInfo,
}: Props) => {
  return (
    <Container>
      <UserSettingHeader />
      {isLoadingLogout && <AppLoader />}
      {isLoadingUser ? (
        <AppLoader />
      ) : isError ? (
        <ButtonError onPress={onGetInfo} />
      ) : (
        <View style={styles.groupList}>
          <FlatList
            data={USER_SETTING_LIST}
            keyExtractor={item => item.title}
            showsVerticalScrollIndicator={false}
            bounces={false}
            ListHeaderComponent={
              <View>
                <View style={[styles.userTop, Layout.colVCenter]}>
                  <View style={styles.wrapAvatar}>
                    <View>
                      <CommonImage
                        resize="cover"
                        wrapperStyle={styles.userIcon}
                        source={
                          avatar && avatar !== ''
                            ? avatar
                            : 'https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar-300x300.png'
                        }
                      />
                      <View style={[styles.cameraWraper, Layout.rowHCenter]}>
                        <TouchableOpacity
                          style={[styles.camera, Layout.center]}
                          onPress={onShowSheet}>
                          <FontAwesome
                            name="camera"
                            size={kScaledSize(11)}
                            color={Colors.black}
                            style={{
                              marginLeft:
                                Platform.OS === 'ios' ? kSpacing.kSpacing1 : 0,
                            }}
                          />
                        </TouchableOpacity>
                        {newAvatar ? (
                          <TouchableOpacity
                            onPress={onSaveNewImage}
                            style={[styles.saveButton, Layout.center]}>
                            <MediumText
                              allowFontScaling={false}
                              style={styles.saveText}>
                              {i18next.t('Button.Save')}
                            </MediumText>
                          </TouchableOpacity>
                        ) : (
                          <View
                            style={{
                              paddingVertical: kSpacing.kSpacing3,
                              width: kScaledSize(40),
                              marginLeft: kSpacing.kSpacing10,
                            }}
                          />
                        )}
                      </View>
                      {newAvatar && (
                        <TouchableOpacity
                          style={[
                            styles.camera,
                            Layout.rowCenter,
                            { position: 'absolute', top: 0, right: 0 },
                          ]}
                          onPress={onCancelImage}>
                          <Ionicons
                            name="close"
                            size={kScaledSize(14)}
                            color={Colors.black}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <ImageBottomSheet
                    getImage={getImage}
                    bottomSheetRef={bottomSheetRef}
                  />
                  <MediumText style={styles.userName}>
                    {userInfo?.display_name}
                  </MediumText>
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={onNavigateUserInfo}
                  style={[styles.userInfo, Layout.boxShadow]}>
                  <View style={[styles.userGeneral, Layout.rowBetween]}>
                    <MediumText style={(styles.fontInfo, styles.textGeneral)}>
                      {i18next.t('UserSettingScreen.GeneralInfo')}
                    </MediumText>
                    <View style={[Layout.rowHCenter, styles.groupVerify]}>
                      <MaterialIcons
                        name="verified-user"
                        size={kScaledSize(16)}
                        color={Colors.green2}
                      />
                      <MediumText style={styles.verify}>
                        {i18next.t('UserSettingScreen.Verify')}
                      </MediumText>
                    </View>
                  </View>
                  <View style={[Layout.rowBetween]}>
                    <View style={styles.infoLeft}>
                      {/* <View style={styles.wrapContent}>
                        <TouchableOpacity
                          onPress={() => copyToClipboard(userInfo?.username)}
                          style={[
                            Layout.rowVCenter,
                            { justifyContent: 'flex-start' },
                          ]}>
                          <RegularText
                            style={[styles.fontInfo, styles.account]}>
                            {i18next.t('UserSettingScreen.IdAccount')}
                          </RegularText>
                          <RegularText
                            numberOfLines={1}
                            style={[styles.fontInfo, styles.account]}>
                            {userInfo?.username}
                            {'  '}
                            <Ionicons
                              style={[styles.iconCopy]}
                              name="copy"
                              size={kScaledSize(12)}
                              color={Colors.navy}
                            />
                          </RegularText>
                        </TouchableOpacity>
                      </View> */}
                      <View style={[styles.wrapContent, Layout.rowBetween]}>
                        <RegularText style={[styles.fontInfo, styles.common]}>
                          {i18next.t('UserSettingScreen.Mail')}
                          {userInfo?.email.email
                            ? !isShowMail
                              ? hideEmail(userInfo?.email.email)
                              : userInfo?.email.email
                            : i18next.t('Common.Empty')}
                        </RegularText>
                        {userInfo?.email.email && (
                          <TouchableOpacity
                            onPress={() => setIsShowMail(prev => !prev)}>
                            <Icon
                              name={isShowMail ? 'eye' : 'eye-with-line'}
                              size={kScaledSize(13)}
                              color={Colors.grey6}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                      <View style={[styles.wrapContent, Layout.rowBetween]}>
                        <RegularText style={[styles.fontInfo, styles.common]}>
                          {i18next.t('UserSettingScreen.Phone')}
                          {!isShow
                            ? hidePhone(`0${userInfo?.phone.phone}`)
                            : `0${userInfo?.phone.phone}`}
                        </RegularText>
                        <TouchableOpacity
                          onPress={() => setIsShow(prev => !prev)}>
                          <Icon
                            name={isShow ? 'eye' : 'eye-with-line'}
                            size={kScaledSize(13)}
                            color={Colors.grey6}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.wrapContent, Layout.rowBetween]}>
                        <MediumText style={[styles.fontInfo, styles.common]}>
                          {i18next.t('UserSettingScreen.Security')}
                          <MediumText
                            style={[
                              styles.fontInfo,
                              {
                                color:
                                  (active2Fa?.authenticate_by_google &&
                                    active2Fa?.authenticate_by_sms) ||
                                  active2Fa?.authenticate_by_google ||
                                  active2Fa?.authenticate_by_sms
                                    ? Colors.primary
                                    : Colors.grey6,
                              },
                            ]}>
                            {i18next.t(
                              `UserSettingScreen.${
                                (active2Fa?.authenticate_by_google &&
                                  active2Fa?.authenticate_by_sms) ||
                                active2Fa?.authenticate_by_google ||
                                active2Fa?.authenticate_by_sms
                                  ? 'Active'
                                  : 'Deactive'
                              }`,
                            )}
                          </MediumText>
                        </MediumText>
                      </View>
                    </View>
                    <View style={styles.wrapImage}>
                      <QRCode size={72} value={qrCode} />
                    </View>
                  </View>
                  <View
                    style={[
                      Layout.rowBetween,
                      { marginVertical: kSpacing.kSpacing8 },
                    ]}>
                    <TouchableOpacity style={[Layout.rowHCenter]}>
                      <MaterialCommunityIcons
                        name="history"
                        size={kScaledSize(12)}
                        color={Colors.navy}
                      />
                      <MediumText
                        style={[
                          styles.fontInfo,
                          styles.history,
                          styles.account,
                        ]}>
                        {i18next.t('UserSettingScreen.LoginHistory')}
                      </MediumText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => copyToClipboard(qrCode)}
                      style={[Layout.rowVCenter]}>
                      <MediumText
                        style={[styles.fontInfo, styles.textRefferalId]}>
                        {i18next.t('UserSettingScreen.ReferralId')}:{' '}
                      </MediumText>
                      <MediumText
                        numberOfLines={1}
                        style={[
                          styles.fontInfo,
                          styles.textRefferalId,
                          { width: kScaledSize(70) },
                        ]}>
                        {qrCode}
                      </MediumText>
                      <Ionicons
                        style={[styles.iconCopy]}
                        name="copy"
                        size={kScaledSize(12)}
                        color={Colors.purple2}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            }
            ListFooterComponent={
              <View>
                <View style={styles.line} />
                <RegularText
                  style={[styles.fontInfo, styles.common, Layout.textCenter]}>
                  {i18next.t('UserSettingScreen.Version')}: v2.0
                </RegularText>
                <View style={[Layout.center]}>
                  <Button
                    title={i18next.t('UserSettingScreen.Logout')}
                    onPress={onConfirmLogout}
                    style={styles.buttonOut}
                  />
                </View>
              </View>
            }
            renderItem={({ item }) => (
              <UserSettingItem items={item} navigation={navigation} />
            )}
          />
        </View>
      )}
    </Container>
  );
};

export default UserSettingView;

const styles = StyleSheet.create({
  userTop: {
    backgroundColor: Colors.primary,
    height: kScaledSize(180),
    borderBottomLeftRadius: kScaledSize(30),
    borderBottomRightRadius: kScaledSize(30),
    zIndex: 0,
  },
  groupVerify: {
    borderWidth: 1,
    borderRadius: kScaledSize(30),
    borderColor: Colors.green2,
    paddingVertical: kSpacing.kSpacing5,
    paddingHorizontal: kSpacing.kSpacing6,
    backgroundColor: 'rgba(17, 187, 141,0.1)',
  },
  verify: {
    marginLeft: kSpacing.kSpacing4,
    fontSize: kTextSizes.xmini,
    color: Colors.green2,
  },
  userIcon: {
    width: kScaledSize(90),
    height: kScaledSize(90),
    marginBottom: kSpacing.kSpacing5,
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: kScaledSize(45),
    overflow: 'hidden',
  },
  userName: {
    marginTop: kSpacing.kSpacing10,
    fontSize: kTextSizes.large,
    color: Colors.white,
  },
  userInfo: {
    borderRadius: kSpacing.kSpacing20,
    paddingHorizontal: kSpacing.kSpacing15,
    backgroundColor: Colors.white,
    marginHorizontal: kSpacing.kSpacing20,
    transform: [{ translateY: kScaledSize(-35) }],
    zIndex: 999,
  },
  userGeneral: {
    marginTop: kSpacing.kSpacing14,
    paddingBottom: kSpacing.kSpacing10,
    borderBottomWidth: 1,
    borderColor: Colors.grey6,
  },
  textGeneral: {
    color: Colors.primary,
  },
  fontInfo: {
    fontSize: kTextSizes.mini,
  },
  infoLeft: {
    flex: 1,
    marginRight: kSpacing.kSpacing10,
  },
  account: {
    color: Colors.navy,
  },
  wrapContent: {
    paddingVertical: kSpacing.kSpacing6,
    borderBottomWidth: 1,
    borderColor: Colors.grey7,
  },
  common: {
    color: Colors.grey6,
  },
  wrapImage: {
    alignSelf: 'flex-end',
  },
  imageQR: {
    width: kScaledSize(72),
    height: kScaledSize(72),
  },
  iconCopy: {
    marginLeft: kSpacing.kSpacing4,
  },
  textRefferalId: {
    color: Colors.purple2,
  },
  groupList: {
    flex: 1,
  },
  forPadding: {
    paddingHorizontal: kSpacing.kSpacing16,
  },
  wrapList: {
    marginBottom: kScaledSize(25),
  },
  forPadding2: {
    paddingHorizontal: kSpacing.kSpacing3,
  },
  textList: {
    marginLeft: kSpacing.kSpacing10,
  },
  wrapIcon: {
    width: kScaledSize(25),
  },
  line: {
    borderBottomColor: Colors.grey7,
    borderBottomWidth: 1,
    marginTop: kSpacing.kSpacing10,
    marginBottom: kSpacing.kSpacing15,
  },
  buttonOut: {
    marginVertical: kScaledSize(20),
    borderRadius: 7,
    backgroundColor: Colors.warning,
    paddingHorizontal: kScaledSize(50),
  },
  wrapAvatar: {
    position: 'relative',
  },
  cameraWraper: {
    position: 'absolute',
    top: kScaledSize(62),
    right: kScaledSize(-50),
  },
  camera: {
    width: kScaledSize(26),
    height: kScaledSize(26),
    borderRadius: kScaledSize(13),
    backgroundColor: Colors.grey7,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  buttonSaveImage: {
    marginTop: kSpacing.kSpacing5,
    borderRadius: 7,
    backgroundColor: Colors.grey6,
  },
  saveButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.white,
    paddingVertical: kSpacing.kSpacing3,
    width: kScaledSize(40),
    marginLeft: kSpacing.kSpacing10,
  },
  saveText: {
    fontSize: kTextSizes.mini,
    color: Colors.white,
  },
  history: {
    marginHorizontal: kSpacing.kSpacing4,
  },
});
