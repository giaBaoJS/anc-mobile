import React from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// QR code
import QRCode from 'react-native-qrcode-svg';
//Translate
import i18next from 'i18next';
//Components
import { Container } from '../../components/container';
import { Header } from '../../components/headers';
import { CommonImage } from '../../components/image';
import { MediumText, RegularText, SemiBoldText } from '../../components/texts';
//Layout
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
import {
  kScaledSize,
  kSpacing,
  kTextSizes,
  kWidth,
} from '../../utils/Constants';
//Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
// Type
import { UserInfoField } from '../../models/Auth';
// Common
import { copyToClipboard, formatDateMonth } from '../../utils/Common';
import { ListItemField, USER_INFO_LIST } from '../../models/UserInfo';
// Button Sheet
import { ShareBottomSheet } from '../../components/bottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
//Toast
import Toast from 'react-native-toast-message';
import { AppLoader } from '../../components/loaders';
import { Controller } from 'react-hook-form';
import Dialog from 'react-native-dialog';

interface Props {
  qrCode: string;
  userInfo: UserInfoField | null;
  navigation: any;
  isShow: boolean;
  onToggleEyes: () => void;
  onShowSheet: () => void;
  onCancelEdit: () => void;
  bottomSheetRef: React.ForwardedRef<BottomSheetModal>;
  viewRef: React.MutableRefObject<any>;
  getPathQr: any;
  onShare: (type: string) => Promise<void>;
  isLoadingSave: boolean;
  userRefer: any;
  isEdit: boolean;
  control: any;
  handleSubmit: any;
  errors: any;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  updateDisPlayName: (data: any) => Promise<void>;
}
interface ListItemDataProps {
  item: ListItemField;
  navigation: any;
}
const UserInfoItem = ({ item, navigation }: ListItemDataProps) => {
  const onNavigate = (name: string) => {
    navigation.navigate(`${name}Stack`);
  };
  const renderIcon = (): any => {
    switch (item.type) {
      case 'ChangePass':
        return (
          <Fontisto
            name="locked"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'FactorAuthentication':
        return (
          <MaterialCommunityIcons
            name="shield-account"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'LoginMethod':
        return (
          <Icon name="login" size={kScaledSize(20)} color={Colors.primary} />
        );
      case 'SetPin':
        return (
          <Ionicons
            name="keypad-sharp"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'SetLogin':
        return (
          <MaterialCommunityIcons
            name="account-cog"
            size={kScaledSize(20)}
            color={Colors.primary}
          />
        );
      case 'History':
        return (
          <MaterialCommunityIcons
            name="history"
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
      style={[Layout.rowBetween, styles.wrapList, styles.forPadding]}
      onPress={() => onNavigate(item.type)}>
      <View style={[Layout.rowHCenter]}>
        <View style={styles.wrapIcon}>{renderIcon()}</View>
        <RegularText style={styles.textList}>{item.name}</RegularText>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={kScaledSize(22)} />
    </TouchableOpacity>
  );
};

const UserInfoView = ({
  qrCode,
  viewRef,
  userInfo,
  isShow,
  bottomSheetRef,
  onToggleEyes,
  onShowSheet,
  navigation,
  getPathQr,
  onShare,
  isLoadingSave,
  userRefer,
  isEdit,
  control,
  handleSubmit,
  errors,
  setIsEdit,
  onCancelEdit,
  updateDisPlayName,
}: Props) => {
  return (
    <Container>
      {isLoadingSave && <AppLoader />}
      <Header name={i18next.t('UserInfoScreen.TitleHeader')} />
      <View style={Layout.fill}>
        <FlatList
          data={USER_INFO_LIST}
          keyExtractor={item => item.type}
          showsVerticalScrollIndicator={false}
          bounces={false}
          ListHeaderComponent={
            <View>
              <View style={[styles.userTop, Layout.colVCenter]}>
                <View
                  style={styles.qrCodeWrapper}
                  collapsable={false}
                  ref={ref => (viewRef.current = ref)}>
                  <QRCode value={qrCode} size={kScaledSize(160)} />
                </View>
                <TouchableOpacity
                  onPress={() => copyToClipboard(qrCode)}
                  style={[Layout.rowCenter, styles.presentId]}>
                  <MediumText style={styles.userName} numberOfLines={1}>
                    {i18next.t('UserInfoScreen.PresenterId')}: {qrCode}
                  </MediumText>
                  <Ionicons
                    style={[styles.iconCopy]}
                    name="copy"
                    size={kScaledSize(12)}
                    color={Colors.grey6}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.groupButtons}>
                <View style={[Layout.rowCenter]}>
                  <TouchableOpacity
                    style={styles.buttonSpace}
                    onPress={getPathQr}>
                    <Icon
                      name="image"
                      size={kScaledSize(16)}
                      color={Colors.white}
                      style={styles.center}
                    />
                    <RegularText style={styles.textWhite}>
                      {i18next.t('UserInfoScreen.DownloadQR')}
                    </RegularText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onShowSheet}>
                    <Icon
                      name="share"
                      size={kScaledSize(16)}
                      color={Colors.white}
                      style={styles.center}
                    />
                    <RegularText style={styles.textWhite}>
                      {i18next.t('UserInfoScreen.ShareCode')}
                    </RegularText>
                  </TouchableOpacity>
                  <ShareBottomSheet
                    bottomSheetRef={bottomSheetRef}
                    onShare={onShare}
                  />
                </View>
              </View>
              <View style={[styles.wrapInfo, Layout.boxShadow]}>
                <View style={[Layout.rowBetween, styles.groupContent]}>
                  <RegularText>
                    {i18next.t('UserInfoScreen.IdACcount')}
                  </RegularText>
                  <View style={[Layout.rowHCenter, Layout.fill]}>
                    <SemiBoldText style={styles.infoText}>
                      {isShow ? userInfo?.username : '******'}
                    </SemiBoldText>
                    <Icon
                      name={isShow ? 'eye' : 'eye-with-line'}
                      size={kScaledSize(12)}
                      color={Colors.primary}
                      style={[styles.iconCopy]}
                      onPress={onToggleEyes}
                    />
                  </View>
                </View>
                <View style={[Layout.rowBetween, styles.groupContent]}>
                  <RegularText>{i18next.t('UserInfoScreen.Name')}</RegularText>
                  <View>
                    <Dialog.Container visible={isEdit}>
                      <Dialog.Title>Sửa tên hiển thị</Dialog.Title>
                      <Dialog.Description>
                        Vui lòng nhập tên mới
                      </Dialog.Description>
                      <Controller
                        defaultValue={userInfo?.display_name}
                        name="name"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <TextInput
                            style={[
                              styles.input,
                              Platform.OS === 'android' && styles.inputAndroid,
                              errors?.name?.message && styles.inputError,
                            ]}
                            onChangeText={(text: string) => onChange(text)}
                            value={value}
                            placeholder={i18next.t(
                              'UserInfoScreen.DisplayName',
                            )}
                          />
                        )}
                        rules={{
                          required: {
                            value: true,
                            message: i18next.t('Validator.Require'),
                          },
                          validate: value =>
                            value.length >= 8 ||
                            `${i18next.t('Validator.Min').replace('$5', '8')}`,
                        }}
                      />
                      {errors?.name?.message && (
                        <RegularText style={styles.errorText}>
                          {errors?.name?.message}
                        </RegularText>
                      )}
                      <Dialog.Button
                        label={i18next.t('Button.Cancel')}
                        onPress={onCancelEdit}
                      />
                      <Dialog.Button
                        label={i18next.t('Button.Save')}
                        onPress={handleSubmit(updateDisPlayName)}
                      />
                    </Dialog.Container>
                  </View>
                  <View style={[Layout.rowHCenter, Layout.fill]}>
                    <SemiBoldText style={styles.infoText}>
                      {userInfo?.display_name}
                    </SemiBoldText>
                    <TouchableOpacity onPress={() => setIsEdit(true)}>
                      <AntDesign
                        name={'edit'}
                        size={kScaledSize(12)}
                        color={Colors.black}
                        style={[styles.iconCopy]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={[Layout.rowBetween, styles.groupContent]}>
                  <RegularText>
                    {i18next.t('UserInfoScreen.AccountGoogle')}
                  </RegularText>
                  <View style={[Layout.rowHCenter, styles.groupRight]}>
                    <SemiBoldText style={[styles.infoText]}>
                      {userInfo?.google_account.google_email
                        ? userInfo?.google_account.google_email
                        : i18next.t('Common.Empty')}
                    </SemiBoldText>
                  </View>
                </View>
                <View style={[Layout.rowBetween, styles.groupContent]}>
                  <RegularText>
                    {i18next.t('UserInfoScreen.AccountApple')}
                  </RegularText>
                  <View style={[Layout.rowHCenter, styles.groupRight]}>
                    <SemiBoldText style={[styles.infoText]}>
                      {userInfo?.apple_account.apple_email
                        ? userInfo?.apple_account.apple_email
                        : i18next.t('Common.Empty')}
                    </SemiBoldText>
                  </View>
                </View>
                <View style={[Layout.rowBetween, styles.groupContent]}>
                  <RegularText>
                    {i18next.t('UserInfoScreen.AccountRefer')}
                  </RegularText>
                  <View style={[Layout.rowHCenter]}>
                    <SemiBoldText>
                      {userRefer ? userRefer?.name : i18next.t('Common.Empty')}
                    </SemiBoldText>
                    {userRefer ? (
                      <CommonImage
                        resize="cover"
                        wrapperStyle={styles.userIcon}
                        source={
                          userRefer.avatar !== ''
                            ? userRefer.avatar
                            : 'https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar-300x300.png'
                        }
                      />
                    ) : null}
                  </View>
                </View>
                <View style={[Layout.rowBetween]}>
                  <RegularText>
                    {i18next.t('UserInfoScreen.JoinDate')}
                  </RegularText>
                  <View style={[Layout.rowHCenter, styles.groupRight]}>
                    <SemiBoldText style={[styles.infoText]}>
                      {userInfo &&
                        formatDateMonth(
                          new Date(
                            userInfo.registration_date.replace(' ', 'T'),
                          ),
                        )}
                    </SemiBoldText>
                  </View>
                </View>
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <UserInfoItem item={item} navigation={navigation} />
          )}
        />
      </View>
      <Toast />
    </Container>
  );
};

export default UserInfoView;

const styles = StyleSheet.create({
  wrapContainer: {
    padding: 0,
  },
  userTop: {
    backgroundColor: Colors.green10,
    paddingTop: kScaledSize(25),
    paddingBottom: kSpacing.kSpacing15,
    zIndex: 0,
  },
  userIcon: {
    width: kScaledSize(16),
    height: kScaledSize(16),
    marginLeft: kSpacing.kSpacing5,
    borderRadius: kScaledSize(45),
    overflow: 'hidden',
  },
  userName: {
    color: Colors.purple2,
    width: kWidth / 2,
  },
  qrCodeWrapper: {
    borderWidth: 10,
    borderColor: Colors.white,
  },
  wrapInfo: {
    backgroundColor: Colors.white,
    borderRadius: kSpacing.kSpacing5,
    paddingVertical: kSpacing.kSpacing20,
    paddingHorizontal: kSpacing.kSpacing15,
    marginBottom: kSpacing.kSpacing20,
  },
  iconCopy: {
    marginLeft: kSpacing.kSpacing7,
  },
  groupContent: {
    marginBottom: kScaledSize(23),
  },
  groupRight: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: kScaledSize(23),
  },
  infoText: {
    flex: 1,
    textAlign: 'right',
  },
  forPadding: {
    paddingHorizontal: kSpacing.kSpacing16,
  },
  wrapList: {
    marginBottom: kScaledSize(25),
  },
  textList: {
    marginLeft: kSpacing.kSpacing10,
  },
  wrapIcon: {
    width: kScaledSize(25),
  },
  groupButtons: {
    backgroundColor: Colors.primary,
    paddingVertical: kSpacing.kSpacing10,
    marginBottom: kSpacing.kSpacing20,
  },
  textWhite: {
    color: Colors.white,
    fontSize: kTextSizes.xxmini,
  },
  center: {
    alignSelf: 'center',
    marginBottom: kSpacing.kSpacing5,
  },
  buttonSpace: {
    marginRight: kScaledSize(50),
  },
  presentId: {
    marginTop: kSpacing.kSpacing10,
    marginHorizontal: kSpacing.kSpacing10,
  },
  errorText: {
    color: 'red',
    marginHorizontal: kSpacing.kSpacing15,
    fontSize: kTextSizes.mini,
    marginVertical: kSpacing.kSpacing5,
  },
  input: {
    marginHorizontal: kSpacing.kSpacing15,
    padding: kSpacing.kSpacing5,
    borderWidth: 1,
    borderColor: Colors.grey6,
    marginBottom: kSpacing.kSpacing15,
  },
  inputAndroid: {
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  inputError: {
    marginBottom: 0,
  },
});
