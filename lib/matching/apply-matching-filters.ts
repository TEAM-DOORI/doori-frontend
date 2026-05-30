import type { RecommendedRoommate } from "../../types/recommended-roommate";
import type { MatchingFilters } from "../../types/matching-filter";

function traitIncludes(traits: readonly string[], needle: string) {
  return traits.some((t) => t.includes(needle));
}

export function getActiveFilterLabels(filters: MatchingFilters): string[] {
  const labels: string[] = [];

  if (filters.grade) labels.push(filters.grade);
  if (filters.sleepPattern) labels.push(filters.sleepPattern);
  if (filters.smoking) labels.push(filters.smoking);
  if (filters.sociability) {
    const map: Record<string, string> = {
      비즈니스: "비즈니스",
      적당하게: "적당하게",
      찐친형: "찐친형",
    };
    labels.push(map[filters.sociability]);
  }
  if (filters.cleanliness >= 3) labels.push("깔끔한");

  const mbti = [
    filters.mbti.ei,
    filters.mbti.sn,
    filters.mbti.tf,
    filters.mbti.jp,
  ]
    .filter(Boolean)
    .join("");
  if (mbti) labels.push(mbti);

  return Array.from(new Set(labels));
}

export function removeFilterByLabel(
  filters: MatchingFilters,
  label: string
): MatchingFilters {
  const next: MatchingFilters = {
    ...filters,
    mbti: { ...filters.mbti },
  };

  if (next.grade === label) next.grade = null;
  if (next.sleepPattern === label) next.sleepPattern = null;
  if (next.smoking === label) next.smoking = null;
  if (next.sociability === label) next.sociability = null;
  if (label === "깔끔한") next.cleanliness = 2;

  const mbtiJoined = [
    next.mbti.ei,
    next.mbti.sn,
    next.mbti.tf,
    next.mbti.jp,
  ]
    .filter(Boolean)
    .join("");
  if (mbtiJoined === label) next.mbti = {};

  return next;
}

export function applyMatchingFilters(
  roommates: RecommendedRoommate[],
  filters: MatchingFilters
): RecommendedRoommate[] {
  return roommates.filter((item) => {
    if (filters.smoking === "비흡연" && !traitIncludes(item.traits, "비흡연")) {
      return false;
    }
    if (filters.smoking === "흡연" && traitIncludes(item.traits, "비흡연")) {
      return false;
    }

    if (filters.sleepPattern) {
      const map: Record<string, string> = {
        아침형: "아침",
        저녁형: "야행",
        새벽형: "새벽",
      };
      const needle = map[filters.sleepPattern];
      if (needle && !traitIncludes(item.traits, needle)) return false;
    }

    if (filters.cleanliness >= 3 && !traitIncludes(item.traits, "깔끔한")) {
      return false;
    }

    return true;
  });
}
