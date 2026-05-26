import { Stack } from "expo-router";

import { MatchingFilterProvider } from "../../contexts/MatchingFilterContext";

export default function MatchingLayout() {
  return (
    <MatchingFilterProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="filter" />
      </Stack>
    </MatchingFilterProvider>
  );
}
