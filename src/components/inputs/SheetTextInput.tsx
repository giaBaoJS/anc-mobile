import React from 'react';
import {
  ViewStyle,
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
} from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useController, UseControllerProps } from 'react-hook-form';
import {
  FONT_FAMILY_REGULAR,
  kScaledSize,
  kSpacing,
  kTextSizes,
} from '../../utils/Constants';
import RegularText from '../texts/RegularText';
import Colors from '../../theme/Colors';

interface Props {
  controller: UseControllerProps;
  placeholder?: string;
  errorText?: string;
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  inputProps?: TextInputProps;
}

const SheetTextInput = ({
  controller,
  placeholder,
  style,
  inputStyle,
  errorText,
  inputProps,
}: Props) => {
  const { field } = useController({
    control: controller.control,
    rules: controller.rules,
    defaultValue: '',
    name: controller.name,
  });

  return (
    <View style={[styles.container, style]}>
      <BottomSheetTextInput
        style={[
          styles.input,
          { borderColor: errorText ? Colors.error : Colors.grey6 },
          inputStyle,
        ]}
        value={field.value}
        onChangeText={field.onChange}
        placeholder={placeholder ? placeholder : ''}
        placeholderTextColor={Colors.holder}
        {...inputProps}
      />
      {errorText && <RegularText style={styles.error}>{errorText}</RegularText>}
    </View>
  );
};

export default SheetTextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: kSpacing.kSpacing18,
  },
  input: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: kTextSizes.body,
    height: kScaledSize(40),
    width: '100%',
    borderBottomWidth: 1,
    paddingHorizontal: kSpacing.kSpacing10,
    paddingVertical: 0,
    margin: 0,
    color: Colors.black,
  },
  error: {
    marginTop: kSpacing.kSpacing10,
    color: Colors.error,
    fontSize: kTextSizes.xmini,
  },
});
