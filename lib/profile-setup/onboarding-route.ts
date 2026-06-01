const ONBOARDING_PROGRESS: Record<string, number> = {
  "profile-setup": 0.2,
  "profile-setup-lifestyle": 0.4,
  "profile-setup-preferences": 0.6,
  "profile-setup-matching": 0.8,
  "profile-setup-intro": 1,
};

export type OnboardingChromeVariant = "progress" | "backOnly";

export function getOnboardingRouteKey(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? "";
}

export function getOnboardingProgress(pathname: string): number | null {
  const key = getOnboardingRouteKey(pathname);
  return ONBOARDING_PROGRESS[key] ?? null;
}

export function getOnboardingChromeVariant(
  pathname: string,
): OnboardingChromeVariant {
  return getOnboardingRouteKey(pathname) === "onboarding-complete"
    ? "backOnly"
    : "progress";
}
