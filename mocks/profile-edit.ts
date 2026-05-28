export const PROFILE_EDIT_DEFAULT = {
  name: "김연수",
  school: "홍익대학교",
  introduction: "",
  lifestyle: "morning" as "morning" | "evening",
  myTags: ["INFJ", "야행성", "새벽형", "찐친형", "비흡연"],
  roommateTags: [] as string[],
} as const;

export const PROFILE_EDIT_LIMITS = {
  introductionMax: 200,
  roommateTagMax: 3,
} as const;
