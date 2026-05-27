import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

import { gradient } from "../constants/colors";
import { useScaledStyles } from "../hooks/useScaledStyles";
import { createSplashStyles, SPLASH_DURATION_MS } from "./splash.styles";

export default function SplashScreen() {
  const router = useRouter();
  const styles = useScaledStyles(createSplashStyles);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient
      colors={[...gradient.splash.colors]}
      locations={[...gradient.splash.locations]}
      start={gradient.splash.start}
      end={gradient.splash.end}
      style={styles.root}
    >
      <Image
        source={require("../assets/images/splash/character-blue-79fd51.png")}
        style={styles.characterBlue}
        contentFit="contain"
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
      <Image
        source={require("../assets/images/splash/character-yellow-2f1de7.png")}
        style={styles.characterYellow}
        contentFit="contain"
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
      <View style={styles.logo}>
        <Image
          source={require("../assets/images/splash/logo-dr.png")}
          style={{ width: "100%", height: "100%" }}
          contentFit="contain"
          accessibilityLabel="DOORI"
        />
      </View>
    </LinearGradient>
  );
}
