import { PixelRatio, StyleSheet } from "react-native";

import { colorStyle } from "../constants/colors";
import type { ScaleFns } from "../constants/create-scale-api";
import { FIGMA_BASE_HEIGHT } from "../constants/scale";

export const SPLASH_DURATION_MS = 2500;

const round = (value: number) => PixelRatio.roundToNearestPixel(value);

const createVerticalScale = (screenHeight: number) => (size: number) =>
  round(size * (screenHeight / FIGMA_BASE_HEIGHT));

export const createSplashStyles = (
  { hs, fs }: ScaleFns,
  screenHeight: number
) => {
  const vs = createVerticalScale(screenHeight);
  const characterScale = 0.75;

  return StyleSheet.create({
    root: {
      flex: 1,
      overflow: "hidden",
    },
    characterBlue: {
      position: "absolute",
      left: hs(186),
      top: vs(20),
      width: hs(421.4 * characterScale),
      height: vs(432.48 * characterScale),
      transform: [{ rotate: "-67.2deg" }],
    },
    characterYellow: {
      position: "absolute",
      left: hs(-180),
      top: vs(435),
      width: hs(611.55 * characterScale),
      height: vs(599.82 * characterScale),
      transform: [{ rotate: "30.44deg" }],
    },
    logo: {
      position: "absolute",
      left: hs(147),
      top: vs(335),
      width: hs(99),
      height: vs(182),
    },
    logoText: {
      fontFamily: "THE-POSTER-FONT-DEMO",
      fontSize: fs(130.15),
      lineHeight: vs(182),
      letterSpacing: fs(-5.21),
      color: colorStyle.Sub1,
      textShadowColor: "#BEC5D9",
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 8,
    },
  });
};
