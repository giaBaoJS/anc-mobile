import i18next from 'i18next';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Container } from '../../components/container';
import { Header } from '../../components/headers';
import { RegularText, SemiBoldText } from '../../components/texts';
import Colors from '../../theme/Colors';
import {
  FONT_FAMILY_REGULAR,
  kScaledSize,
  kSpacing,
  kTextSizes,
} from '../../utils/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Layout from '../../theme/Layout';
import DropDownPicker from 'react-native-dropdown-picker';
import { wrap } from 'lodash';
import { TextInput } from 'react-native-gesture-handler';
import { GradientButton } from '../../components/buttons';

interface Props {
  onNavigate: (endpoint: string) => void;
  openDropdown: boolean;
  setOpenDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  items: any;
  setItems: React.Dispatch<React.SetStateAction<any>>;
}

const SupportFeedBackView = ({
  onNavigate,
  openDropdown,
  setOpenDropDown,
  value,
  setValue,
  items,
  setItems,
}: Props) => {
  return (
    <Container>
      <Header name={i18next.t('SupportFeedBackScreen.Title')} />
      <View style={styles.container}>
        <SemiBoldText style={styles.title}>
          {i18next.t('SupportFeedBackScreen.Title')}
        </SemiBoldText>
        <RegularText style={[styles.textWarning, styles.fontCommon]}>
          {i18next.t('SupportFeedBackScreen.Welcome')}
        </RegularText>
        <RegularText style={[styles.message, styles.fontCommon]}>
          {i18next.t('SupportFeedBackScreen.Introduction')}
        </RegularText>
      </View>
      <View style={[styles.wrapContent, Layout.boxShadow]}>
        <View style={styles.container}>
          <DropDownPicker
            open={openDropdown}
            value={value}
            items={items}
            setOpen={setOpenDropDown}
            setValue={setValue}
            setItems={setItems}
            placeholder={i18next.t('SupportFeedBackScreen.ChooseTitle')}
            showTickIcon={false}
            dropDownContainerStyle={styles.modalDropdown}
            style={styles.dropdown}
            itemSeparatorStyle={{
              backgroundColor: 'grey',
            }}
          />
          <RegularText style={[styles.fontCommon, styles.describe]}>
            {i18next.t('SupportFeedBackScreen.Description')}
          </RegularText>
          <TextInput style={styles.input} multiline={true} numberOfLines={4} />
          <RegularText style={[styles.fontCommon, styles.describe]}>
            {i18next.t('SupportFeedBackScreen.AttachImage')}
          </RegularText>
          <TouchableOpacity
            style={[styles.pickImage, Layout.boxShadow, Layout.center]}>
            <Entypo name="image" color={Colors.black} size={kScaledSize(20)} />
            <AntDesign
              style={styles.plus}
              name="pluscircle"
              color={Colors.primary}
              size={kScaledSize(12)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={Layout.center}>
        <GradientButton
          style={styles.button}
          label={i18next.t('SupportFeedBackScreen.Send')}
          onPress={() => {}}
        />
      </View>
    </Container>
  );
};

export default SupportFeedBackView;

const styles = StyleSheet.create({
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
  fontStatus: {
    fontSize: kTextSizes.xmini,
    marginLeft: kSpacing.kSpacing12,
    marginRight: kSpacing.kSpacing5,
  },
  textWarning: {
    color: Colors.primary,
    marginBottom: kSpacing.kSpacing5,
  },
  message: {
    color: Colors.grey6,
    marginBottom: kScaledSize(20),
  },
  wrapContent: {
    backgroundColor: Colors.white,
  },
  dropdown: {
    borderWidth: 0,
    borderBottomWidth: 1,
    marginBottom: kScaledSize(25),
  },
  modalDropdown: {
    borderWidth: 0,
  },
  describe: {
    marginBottom: kSpacing.kSpacing10,
  },
  input: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: kTextSizes.body,
    width: '100%',
    height: kScaledSize(120),
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: kSpacing.kSpacing10,
    paddingVertical: 0,
    marginBottom: kSpacing.kSpacing20,
    color: Colors.black,
  },
  pickImage: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.grey7,
    width: kScaledSize(75),
    height: kScaledSize(50),
    position: 'relative',
  },
  plus: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  button: {
    paddingHorizontal: kScaledSize(50),
    marginTop: kScaledSize(30),
  },
});
