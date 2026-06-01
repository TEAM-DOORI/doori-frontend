import { ROOMMATES, type Roommate } from "./home";

export type RoommateDetail = Roommate & {
  matchSummary: string;
  mbti: string;
  personalityTags: string[];
  /** Figma 줄 단위 — 어색한 단어 분리 방지 */
  introductionLines: readonly string[];
  preferredTraits: string[];
};

const DEFAULT_DETAIL = {
  matchSummary: "수면패턴 · 흡연여부 일치",
  mbti: "INFJ",
  personalityTags: ["야행성", "새벽형", "찐친형", "비흡연"],
  introductionLines: [
    "안녕하세요 03년생 22학번입니다 😄",
    "저녁형 인간이라 밤늦게 부스럭거려도 괜찮은",
    "룸메이트를 찾아요. 비흡연은 필수고,",
    "화장실 청소 주기를 정해서 같이 지키실 분이면 좋겠습니다.",
    "낯을 가리는 편이라 집에서는 각자의 시간을",
    "존중하며 조용히 지내고 싶어요. 저랑 비슷한",
    "라이프스타일을 가진 분 환영합니다!",
  ],
  preferredTraits: [
    "담배 안 피시는 분",
    "청소 잘 하시는 분",
    "활발하고 친화력 좋으신 분",
  ],
} as const;

export function getRoommateDetail(id: string): RoommateDetail | undefined {
  const base = ROOMMATES.find((r) => r.id === id);
  if (!base) return undefined;

  return {
    ...base,
    matchSummary: DEFAULT_DETAIL.matchSummary,
    mbti: DEFAULT_DETAIL.mbti,
    introductionLines: [...DEFAULT_DETAIL.introductionLines],
    preferredTraits: [...DEFAULT_DETAIL.preferredTraits],
    personalityTags: [DEFAULT_DETAIL.mbti, ...base.traits],
  };
}
