import type {
  ProfileSetupDraft,
  ProfileSetupDraftPatch,
} from "../../types/profile-setup";

export function mergeProfileSetupDraft(
  current: ProfileSetupDraft,
  patch: ProfileSetupDraftPatch,
): ProfileSetupDraft {
  return {
    ...current,
    ...patch,
    basic: { ...current.basic, ...patch.basic },
    lifestyle: { ...current.lifestyle, ...patch.lifestyle },
    preferences: { ...current.preferences, ...patch.preferences },
    matching: { ...current.matching, ...patch.matching },
    intro: { ...current.intro, ...patch.intro },
  };
}
