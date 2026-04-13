import React, { forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
  type TextStyle,
} from 'react-native';

const FONT_FAMILY_BY_WEIGHT = {
  thin: 'Pretendard-Thin',
  extraLight: 'Pretendard-ExtraLight',
  light: 'Pretendard-Light',
  regular: 'Pretendard-Regular',
  medium: 'Pretendard-Medium',
  semiBold: 'Pretendard-SemiBold',
  bold: 'Pretendard-Bold',
  extraBold: 'Pretendard-ExtraBold',
} as const;

type FontWeightKey = keyof typeof FONT_FAMILY_BY_WEIGHT;

export type TextInputProps = RNTextInputProps & {
  weight?: FontWeightKey;
};

export const TextInput = forwardRef<RNTextInput, TextInputProps>(function TextInput(
  { weight = 'regular', style, placeholderTextColor = '#9CA3AF', ...rest },
  ref
) {
  const fontStyle: TextStyle = {
    fontFamily: FONT_FAMILY_BY_WEIGHT[weight],
  };

  return (
    <RNTextInput
      ref={ref}
      style={[fontStyle, style]}
      placeholderTextColor={placeholderTextColor}
      {...rest}
    />
  );
});
