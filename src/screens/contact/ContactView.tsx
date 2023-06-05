import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
//Translate
import i18next from 'i18next';
//Components
import { Container, ScrollContainer } from '../../components/container';
import { MediumText, RegularText, SemiBoldText } from '../../components/texts';
import { ButtonPlus } from '../../components/buttons';
import { Header } from '../../components/headers';
import ButtonMinus from '../../components/buttons/ButtonMinus';
import { AppLoader } from '../../components/loaders';
//Layout
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
//Icons
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
//Model
import { EmailList, PhoneList } from '../../models/Contact';
import {
  ContactBottomSheet,
  SocialBottomSheet,
} from '../../components/bottomSheet';
import { UserInfoField } from '../../models/Auth';

interface Props {
  isLoading: boolean;
  bottomSheetRef: React.ForwardedRef<BottomSheetModal>;
  bottomSheetRef2: React.ForwardedRef<BottomSheetModal>;
  onShowSheet: (onShowPhone: boolean) => void;
  onShowSheetScocial: () => void;
  onDismiss: () => void;
  removeEmail: (index: number) => Promise<void>;
  removePhone: (index: number) => Promise<void>;
  isAddPhone: boolean;
  phoneList: PhoneList[];
  emailList: EmailList[];
  userInfo: UserInfoField | null;
}

const ContactView = ({
  isLoading,
  bottomSheetRef,
  bottomSheetRef2,
  onShowSheet,
  onShowSheetScocial,
  onDismiss,
  isAddPhone,
  phoneList,
  removeEmail,
  removePhone,
  emailList,
  userInfo,
}: Props) => {
  return (
    <Container>
      {isLoading && <AppLoader />}
      <Header name={i18next.t('ContactScreen.Title')} />
      <ScrollContainer contentStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <SemiBoldText style={styles.title}>
            {i18next.t('ContactScreen.Title')}
          </SemiBoldText>
          <RegularText style={[styles.textWarning, styles.fontCommon]}>
            {i18next.t('ContactScreen.Welcome')}
          </RegularText>
          <RegularText style={[styles.message, styles.fontMessage]}>
            {i18next.t('ContactScreen.Introduction')}
          </RegularText>
        </View>
        <View style={{ marginBottom: kSpacing.kSpacing15 }}>
          <TouchableOpacity
            onPress={() => onShowSheet(true)}
            style={[
              styles.groupButton,
              styles.spacing,
              Layout.rowBetween,
              Layout.boxShadow,
            ]}>
            <View style={[Layout.rowHCenter]}>
              <Entypo
                name="phone"
                color={Colors.primary}
                size={kScaledSize(24)}
              />
              <RegularText style={styles.textButton}>
                {i18next.t('ContactScreen.Phone')}
              </RegularText>
            </View>
            <ButtonPlus onPress={() => onShowSheet(true)} />
          </TouchableOpacity>
          <View style={[Layout.rowBetween, styles.spacing, styles.wrapContent]}>
            <RegularText style={[styles.colorText, styles.fontCommon]}>
              {i18next.t('ContactScreen.Default')}
            </RegularText>
            <MediumText style={styles.fontCommon}>0927 888 189</MediumText>
          </View>
          {phoneList &&
            phoneList?.map((item, index) => (
              <View
                key={index}
                style={[Layout.rowBetween, styles.spacing, styles.wrapContent]}>
                <RegularText style={[styles.colorText, styles.fontCommon]}>
                  {item?.title}:
                </RegularText>
                <View style={[Layout.rowHCenter]}>
                  <MediumText style={styles.fontCommon}>
                    {item?.phone}:
                  </MediumText>
                  <ButtonMinus
                    style={styles.itemsMargin}
                    onPress={() => removePhone(index)}
                  />
                </View>
              </View>
            ))}
          <ContactBottomSheet
            bottomSheetRef={bottomSheetRef}
            addPhone={true}
            onDismiss={onDismiss}
          />
        </View>
        <View style={{ marginBottom: kSpacing.kSpacing15 }}>
          <TouchableOpacity
            onPress={() => onShowSheet(false)}
            style={[
              styles.groupButton,
              styles.spacing,
              Layout.rowBetween,
              Layout.boxShadow,
            ]}>
            <View style={[Layout.rowHCenter]}>
              <Entypo
                name="mail"
                color={Colors.primary}
                size={kScaledSize(24)}
              />
              <RegularText style={styles.textButton}>
                {i18next.t('ContactScreen.Email')}
              </RegularText>
            </View>
            <ButtonPlus onPress={() => onShowSheet(false)} />
          </TouchableOpacity>
          {userInfo && Object.keys(userInfo.email).length !== 0 && (
            <View
              style={[Layout.rowBetween, styles.spacing, styles.wrapContent]}>
              <RegularText style={[styles.colorText, styles.fontCommon]}>
                {i18next.t('ContactScreen.Default')}
              </RegularText>
              <MediumText style={styles.fontCommon}>
                anhquan@gmail.com
              </MediumText>
            </View>
          )}
          {emailList &&
            emailList.map((item, index) => (
              <View
                key={index}
                style={[Layout.rowBetween, styles.spacing, styles.wrapContent]}>
                <RegularText style={[styles.colorText, styles.fontCommon]}>
                  {item?.title}:
                </RegularText>
                <View style={[Layout.rowHCenter]}>
                  <MediumText style={styles.fontCommon}>
                    {item?.email}
                  </MediumText>
                  <ButtonMinus
                    style={styles.itemsMargin}
                    onPress={() => removeEmail(index)}
                  />
                </View>
              </View>
            ))}
          <ContactBottomSheet
            bottomSheetRef={bottomSheetRef}
            addPhone={isAddPhone}
            onDismiss={onDismiss}
          />
        </View>
        <TouchableOpacity
          onPress={onShowSheetScocial}
          style={[
            styles.groupButton,
            styles.spacing,
            Layout.rowBetween,
            Layout.boxShadow,
          ]}>
          <View style={[Layout.rowHCenter]}>
            <Ionicons
              name="share-social"
              color={Colors.primary}
              size={kScaledSize(24)}
            />
            <RegularText style={styles.textButton}>
              {i18next.t('ContactScreen.Social')}
            </RegularText>
          </View>
          <ButtonPlus onPress={onShowSheetScocial} />
          <SocialBottomSheet bottomSheetRef={bottomSheetRef2} />
        </TouchableOpacity>
      </ScrollContainer>
    </Container>
  );
};

export default ContactView;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 0,
  },
  container: {
    padding: kSpacing.kSpacing16,
  },
  title: {
    marginVertical: kSpacing.kSpacing20,
    fontSize: kTextSizes.xlarge,
  },
  fontCommon: {
    fontSize: kTextSizes.mini,
  },
  fontMessage: {
    fontSize: kTextSizes.xmini,
  },
  textWarning: {
    color: Colors.primary,
    marginBottom: kSpacing.kSpacing5,
  },
  message: {
    color: Colors.grey6,
    marginBottom: kScaledSize(15),
  },
  groupButton: {
    backgroundColor: Colors.white,
  },
  spacing: {
    paddingVertical: kSpacing.kSpacing12,
    paddingHorizontal: kSpacing.kSpacing15,
  },
  textButton: {
    marginHorizontal: kSpacing.kSpacing12,
  },
  wrapContent: {
    borderBottomWidth: 1,
    borderColor: Colors.grey7,
  },
  colorText: {
    color: Colors.grey6,
  },
  itemsMargin: {
    marginLeft: kSpacing.kSpacing10,
  },
});
