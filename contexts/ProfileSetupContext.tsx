import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getOnboardingCompleteContent } from "../lib/profile-setup/get-onboarding-complete-content";
import { DEFAULT_PROFILE_SETUP_DRAFT } from "../lib/profile-setup/default-profile-setup-draft";
import type {
  OnboardingCompleteContent,
  OnboardingCompleteOverride,
  ProfileSetupApiPayload,
  ProfileSetupDraft,
  ProfileSetupDraftPatch,
} from "../types/profile-setup";

type ProfileSetupContextValue = {
  draft: ProfileSetupDraft;
  completeOverride: OnboardingCompleteOverride | null;
  updateDraft: (patch: ProfileSetupDraftPatch) => void;
  resetDraft: () => void;
  /** 로그인·프로필 API 등에서 이름·온보딩 데이터를 주입 */
  applyProfileSetupFromApi: (payload: ProfileSetupApiPayload) => void;
  /** AI/백엔드가 완료 화면만 덮어쓸 때 */
  setCompleteOverride: (override: OnboardingCompleteOverride | null) => void;
  getCompleteContent: () => OnboardingCompleteContent;
};

const ProfileSetupContext = createContext<ProfileSetupContextValue | null>(null);

function mergeDraft(
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

export function ProfileSetupProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<ProfileSetupDraft>(DEFAULT_PROFILE_SETUP_DRAFT);
  const [completeOverride, setCompleteOverride] =
    useState<OnboardingCompleteOverride | null>(null);

  const updateDraft = useCallback((patch: ProfileSetupDraftPatch) => {
    setDraft((current) => mergeDraft(current, patch));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(DEFAULT_PROFILE_SETUP_DRAFT);
    setCompleteOverride(null);
  }, []);

  const applyProfileSetupFromApi = useCallback((payload: ProfileSetupApiPayload) => {
    if (payload.displayName !== undefined) {
      setDraft((current) => ({
        ...current,
        displayName: payload.displayName ?? null,
      }));
    }
    if (payload.draft) {
      setDraft((current) => mergeDraft(current, payload.draft!));
    }
    if (payload.complete !== undefined) {
      setCompleteOverride(payload.complete);
    }
  }, []);

  const getCompleteContent = useCallback(
    () => getOnboardingCompleteContent(draft, completeOverride),
    [draft, completeOverride],
  );

  const value = useMemo(
    () => ({
      draft,
      completeOverride,
      updateDraft,
      resetDraft,
      applyProfileSetupFromApi,
      setCompleteOverride,
      getCompleteContent,
    }),
    [
      draft,
      completeOverride,
      updateDraft,
      resetDraft,
      applyProfileSetupFromApi,
      getCompleteContent,
    ],
  );

  return (
    <ProfileSetupContext.Provider value={value}>
      {children}
    </ProfileSetupContext.Provider>
  );
}

export function useProfileSetup() {
  const context = useContext(ProfileSetupContext);
  if (!context) {
    throw new Error("useProfileSetup must be used within ProfileSetupProvider");
  }
  return context;
}

export function useOnboardingCompleteContent() {
  const { draft, completeOverride } = useProfileSetup();
  return useMemo(
    () => getOnboardingCompleteContent(draft, completeOverride),
    [draft, completeOverride],
  );
}
