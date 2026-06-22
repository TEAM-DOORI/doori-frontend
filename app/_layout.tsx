import { DefaultTheme, ThemeProvider } from "@react-navigation/native";

import { ProfileSetupProvider } from "../contexts/ProfileSetupContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { GlobalAlertProvider } from "../components/common/GlobalAlertProvider";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "THE-POSTER-FONT-DEMO": require("../assets/fonts/THE-POSTER-FONT-DEMO.ttf"),
    "Pretendard-Thin": require("../assets/fonts/Pretendard-Thin.ttf"),
    "Pretendard-ExtraLight": require("../assets/fonts/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.ttf"),
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.ttf"),
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("../assets/fonts/Pretendard-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <GlobalAlertProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
            <Stack.Screen name='login' />
            <Stack.Screen name='onboarding' />
            <Stack.Screen name='matching' />
            <Stack.Screen name='roommate' />
            <Stack.Screen name='(tabs)' />
          </Stack>
          <StatusBar style='auto' />
        </ThemeProvider>
      </GlobalAlertProvider>
    </GestureHandlerRootView>
  );
}
