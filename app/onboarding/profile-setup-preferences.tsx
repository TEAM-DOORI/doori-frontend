import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LifestyleOptionCard } from "../../components/profile-setup/LifestyleOptionCard";
import { Text } from "../../components/typography";
import { vs } from "../../constants";
import { useProfileSetup } from "../../contexts/ProfileSetupContext";
import type { CleanlinessOption, NoiseOption } from "../../types/profile-setup";
import { useScaledStyles } from "../../hooks/useScaledStyles";
import { createPreferencesScreenStyles } from "./_styles/profile-setup-preferences.styles";

type PreferenceCardOption<T extends string> = {
  value: T;
  emoji: string;
  label: string;
  labelLines?: readonly [string, string];
};

const CLEANLINESS_OPTIONS: PreferenceCardOption<CleanlinessOption>[] = [
  { value: "very", emoji: "🧼", label: "매우 중요" },
  { value: "normal", emoji: "🙂", label: "보통" },
  {
    value: "low",
    emoji: "😅",
    label: "크게 신경 안 써요",
    labelLines: ["크게 신경", "안 써요"],
  },
];

const NOISE_OPTIONS: PreferenceCardOption<NoiseOption>[] = [
  { value: "sensitive", emoji: "🔇", label: "민감해요" },
  { value: "normal", emoji: "🔉", label: "보통이에요" },
  { value: "insensitive", emoji: "🔊", label: "둔감해요" },
];

export default function ProfileSetupPreferencesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const styles = useScaledStyles(createPreferencesScreenStyles);
  const { draft, updateDraft } = useProfileSetup();
  const { cleanliness, noise } = draft.preferences;

  const handleNext = () => {
    router.push("/onboarding/profile-setup-matching");
  };

  return (
    <View style={styles.screen}>
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

          <View style={styles.sections}>
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
                    labelLines={option.labelLines}
                    selected={cleanliness === option.value}
                    onPress={() =>
                      updateDraft({
                        preferences: { cleanliness: option.value },
                      })
                    }
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
                    labelLines={option.labelLines}
                    selected={noise === option.value}
                    onPress={() =>
                      updateDraft({ preferences: { noise: option.value } })
                    }
                  />
                ))}
              </View>
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
  );
}
