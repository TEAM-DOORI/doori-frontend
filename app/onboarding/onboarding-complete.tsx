import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackgroundGradient } from "../../components/layout/BackgroundGradient";
import { BackButton } from "../../components/navigation/BackButton";
import { Text } from "../../components/typography";
import { vs } from "../../constants";
import { useOnboardingCompleteContent } from "../../contexts/ProfileSetupContext";
import { useScaledStyles } from "../../hooks/useScaledStyles";
import { createOnboardingCompleteStyles } from "./_styles/onboarding-complete.styles";

export default function OnboardingCompleteScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const styles = useScaledStyles(createOnboardingCompleteStyles);
  const content = useOnboardingCompleteContent();

  const handleStart = () => {
    router.dismissTo("/(tabs)");
  };

  return (
    <BackgroundGradient>
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <BackButton />
        </View>

        <View style={styles.content}>
          <Text
            weight='bold'
            style={styles.title}
            numberOfLines={1}>
            {content.title}
          </Text>
          <View style={styles.descriptionBlock}>
            {content.descriptionLines.map((line) => (
              <Text
                key={line}
                weight='regular'
                style={styles.descriptionLine}>
                {line}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.illustrationWrap}>
          <Image
            source={
              content.imageUrl ? { uri: content.imageUrl } : content.imageSource
            }
            style={styles.illustration}
            contentFit='contain'
            accessibilityLabel='온보딩 완료 일러스트'
          />
        </View>

        <View style={styles.spacer} />

        <View
          style={[
            styles.footer,
            { paddingBottom: Math.max(insets.bottom + vs(20), vs(32)) },
          ]}>
          <Pressable
            style={({ pressed }) => [
              styles.startButton,
              pressed && { opacity: 0.92 },
            ]}
            onPress={handleStart}
            accessibilityRole='button'
            accessibilityLabel='시작하기'>
            <Text
              weight='bold'
              style={styles.startButtonText}>
              시작하기
            </Text>
          </Pressable>
        </View>
      </View>
    </BackgroundGradient>
  );
}
