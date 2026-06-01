export const GRADE_OPTIONS = ["1학년", "2학년", "3학년", "4학년"] as const;

export const ENROLLMENT_OPTIONS = ["재학", "휴학", "졸업"] as const;

const GRADUATION_YEAR_RANGE = 12;

export function getGraduationYearOptions(): string[] {
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: GRADUATION_YEAR_RANGE },
    (_, index) => `${currentYear + index}년`
  );
}

export const GRADUATION_PLACEHOLDER = "졸업예정일";

export type GradeOption = (typeof GRADE_OPTIONS)[number];
export type EnrollmentOption = (typeof ENROLLMENT_OPTIONS)[number];
