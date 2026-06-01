import { View } from "react-native";

import { useScaledStyles } from "../../hooks/useScaledStyles";
import type { OnboardingChromeVariant } from "../../lib/profile-setup/onboarding-route";
import { BackButton } from "../navigation/BackButton";
import { ProgressBar } from "./ProgressBar";
import { createProfileSetupChromeStyles } from "./ProfileSetupChrome.styles";

type ProfileSetupChromeProps = {
  variant: OnboardingChromeVariant;
  progress: number;
};

export function ProfileSetupChrome({ variant, progress }: ProfileSetupChromeProps) {
  const styles = useScaledStyles(createProfileSetupChromeStyles);
  const showProgress = variant === "progress";

  return (
    <View
      style={[
        styles.header,
        showProgress ? styles.headerWithProgress : styles.headerBackOnly,
      ]}>
      <BackButton />
      {showProgress ? (
        <View style={styles.progressWrap}>
          <ProgressBar progress={progress} animated />
        </View>
      ) : null}
    </View>
  );
}
