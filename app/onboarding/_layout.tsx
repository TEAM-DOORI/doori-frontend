import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='profile-setup' />
      <Stack.Screen name='profile-setup-lifestyle' />
      <Stack.Screen name='profile-setup-preferences' />
      <Stack.Screen name='profile-setup-matching' />
      <Stack.Screen name='profile-setup-intro' />
      <Stack.Screen name='onboarding-complete' />
    </Stack>
  );
}
