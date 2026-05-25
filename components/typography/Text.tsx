import React, { forwardRef } from "react";
import {
  Text as RNText,
  type TextProps as RNTextProps,
  type TextStyle,
} from "react-native";

const FONT_FAMILY_BY_WEIGHT = {
  thin: "Pretendard-Thin",
  extraLight: "Pretendard-ExtraLight",
  light: "Pretendard-Light",
  regular: "Pretendard-Regular",
  medium: "Pretendard-Medium",
  semiBold: "Pretendard-SemiBold",
  bold: "Pretendard-Bold",
  extraBold: "Pretendard-ExtraBold",
} as const;

type FontWeightKey = keyof typeof FONT_FAMILY_BY_WEIGHT;

export type TextProps = RNTextProps & {
  weight?: FontWeightKey;
};

export const Text = forwardRef<RNText, TextProps>(function Text(
  { weight = "medium", style, ...rest },
  ref
) {
  const fontStyle: TextStyle = {
    fontFamily: FONT_FAMILY_BY_WEIGHT[weight as FontWeightKey],
  };

  return (
    <RNText
      ref={ref}
      style={[fontStyle, style]}
      {...rest}
    />
  );
});
