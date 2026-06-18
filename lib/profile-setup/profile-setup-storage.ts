import AsyncStorage from "@react-native-async-storage/async-storage";

import type {
  OnboardingCompleteOverride,
  ProfileSetupDraft,
  ProfileSetupDraftPatch,
} from "../../types/profile-setup";
import { DEFAULT_PROFILE_SETUP_DRAFT } from "./default-profile-setup-draft";
import { mergeProfileSetupDraft } from "./merge-profile-setup-draft";

const STORAGE_KEY = "@doori/profile-setup/v1";
const STORAGE_VERSION = 1;

type PersistedProfileSetupState = {
  version: number;
  draft: ProfileSetupDraft;
  completeOverride: OnboardingCompleteOverride | null;
};

export type HydratedProfileSetupState = {
  draft: ProfileSetupDraft;
  completeOverride: OnboardingCompleteOverride | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function migrateDraft(raw: unknown): ProfileSetupDraft {
  if (!isRecord(raw)) {
    return DEFAULT_PROFILE_SETUP_DRAFT;
  }

  const patch = raw as ProfileSetupDraftPatch;
  return mergeProfileSetupDraft(DEFAULT_PROFILE_SETUP_DRAFT, patch);
}

function parseCompleteOverride(
  raw: unknown
): OnboardingCompleteOverride | null {
  if (raw === null || raw === undefined) {
    return null;
  }
  if (!isRecord(raw)) {
    return null;
  }
  return raw as OnboardingCompleteOverride;
}

function parsePersistedState(raw: unknown): HydratedProfileSetupState | null {
  if (!isRecord(raw)) {
    return null;
  }

  const version = raw.version;
  if (version !== STORAGE_VERSION) {
    return null;
  }

  return {
    draft: migrateDraft(raw.draft),
    completeOverride: parseCompleteOverride(raw.completeOverride),
  };
}

export async function loadProfileSetupState(): Promise<HydratedProfileSetupState | null> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) {
      return null;
    }
    return parsePersistedState(JSON.parse(json));
  } catch {
    return null;
  }
}

export async function saveProfileSetupState(
  draft: ProfileSetupDraft,
  completeOverride: OnboardingCompleteOverride | null
): Promise<void> {
  const payload: PersistedProfileSetupState = {
    version: STORAGE_VERSION,
    draft,
    completeOverride,
  };

  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // 저장 실패 시 온보딩 진행은 유지 (메모리 상태만 사용)
  }
}

export async function clearProfileSetupState(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
