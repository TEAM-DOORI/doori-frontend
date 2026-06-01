/** Figma `1015:8130` 매칭 화면 — 393×852 기준 수치 */
export const MATCHING_FIGMA = {
  frameWidth: 393,
  heroGradientHeight: 517,
  statusBarHeight: 48,
  back: { x: 15, y: 75, size: 30 },
  intro: { x: 79, y: 105, width: 235, height: 62 },
  carousel: { x: -64, y: 195, cardGap: 10, cardWidth: 167 },
  character: {
    x: 44.62,
    y: 324,
    groupWidth: 303.77,
    groupHeight: 246.75,
    imageWidth: 268.36,
    imageHeight: 178.9,
  },
  bottomPanel: { y: 555 },
} as const;

/** Figma letterSpacing % → React Native pt */
export const figmaLetterSpacing = (fontSize: number, percent: number) =>
  fontSize * (percent / 100);

export const matchingColors = {
  titleInk: "#121212",
  bodyInk: "#000000",
  summaryInk: "#454545",
  chevronMuted: "#979797",
  matchBadgeBg: "#FFF195",
  chipBg: "#E6EEFF",
  divider: "#EBEBEB",
  introInk: "#1A3262",
} as const;
