import type { MatchingFilters } from "../../types/matching-filter";
import type { MatchingShortcutChip } from "../../constants/matching-filter-options";

export function isShortcutChipActive(
  filters: MatchingFilters,
  chip: MatchingShortcutChip
) {
  if (chip === "아침형") return filters.sleepPattern === "아침형";
  if (chip === "비흡연") return filters.smoking === "비흡연";
  return filters.cleanliness >= 3;
}

export function toggleShortcutChip(
  filters: MatchingFilters,
  chip: MatchingShortcutChip
): MatchingFilters {
  if (chip === "아침형") {
    return {
      ...filters,
      sleepPattern: filters.sleepPattern === "아침형" ? null : "아침형",
    };
  }

  if (chip === "비흡연") {
    return {
      ...filters,
      smoking: filters.smoking === "비흡연" ? null : "비흡연",
    };
  }

  return {
    ...filters,
    cleanliness: filters.cleanliness >= 3 ? 2 : 4,
  };
}
