import type {
  MatchingGrade,
  MatchingQuickChip,
  MatchingSleepPattern,
  MatchingSmoking,
  MatchingSociability,
  MbtiLetter,
} from "../types/matching-filter";

export const MATCHING_QUICK_CHIPS: readonly MatchingQuickChip[] = [
  "아침형",
  "비흡연",
  "깔끔한",
] as const;

export const MATCHING_GRADE_OPTIONS: readonly MatchingGrade[] = [
  "26학번",
  "25학번",
  "24학번",
  "23학번",
  "22학번",
  "21학번",
  "21학번 이전",
] as const;

/** Figma 학번 칩 2줄 — 1행: ~23학번, 2행: 22학번~ */
export const MATCHING_GRADE_ROWS: readonly (readonly MatchingGrade[])[] = [
  ["26학번", "25학번", "24학번", "23학번"],
  ["22학번", "21학번", "21학번 이전"],
] as const;

export const MATCHING_SLEEP_OPTIONS: readonly MatchingSleepPattern[] = [
  "아침형",
  "저녁형",
  "새벽형",
] as const;

export const MATCHING_SMOKING_OPTIONS: readonly MatchingSmoking[] = [
  "흡연",
  "비흡연",
] as const;

export const CLEANLINESS_LABELS = ["매우깔끔", "보통", "무던함"] as const;
export const NOISE_LABELS = ["무던함", "보통", "예민함"] as const;

export const SOCIABILITY_OPTIONS: readonly {
  value: MatchingSociability;
  emoji: string;
  title: string;
  descriptionLines: readonly [string, string];
}[] = [
  {
    value: "비즈니스",
    emoji: "💻",
    title: "비즈니스",
    descriptionLines: ["인사만 하고 각자 생활해요.", "사생활 존중 필수!"],
  },
  {
    value: "적당하게",
    emoji: "🙆",
    title: "적당하게",
    descriptionLines: ["가끔 같이 밥 먹거나", "수다 떠는 정도는 좋아요"],
  },
  {
    value: "찐친형",
    emoji: "👯",
    title: "찐친형",
    descriptionLines: ["함께 야식 먹고 놀러 다닐", "단짝 룸메를 찾아요!"],
  },
] as const;

export const MBTI_OPTIONS: readonly {
  axis: "ei" | "sn" | "tf" | "jp";
  letter: MbtiLetter;
  subtitle: string;
}[] = [
  { axis: "ei", letter: "E", subtitle: "외향적" },
  { axis: "sn", letter: "S", subtitle: "현실적" },
  { axis: "tf", letter: "T", subtitle: "사고적" },
  { axis: "jp", letter: "J", subtitle: "계획적" },
  { axis: "ei", letter: "I", subtitle: "내향적" },
  { axis: "sn", letter: "N", subtitle: "직관적" },
  { axis: "tf", letter: "F", subtitle: "감정적" },
  { axis: "jp", letter: "P", subtitle: "즉흥적" },
] as const;
