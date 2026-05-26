import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { DEFAULT_PROFILE_SETUP_DRAFT } from "../lib/profile-setup/default-profile-setup-draft";
import { getOnboardingCompleteContent } from "../lib/profile-setup/get-onboarding-complete-content";
import { mergeProfileSetupDraft } from "../lib/profile-setup/merge-profile-setup-draft";
import {
  clearProfileSetupState,
  loadProfileSetupState,
  saveProfileSetupState,
} from "../lib/profile-setup/profile-setup-storage";
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

export function ProfileSetupProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<ProfileSetupDraft>(DEFAULT_PROFILE_SETUP_DRAFT);
  const [completeOverride, setCompleteOverride] =
    useState<OnboardingCompleteOverride | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const stored = await loadProfileSetupState();
        if (cancelled) {
          return;
        }

        if (stored) {
          setDraft(stored.draft);
          setCompleteOverride(stored.completeOverride);
        }
      } catch (error) {
        console.error("프로필 설정 상태 복원 실패", error);
      } finally {
        if (!cancelled) {
          setIsHydrated(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    void saveProfileSetupState(draft, completeOverride);
  }, [draft, completeOverride, isHydrated]);

  const updateDraft = useCallback((patch: ProfileSetupDraftPatch) => {
    setDraft((current) => mergeProfileSetupDraft(current, patch));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(DEFAULT_PROFILE_SETUP_DRAFT);
    setCompleteOverride(null);
    void clearProfileSetupState();
  }, []);

  const applyProfileSetupFromApi = useCallback((payload: ProfileSetupApiPayload) => {
    if (payload.displayName !== undefined) {
      setDraft((current) => ({
        ...current,
        displayName: payload.displayName ?? null,
      }));
    }
    if (payload.draft) {
      setDraft((current) => mergeProfileSetupDraft(current, payload.draft!));
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

  if (!isHydrated) {
    return null;
  }

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
