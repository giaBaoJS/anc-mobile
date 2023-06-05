import React, { useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { debounce } from 'lodash';
// Theme
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
// Icons
import Fontisto from 'react-native-vector-icons/Fontisto';
// Constants
import {
  FONT_FAMILY_REGULAR,
  kScaledSize,
  kSpacing,
  kTextSizes,
} from '../../utils/Constants';
import i18next from 'i18next';
import { MediumText } from '../texts';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface Props {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  style?: ViewStyle;
}

const Header = ({ setSearchText, style }: Props) => {
  const ref = useRef<any>(null);
  const opacity = useSharedValue(0);
  const width = useSharedValue(0);
  const translateX = useSharedValue(kScaledSize(40));

  const onBlur = (): void => {
    opacity.value = withTiming(0, { duration: 200 });
    translateX.value = withTiming(kScaledSize(40));
    width.value = withDelay(300, withTiming(0));
  };
  const onFocus = (): void => {
    width.value = withTiming(30);
    opacity.value = withDelay(150, withTiming(1));
    translateX.value = withDelay(150, withTiming(0));
  };
  const onCancel = (): void => {
    ref.current?.blur();
    ref.current?.clear();
    setSearchText('');
  };
  const cancelStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
      width: width.value,
    };
  });
  const onFilter = useCallback(
    debounce((value: string) => {
      setSearchText(value);
    }, 350),
    [],
  );

  return (
    <View style={[styles.container, Layout.rowCenter, style]}>
      <View style={[styles.inputContainer, Layout.rowHCenter]}>
        <Fontisto name="search" size={kScaledSize(16)} color={Colors.grey6} />
        <TextInput
          ref={ref}
          allowFontScaling={false}
          style={styles.input}
          placeholderTextColor={Colors.holder}
          placeholder={i18next.t('Input.Search')}
          onChangeText={onFilter}
          onBlur={onBlur}
          onFocus={onFocus}
          clearButtonMode="always"
        />
      </View>
      <AnimatedTouchable
        activeOpacity={0.5}
        onPress={onCancel}
        style={[styles.cancel, cancelStyle]}>
        <MediumText allowFontScaling={false} style={[Layout.textPrimary]}>
          {i18next.t('Button.Cancel')}
        </MediumText>
      </AnimatedTouchable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: kScaledSize(100),
    paddingLeft: kSpacing.kSpacing16,
    paddingRight: kSpacing.kSpacing10,
    backgroundColor: Colors.background,
  },
  wrapper: {
    marginHorizontal: kSpacing.kSpacing8,
  },
  inputContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.primary,
    height: kScaledSize(40),
    backgroundColor: Colors.light_grey,
    paddingHorizontal: kSpacing.kSpacing10,
  },
  input: {
    flex: 1,
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: kTextSizes.body,
    color: Colors.black,
    marginLeft: kSpacing.kSpacing6,
    paddingVertical: 0,
    margin: 0,
  },
  cancel: {
    marginLeft: kSpacing.kSpacing10,
    alignItems: 'center',
  },
});
