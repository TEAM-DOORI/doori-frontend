/**
 * Figma Color styles
 * (이 목록만 디자인 시스템에 정의됨 — 그 외 색상은 화면별 수작업)
 */

/** 단색 스타일 */
export const colorStyle = {
  Main: "#C8D9FF",
  Main2: "#F3F6FF",
  Main_Text: "#1A3262",
  Sub1: "#4E6FD3",
  Sub2: "#E65353",
  Sub3: "#FFEF82",
  S01: "#F8F9FA",
  S02: "#E1E2E4",
  S03: "#D2D5D8",
  S04: "#B2B6BA",
  S05: "#696E71",
  black: "#15171B",
} as const;

/** 그라데이션 스타일 */
export const gradient = {
  /** 화면 배경 — linear-gradient(180deg, #F3F6FF 0%, #C8D9FF 100%) */
  background: {
    colors: [colorStyle.Main2, colorStyle.Main] as const,
    locations: [0, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  Y_GR: {
    colors: [colorStyle.Sub2, colorStyle.Sub3] as const,
    locations: [0, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  B_GR: {
    colors: [colorStyle.Main2, colorStyle.Main] as const,
    locations: [0, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  GR: {
    colors: [colorStyle.S01, colorStyle.Main2] as const,
    locations: [0, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  /** 스플래시 — linear-gradient(180deg, #FFF9DE 0%, #F3F6FF 52.4%, #C8D9FF 100%) */
  splash: {
    colors: ["#FFF9DE", colorStyle.Main2, colorStyle.Main] as const,
    locations: [0, 0.524, 1] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
} as const;

/**
 * 기존 코드 호환 alias (점진적으로 colorStyle / gradient 직접 사용 권장)
 */
export const color = {
  primary: colorStyle.Sub1,
  textPrimary: colorStyle.Main_Text,
  textSecondary: colorStyle.S05,
  textMuted: colorStyle.S04,
  border: colorStyle.S03,
  borderActive: colorStyle.Sub1,
  progressTrack: colorStyle.S01,
  progressFill: colorStyle.Sub1,
  buttonPrimary: colorStyle.Sub3,
  white: colorStyle.S01,
  black: "#000000",
} as const;

export type ColorStyle = typeof colorStyle;
export type GradientStyle = typeof gradient;
export type ColorToken = typeof color;
