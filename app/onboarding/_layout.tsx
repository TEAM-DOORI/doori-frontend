import { Stack, usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackgroundGradient } from "../../components/layout/BackgroundGradient";
import { ProfileSetupChrome } from "../../components/profile-setup/ProfileSetupChrome";
import {
  getOnboardingChromeVariant,
  getOnboardingProgress,
} from "../../lib/profile-setup/onboarding-route";
export default function OnboardingLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const chromeVariant = getOnboardingChromeVariant(pathname);
  const progress = getOnboardingProgress(pathname) ?? 0;

  return (
    <BackgroundGradient>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <ProfileSetupChrome variant={chromeVariant} progress={progress} />
        <View style={styles.stackHost}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "fade",
              animationDuration: 200,
              freezeOnBlur: true,
              contentStyle: { backgroundColor: "transparent" },
            }}>
            <Stack.Screen name='profile-setup' />
            <Stack.Screen name='profile-setup-lifestyle' />
            <Stack.Screen name='profile-setup-preferences' />
            <Stack.Screen name='profile-setup-matching' />
            <Stack.Screen name='profile-setup-intro' />
            <Stack.Screen name='onboarding-complete' />
          </Stack>
        </View>
      </View>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  stackHost: {
    flex: 1,
    overflow: "hidden",
  },
});
