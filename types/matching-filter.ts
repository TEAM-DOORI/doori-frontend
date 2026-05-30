export type MatchingGrade =
  | "26학번"
  | "25학번"
  | "24학번"
  | "23학번"
  | "22학번"
  | "21학번"
  | "21학번 이전";

export type MatchingSleepPattern = "아침형" | "저녁형" | "새벽형";
export type MatchingSmoking = "흡연" | "비흡연";
export type MatchingSociability = "비즈니스" | "적당하게" | "찐친형";

export type MbtiAxis = "ei" | "sn" | "tf" | "jp";
export type MbtiLetter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
export type MbtiAxisMap = {
  ei: "E" | "I";
  sn: "S" | "N";
  tf: "T" | "F";
  jp: "J" | "P";
};

/** 청결도·소음 슬라이더 5단계 (0~4, 라벨은 0·2·4만 표시) */
export type MatchingScaleStep = 0 | 1 | 2 | 3 | 4;

export const MATCHING_SCALE_STEP_COUNT = 5;
export const MATCHING_SCALE_LABELED_STEPS = [0, 2, 4] as const;

export type MatchingFilters = {
  grade: MatchingGrade | null;
  sleepPattern: MatchingSleepPattern | null;
  smoking: MatchingSmoking | null;
  cleanliness: MatchingScaleStep;
  noise: MatchingScaleStep;
  sociability: MatchingSociability | null;
  mbti: Partial<MbtiAxisMap>;
};

export const DEFAULT_MATCHING_FILTERS: MatchingFilters = {
  grade: null,
  sleepPattern: null,
  smoking: null,
  cleanliness: 2,
  noise: 2,
  sociability: null,
  mbti: {},
};
