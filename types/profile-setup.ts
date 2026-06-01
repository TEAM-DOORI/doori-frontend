import type {
  EnrollmentOption,
  GradeOption,
} from "../constants/profile-setup-options";

export type GenderOption = "male" | "female";
export type ResidenceOption = "dorm" | "share";
export type SmokingOption = "non-smoker" | "smoker";
export type SleepOption = "early" | "late" | "irregular";
export type CleanlinessOption = "very" | "normal" | "low";
export type NoiseOption = "sensitive" | "normal" | "insensitive";
export type AtmosphereOption = "quiet" | "moderate" | "social";
export type PriorityCriterion =
  | "sleep"
  | "cleanliness"
  | "smoking"
  | "noise"
  | "personality";

/** 온보딩 완료 화면 일러스트·카피 variant (수면 패턴 등 선택에 따라 매핑) */
export type OnboardingResultVariantId = "night" | "early" | "irregular";

export type ProfileSetupDraft = {
  /** 로그인/프로필 API에서 채워질 표시 이름 (예: "선우") */
  displayName: string | null;
  basic: {
    gender: GenderOption;
    residence: ResidenceOption;
    grade: GradeOption;
    enrollment: EnrollmentOption;
    graduationYear: string | null;
  };
  lifestyle: {
    smoking: SmokingOption;
    sleep: SleepOption;
  };
  preferences: {
    cleanliness: CleanlinessOption;
    noise: NoiseOption;
  };
  matching: {
    atmosphere: AtmosphereOption;
    priority: PriorityCriterion;
  };
  intro: {
    introduction: string;
    roommateWish: string;
  };
};

/** AI/백엔드가 완료 화면 문구·이미지를 덮어쓸 때 사용 */
export type OnboardingCompleteOverride = {
  variantId?: OnboardingResultVariantId;
  title?: string;
  /** @deprecated descriptionLines 사용 권장 */
  description?: string;
  descriptionLines?: readonly [string, string];
  /** 원격 이미지 URL (추후 연동) */
  imageUrl?: string | null;
};

/** 추후 API 응답을 그대로 넣을 수 있는 형태 */
export type ProfileSetupApiPayload = {
  displayName?: string | null;
  draft?: ProfileSetupDraftPatch;
  complete?: OnboardingCompleteOverride | null;
};

export type ProfileSetupDraftPatch = {
  displayName?: string | null;
  basic?: Partial<ProfileSetupDraft["basic"]>;
  lifestyle?: Partial<ProfileSetupDraft["lifestyle"]>;
  preferences?: Partial<ProfileSetupDraft["preferences"]>;
  matching?: Partial<ProfileSetupDraft["matching"]>;
  intro?: Partial<ProfileSetupDraft["intro"]>;
};

export type OnboardingCompleteContent = {
  variantId: OnboardingResultVariantId;
  title: string;
  descriptionLines: readonly [string, string];
  imageSource: number;
  imageUrl: string | null;
};
