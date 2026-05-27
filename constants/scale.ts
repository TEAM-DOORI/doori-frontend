import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const FIGMA_BASE_WIDTH = 393;
export const FIGMA_BASE_HEIGHT = 852;

const widthScale = SCREEN_WIDTH / FIGMA_BASE_WIDTH;
const heightScale = SCREEN_HEIGHT / FIGMA_BASE_HEIGHT;

const roundToNearestPixel = (value: number) => PixelRatio.roundToNearestPixel(value);

export const hs = (size: number) => roundToNearestPixel(size * widthScale);
export const vs = (size: number) => roundToNearestPixel(size * heightScale);
export const ms = (size: number, factor = 0.5) =>
  roundToNearestPixel(size + (hs(size) - size) * factor);

export const fs = (size: number) => ms(size, 0.35);
