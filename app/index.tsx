import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { Text, View, useWindowDimensions } from "react-native";

import { createScaleFns } from "../constants/create-scale-api";
import { gradient } from "../constants/colors";
import { createSplashStyles, SPLASH_DURATION_MS } from "./splash.styles";

export default function SplashScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const styles = useMemo(
    () => createSplashStyles(createScaleFns(width), height),
    [width, height]
  );

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
        contentFit="fill"
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
      <Image
        source={require("../assets/images/splash/character-yellow-2f1de7.png")}
        style={styles.characterYellow}
        contentFit="fill"
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
      <View style={styles.logo}>
        <Text style={styles.logoText} accessibilityLabel="DOORI">
          DR
        </Text>
      </View>
    </LinearGradient>
  );
}
