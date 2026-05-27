import { PixelRatio } from "react-native";

import { FIGMA_BASE_WIDTH } from "./scale";

const round = (value: number) => PixelRatio.roundToNearestPixel(value);

export type ScaleFns = {
  hs: (size: number) => number;
  vs: (size: number) => number;
  fs: (size: number) => number;
  ms: (size: number, factor?: number) => number;
};

export function createScaleFns(screenWidth: number): ScaleFns {
  const widthScale = screenWidth / FIGMA_BASE_WIDTH;
  const scale = (size: number) => round(size * widthScale);

  return {
    hs: scale,
    vs: scale,
    fs: scale,
    ms: (size: number, factor = 1) =>
      round(size + (scale(size) - size) * factor),
  };
}
