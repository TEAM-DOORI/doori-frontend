import type { ProfileSetupDraft } from "../../types/profile-setup";

export const DEFAULT_PROFILE_SETUP_DRAFT: ProfileSetupDraft = {
  displayName: null,
  basic: {
    gender: "male",
    residence: "dorm",
    grade: "3학년",
    enrollment: "재학",
    graduationYear: null,
  },
  lifestyle: {
    smoking: "non-smoker",
    sleep: "late",
  },
  preferences: {
    cleanliness: "very",
    noise: "sensitive",
  },
  matching: {
    atmosphere: "moderate",
    priority: "sleep",
  },
  intro: {
    introduction: "",
    roommateWish: "",
  },
};
