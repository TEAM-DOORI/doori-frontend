import type { MatchingQuickChip } from "../../types/matching-filter";
import type { RecommendedRoommate } from "../../mocks/matching-recommendations";
import type { MatchingFilters } from "../../types/matching-filter";

function traitIncludes(traits: readonly string[], needle: string) {
  return traits.some((t) => t.includes(needle));
}

export function getActiveFilterLabels(filters: MatchingFilters): string[] {
  const labels: string[] = [...filters.quickChips];

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

  const mbti = [
    filters.mbti.ei,
    filters.mbti.sn,
    filters.mbti.tf,
    filters.mbti.jp,
  ]
    .filter(Boolean)
    .join("");
  if (mbti) labels.push(mbti);

  return labels;
}

export function removeFilterByLabel(
  filters: MatchingFilters,
  label: string
): MatchingFilters {
  const next: MatchingFilters = {
    ...filters,
    quickChips: [...filters.quickChips],
    mbti: { ...filters.mbti },
  };

  if (next.quickChips.includes(label as MatchingQuickChip)) {
    next.quickChips = next.quickChips.filter((c) => c !== label);
  }
  if (next.grade === label) next.grade = null;
  if (next.sleepPattern === label) next.sleepPattern = null;
  if (next.smoking === label) next.smoking = null;
  if (next.sociability === label) next.sociability = null;

  const mbtiJoined = [
    next.mbti.ei,
    next.mbti.sn,
    next.mbti.tf,
    next.mbti.jp,
  ]
    .filter(Boolean)
    .join("");
  if (mbtiJoined === label) next.mbti = {};

  if (label === "비흡연") {
    next.smoking = null;
    next.quickChips = next.quickChips.filter((c) => c !== "비흡연");
  }
  if (label === "아침형") {
    next.sleepPattern = null;
    next.quickChips = next.quickChips.filter((c) => c !== "아침형");
  }
  if (label === "깔끔한") {
    next.quickChips = next.quickChips.filter((c) => c !== "깔끔한");
  }

  return next;
}

export function applyMatchingFilters(
  roommates: RecommendedRoommate[],
  filters: MatchingFilters
): RecommendedRoommate[] {
  return roommates.filter((item) => {
    if (
      filters.quickChips.includes("비흡연") &&
      !traitIncludes(item.traits, "비흡연")
    ) {
      return false;
    }
    if (
      filters.quickChips.includes("깔끔한") &&
      !traitIncludes(item.traits, "깔끔한")
    ) {
      return false;
    }
    if (
      filters.quickChips.includes("아침형") &&
      !traitIncludes(item.traits, "아침") &&
      !traitIncludes(item.traits, "야행")
    ) {
      return false;
    }

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

    return true;
  });
}
