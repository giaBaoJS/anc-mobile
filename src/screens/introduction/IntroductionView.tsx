import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
//Translate
import i18next from 'i18next';
//Components
import { Container } from '../../components/container';
import { Header } from '../../components/headers';
import { MediumText, RegularText, SemiBoldText } from '../../components/texts';
import { CommonImage } from '../../components/image';
//Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//Layout
import {
  kScaledSize,
  kSpacing,
  kTextSizes,
  kWidth,
} from '../../utils/Constants';
import Layout from '../../theme/Layout';
import Colors from '../../theme/Colors';
//Models
import { UserInfoField } from '../../models/Auth';
import { DUMMY_DATA } from '../../models/UserInfo';
import { AppLoader } from '../../components/loaders';
import ButtonError from '../../components/buttons/ButtonError';
interface Props {
  avatar: any;
  userRefer: any;
  qrCode: string;
  listReferred: any;
  isLoading: boolean;
  isError: boolean;
  fecthUserReferred: () => Promise<void>;
}

const IntroductionView = ({
  avatar,
  userRefer,
  listReferred,
  isLoading,
  isError,
  fecthUserReferred,
}: Props) => {
  return (
    <Container>
      <Header name={i18next.t('IntroductionScreen.TitleHeader')} />
      {isLoading ? (
        <AppLoader />
      ) : isError ? (
        <ButtonError onPress={fecthUserReferred} />
      ) : (
        <FlatList
          data={listReferred}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              <View style={styles.container}>
                <SemiBoldText style={styles.title}>
                  {i18next.t('IntroductionScreen.Title')}
                </SemiBoldText>
                <MediumText style={[styles.welcome, styles.fontCommon]}>
                  {i18next.t('IntroductionScreen.Welcome')}
                </MediumText>
                <TouchableOpacity style={[Layout.rowHCenter]}>
                  <RegularText style={[styles.rule, styles.fontCommon]}>
                    {i18next.t('IntroductionScreen.RuleIntroduction')}
                  </RegularText>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={kScaledSize(18)}
                  />
                </TouchableOpacity>
                <View style={[styles.groupTitle, Layout.rowHCenter]}>
                  <MaterialCommunityIcons
                    name="account-group"
                    size={kScaledSize(24)}
                    color={Colors.primary}
                    style={styles.iconGroup}
                  />
                  <SemiBoldText style={styles.referMyself}>
                    {i18next.t('IntroductionScreen.ReferMyself')}
                  </SemiBoldText>
                </View>
                {userRefer ? (
                  <View style={[Layout.colCenter]}>
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
                      </View>
                      <View style={styles.verify}>
                        <MaterialIcons
                          name="verified-user"
                          size={kScaledSize(20)}
                          color={Colors.green2}
                        />
                      </View>
                    </View>

                    <MediumText style={styles.name}>
                      {userRefer.display_name}
                    </MediumText>
                    <RegularText
                      numberOfLines={1}
                      style={
                        (styles.fontCommon,
                        { color: Colors.grey5, width: kScaledSize(200) })
                      }>
                      {i18next.t('IntroductionScreen.ReferID')}:
                      {userRefer.present_code}
                    </RegularText>
                  </View>
                ) : (
                  <View>
                    <RegularText>{i18next.t('Common.Empty')}</RegularText>
                  </View>
                )}
              </View>
              <View style={styles.line} />
              <View style={styles.container}>
                <View style={Layout.rowHCenter}>
                  <MaterialCommunityIcons
                    name="account-group"
                    size={kScaledSize(24)}
                    color={Colors.primary}
                    style={styles.iconGroup}
                  />
                  <SemiBoldText style={styles.referMyself}>
                    {i18next.t('IntroductionScreen.ReferOfMySelf')}
                  </SemiBoldText>
                </View>
                {listReferred.length === 0 && (
                  <RegularText style={{ marginTop: kScaledSize(21) }}>
                    {i18next.t('Common.Empty')}
                  </RegularText>
                )}
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <View style={[Layout.colCenter, styles.groupRefer]}>
              <View>
                <CommonImage
                  resize="cover"
                  wrapperStyle={styles.mini}
                  source={
                    item.avatar && item.avatar !== ''
                      ? item.avatar
                      : 'https://www.sibberhuuske.nl/wp-content/uploads/2016/10/default-avatar-300x300.png'
                  }
                />
              </View>
              <MediumText numberOfLines={1} style={styles.name2}>
                {item.name}
              </MediumText>
              <RegularText
                numberOfLines={1}
                style={[styles.textmini, { color: Colors.grey5 }]}>
                {i18next.t('IntroductionScreen.ReferID')}: {item.present_code}
              </RegularText>
            </View>
          )}
        />
      )}
    </Container>
  );
};

export default IntroductionView;

const styles = StyleSheet.create({
  container: {
    padding: kSpacing.kSpacing16,
  },
  title: {
    marginVertical: kSpacing.kSpacing20,
    fontSize: kTextSizes.xlarge,
  },
  name: {
    fontSize: kTextSizes.large,
    marginBottom: kSpacing.kSpacing5,
  },
  name2: {
    fontSize: kTextSizes.small,
    marginBottom: kSpacing.kSpacing5,
  },
  fontCommon: {
    fontSize: kTextSizes.mini,
  },
  welcome: {
    marginBottom: kSpacing.kSpacing15,
  },
  rule: {
    color: Colors.primary,
  },
  groupTitle: {
    marginTop: kScaledSize(30),
    marginBottom: kSpacing.kSpacing20,
  },
  iconGroup: {
    marginRight: kSpacing.kSpacing10,
  },
  referMyself: {
    fontSize: kTextSizes.medium,
  },
  textmini: {
    fontSize: kTextSizes.xmini,
  },
  userIcon: {
    width: kScaledSize(80),
    height: kScaledSize(80),
    marginBottom: kSpacing.kSpacing15,
    borderRadius: kScaledSize(45),
    overflow: 'hidden',
  },
  mini: {
    width: kScaledSize(40),
    height: kScaledSize(40),
    marginBottom: kSpacing.kSpacing10,
    borderRadius: kScaledSize(45),
    overflow: 'hidden',
  },
  line: {
    borderBottomColor: Colors.grey7,
    borderBottomWidth: 1,
    marginTop: kScaledSize(30),
    marginBottom: kScaledSize(15),
  },
  groupRefer: {
    marginBottom: kScaledSize(30),
    padding: kSpacing.kSpacing16,
    width: kWidth / 3,
  },
  wrapAvatar: {
    position: 'relative',
  },
  verify: {
    position: 'absolute',
    bottom: 14,
    right: 7,
  },
});
