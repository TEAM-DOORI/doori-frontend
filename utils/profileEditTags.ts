import { PROFILE_EDIT_LIMITS } from "@/mocks/profile-edit";

export function normalizeRoommateTag(tag: string) {
  return tag.trim().toLowerCase();
}

export function isDuplicateRoommateTag(tags: readonly string[], tag: string) {
  const normalizedTag = normalizeRoommateTag(tag);
  return tags.some((existingTag) => normalizeRoommateTag(existingTag) === normalizedTag);
}

export function canAddRoommateTag(tags: readonly string[], tag: string) {
  const trimmedTag = tag.trim();
  if (!trimmedTag) {
    return { ok: false as const, reason: "empty" as const };
  }
  if (tags.length >= PROFILE_EDIT_LIMITS.roommateTagMax) {
    return { ok: false as const, reason: "limit" as const };
  }
  if (isDuplicateRoommateTag(tags, trimmedTag)) {
    return { ok: false as const, reason: "duplicate" as const };
  }
  return { ok: true as const, value: trimmedTag };
}
