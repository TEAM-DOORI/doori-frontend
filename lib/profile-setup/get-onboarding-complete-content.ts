import {
  buildOnboardingCompleteCopy,
  resolveOnboardingResultVariantId,
} from "../../constants/onboarding-results";
import type {
  OnboardingCompleteContent,
  OnboardingCompleteOverride,
  ProfileSetupDraft,
} from "../../types/profile-setup";

export function getOnboardingCompleteContent(
  draft: ProfileSetupDraft,
  override?: OnboardingCompleteOverride | null,
): OnboardingCompleteContent {
  const variantId = override?.variantId ?? resolveOnboardingResultVariantId(draft);
  const copy = buildOnboardingCompleteCopy(variantId, draft.displayName, override);

  return {
    variantId,
    title: copy.title,
    description: copy.description,
    imageSource: copy.imageSource,
    imageUrl: copy.imageUrl,
  };
}
