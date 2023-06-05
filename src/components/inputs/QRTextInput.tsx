import React, { useState } from 'react';
import {
  ViewStyle,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { useController, UseControllerProps } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FONT_FAMILY_REGULAR,
  kScaledSize,
  kSpacing,
  kTextSizes,
} from '../../utils/Constants';
import RegularText from '../texts/RegularText';
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
import { hasNotch } from '../../utils/Common';
import { useNavigation } from '@react-navigation/core';
import { LoginStackNavigationProp } from '../../navigators/stacks/LoginStack';

interface Props {
  controller: UseControllerProps;
  placeholder?: string;
  style?: ViewStyle;
  inputProps?: TextInputProps;
}
const QRTextInput = ({ controller, placeholder, style, inputProps }: Props) => {
  const { field } = useController({
    control: controller.control,
    rules: controller.rules,
    defaultValue: '',
    name: controller.name,
  });
  const navigation = useNavigation<LoginStackNavigationProp>();
  const onNavigate = (): void => {
    navigation.navigate('QRScreen', { fromRoute: 'Register' });
  };
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.inputContainer,
          Layout.rowHCenter,
          style,
          { borderColor: Colors.grey6 },
        ]}>
        <TextInput
          style={[styles.input]}
          value={field.value}
          onChangeText={field.onChange}
          placeholder={placeholder ? placeholder : ''}
          placeholderTextColor={Colors.holder}
          {...inputProps}
        />
        <TouchableOpacity onPress={onNavigate}>
          <Icon
            name="qr-code-outline"
            size={hasNotch() ? kScaledSize(26) : kScaledSize(30)}
            color={Colors.grey6}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QRTextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: kSpacing.kSpacing18,
  },
  inputContainer: {
    height: kScaledSize(40),
    width: '100%',
    borderBottomWidth: 1,
    paddingHorizontal: kSpacing.kSpacing10,
  },
  input: {
    flex: 1,
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: kTextSizes.body,
    padding: 0,
    margin: 0,
    color: Colors.black,
  },
  error: {
    marginTop: kSpacing.kSpacing10,
    color: Colors.error,
    fontSize: kTextSizes.xmini,
  },
});
