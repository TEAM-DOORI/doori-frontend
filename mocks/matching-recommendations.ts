import type { Roommate } from "./home";
import { ROOMMATES, USER_NAME, USER_TRAITS } from "./home";
import type { RecommendedRoommate } from "../types/recommended-roommate";

const DEFAULT_MATCH_SUMMARY = "수면패턴 · 흡연여부 일치";

export function toRecommendedRoommate(roommate: Roommate): RecommendedRoommate {
  return {
    ...roommate,
    matchSummary: DEFAULT_MATCH_SUMMARY,
  };
}

export const RECOMMENDED_ROOMMATES: RecommendedRoommate[] = ROOMMATES.map(
  toRecommendedRoommate
);

/** USER_TRAITS[2] 예: "깔끔한" */
export const MATCHING_INTRO_TITLE = `${USER_TRAITS[2]} ${USER_NAME}님과`;
export const MATCHING_INTRO_SUBTITLE = "잘 맞는 룸메를 찾아드릴게요";

export function getMatchingSectionSubtitle() {
  return `${USER_TRAITS[2]} ${USER_NAME}님과 잘 맞는 룸메이트`;
}

/** Figma `1015:8178` 필터 칩 라벨 */
export const FILTER_CHIP_OPTIONS = ["아침형", "비흡연", "깔끔한"] as const;

export function roommateMatchesFilter(
  traits: readonly string[],
  filter: FilterChipOption
): boolean {
  if (filter === "비흡연") {
    return traits.some((t) => t.includes("비흡연"));
  }
  if (filter === "깔끔한") {
    return traits.some((t) => t.includes("깔끔한"));
  }
  if (filter === "아침형") {
    return traits.some((t) => t.includes("아침"));
  }
  return true;
}

export type FilterChipOption = (typeof FILTER_CHIP_OPTIONS)[number];
