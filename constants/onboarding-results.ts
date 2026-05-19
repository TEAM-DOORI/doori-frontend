import type {
  OnboardingCompleteOverride,
  OnboardingResultVariantId,
  ProfileSetupDraft,
} from "../types/profile-setup";

const ONBOARDING_IMAGES = {
  night: require("../assets/images/onboarding/night.png"),
  // TODO: Figma 에셋 추가 후 교체
  early: require("../assets/images/onboarding/night.png"),
  irregular: require("../assets/images/onboarding/night.png"),
} as const satisfies Record<OnboardingResultVariantId, number>;

type OnboardingResultVariantConfig = {
  image: number;
  getTitle: (name: string) => string;
  getDescription: (name: string) => string;
};

const ONBOARDING_RESULT_VARIANTS: Record<
  OnboardingResultVariantId,
  OnboardingResultVariantConfig
> = {
  night: {
    image: ONBOARDING_IMAGES.night,
    getTitle: (name) => `깊은 밤을 즐기는 ${name}님!`,
    getDescription: (name) =>
      `고요한 밤에 더 빛나는 ${name}님을 위해 딱 맞는 룸메이트를 찾아드릴게요.`,
  },
  early: {
    image: ONBOARDING_IMAGES.early,
    getTitle: (name) => `아침을 사랑하는 ${name}님!`,
    getDescription: (name) =>
      `상쾌한 아침에 더 빛나는 ${name}님을 위해 딱 맞는 룸메이트를 찾아드릴게요.`,
  },
  irregular: {
    image: ONBOARDING_IMAGES.irregular,
    getTitle: (name) => `자유로운 리듬의 ${name}님!`,
    getDescription: (name) =>
      `나만의 일정에 맞는 ${name}님을 위해 딱 맞는 룸메이트를 찾아드릴게요.`,
  },
};

export function formatProfileDisplayName(displayName: string | null): string {
  const trimmed = displayName?.trim();
  return trimmed ? trimmed : "회원";
}

/** 온보딩 선택값 → 완료 화면 variant (추후 AI/백엔드 규칙으로 확장) */
export function resolveOnboardingResultVariantId(
  draft: Pick<ProfileSetupDraft, "lifestyle">,
): OnboardingResultVariantId {
  switch (draft.lifestyle.sleep) {
    case "early":
      return "early";
    case "late":
      return "night";
    case "irregular":
      return "irregular";
    default:
      return "night";
  }
}

export function buildOnboardingCompleteCopy(
  variantId: OnboardingResultVariantId,
  displayName: string | null,
  override?: OnboardingCompleteOverride | null,
): { title: string; description: string; imageSource: number; imageUrl: string | null } {
  const name = formatProfileDisplayName(displayName);
  const variant = ONBOARDING_RESULT_VARIANTS[variantId];

  return {
    title: override?.title ?? variant.getTitle(name),
    description: override?.description ?? variant.getDescription(name),
    imageSource: variant.image,
    imageUrl: override?.imageUrl ?? null,
  };
}
