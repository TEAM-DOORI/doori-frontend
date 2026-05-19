import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackgroundGradient } from "../components/layout/BackgroundGradient";
import { BackButton } from "../components/navigation/BackButton";
import { LifestyleOptionCard } from "../components/profile-setup/LifestyleOptionCard";
import { ProgressBar } from "../components/profile-setup/ProgressBar";
import { Text } from "../components/typography";
import { vs } from "../constants";
import { styles } from "./profile-setup-preferences.styles";

type CleanlinessOption = "very" | "normal" | "low";
type NoiseOption = "sensitive" | "normal" | "insensitive";

const CLEANLINESS_OPTIONS = [
  { value: "very" as const, emoji: "🧼", label: "매우 중요" },
  { value: "normal" as const, emoji: "🙂", label: "보통" },
  { value: "low" as const, emoji: "😅", label: "크게 신경 안 써요" },
];

const NOISE_OPTIONS = [
  { value: "sensitive" as const, emoji: "🔇", label: "민감해요" },
  { value: "normal" as const, emoji: "🔉", label: "보통이에요" },
  { value: "insensitive" as const, emoji: "🔊", label: "둔감해요" },
];

export default function ProfileSetupPreferencesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [cleanliness, setCleanliness] = useState<CleanlinessOption>("very");
  const [noise, setNoise] = useState<NoiseOption>("sensitive");

  const handleNext = () => {
    router.replace("/(tabs)");
  };

  return (
    <BackgroundGradient>
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <BackButton />
          <View style={styles.progressWrap}>
            <ProgressBar progress={0.6} />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'>
          <Text
            weight='bold'
            style={styles.title}>
            당신의 정보를 입력해주세요
          </Text>
          <Text
            weight='regular'
            style={styles.description}>
            입력하신 정보를 바탕으로 룸메 프로필이 추천됩니다
          </Text>

          <View style={styles.section}>
            <Text
              weight='semiBold'
              style={styles.sectionLabel}>
              청결은 얼마나 중요하게 생각하시나요?
            </Text>
            <View style={styles.optionRow}>
              {CLEANLINESS_OPTIONS.map((option) => (
                <LifestyleOptionCard
                  key={option.value}
                  emoji={option.emoji}
                  label={option.label}
                  selected={cleanliness === option.value}
                  onPress={() => setCleanliness(option.value)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text
              weight='semiBold'
              style={styles.sectionLabel}>
              소음에 얼마나 민감한가요?
            </Text>
            <View style={styles.optionRow}>
              {NOISE_OPTIONS.map((option) => (
                <LifestyleOptionCard
                  key={option.value}
                  emoji={option.emoji}
                  label={option.label}
                  selected={noise === option.value}
                  onPress={() => setNoise(option.value)}
                />
              ))}
            </View>
          </View>
        </ScrollView>

        <View
          style={[
            styles.footer,
            { paddingBottom: Math.max(insets.bottom + vs(20), vs(32)) },
          ]}>
          <Pressable
            style={({ pressed }) => [
              styles.nextButton,
              pressed && { opacity: 0.92 },
            ]}
            onPress={handleNext}
            accessibilityRole='button'
            accessibilityLabel='다음으로'>
            <Text
              weight='bold'
              style={styles.nextButtonText}>
              다음으로
            </Text>
          </Pressable>
        </View>
      </View>
    </BackgroundGradient>
  );
}
