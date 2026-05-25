import { Dimensions, PixelRatio } from "react-native";

export const FIGMA_BASE_WIDTH = 393;
export const FIGMA_BASE_HEIGHT = 852;

const roundToNearestPixel = (value: number) =>
  PixelRatio.roundToNearestPixel(value);

/** 호출 시점 window 너비 기준 (모듈 로드 1회 고정 방지) */
export const getWidthScale = () =>
  Dimensions.get("window").width / FIGMA_BASE_WIDTH;

/**
 * Figma 393pt 기준 — 가로 비율 하나로 통일 (hs / vs / fs 동일).
 * StyleSheet.create는 import 시점에 숫자가 고정되므로, 회전·분할 대응이 필요하면
 * 화면에서 useWindowDimensions + useMemo 스타일을 쓰세요.
 */
const scale = (size: number) =>
  roundToNearestPixel(size * getWidthScale());

export const hs = scale;
export const vs = scale;
export const fs = scale;

/**
 * factor=1이면 scale과 동일. 0~1이면 디자인 값~스케일 값 사이 보간 (예: ms(335, 0.5)).
 */
export const ms = (size: number, factor = 1) =>
  roundToNearestPixel(size + (scale(size) - size) * factor);
