import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackgroundGradient } from "../../components/layout/BackgroundGradient";
import { BackButton } from "../../components/navigation/BackButton";
import { IconSelectChip } from "../../components/profile-setup/IconSelectChip";
import { LifestyleOptionCard } from "../../components/profile-setup/LifestyleOptionCard";
import { ProgressBar } from "../../components/profile-setup/ProgressBar";
import { Text } from "../../components/typography";
import { vs } from "../../constants";
import { useProfileSetup } from "../../contexts/ProfileSetupContext";
import type {
  AtmosphereOption,
  PriorityCriterion,
} from "../../types/profile-setup";
import { useScaledStyles } from "../../hooks/useScaledStyles";
import { createMatchingScreenStyles } from "./_styles/profile-setup-matching.styles";

type AtmosphereCardOption = {
  value: AtmosphereOption;
  emoji: string;
  label: string;
  labelLines?: readonly [string, string];
};

const ATMOSPHERE_OPTIONS: AtmosphereCardOption[] = [
  { value: "quiet", emoji: "👩🏻‍💻", label: "조용하게" },
  { value: "moderate", emoji: "🙆🏻‍", label: "적당히 교류" },
  {
    value: "social",
    emoji: "👯‍♀️",
    label: "자주 어울리기",
    labelLines: ["자주", "어울리기"],
  },
];

const PRIORITY_OPTIONS: {
  value: PriorityCriterion;
  emoji: string;
  label: string;
}[] = [
  { value: "sleep", emoji: "🌙", label: "수면패턴" },
  { value: "cleanliness", emoji: "🧼", label: "청결도" },
  { value: "smoking", emoji: "🚬", label: "흡연 여부" },
  { value: "noise", emoji: "🔇", label: "소음 정도" },
  { value: "personality", emoji: "🤝", label: "성격" },
];

export default function ProfileSetupMatchingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const styles = useScaledStyles(createMatchingScreenStyles);
  const { draft, updateDraft } = useProfileSetup();
  const { atmosphere, priority } = draft.matching;

  const handleNext = () => {
    router.push("/onboarding/profile-setup-intro");
  };

  return (
    <BackgroundGradient>
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <BackButton />
          <View style={styles.progressWrap}>
            <ProgressBar progress={0.8} />
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

          <View style={styles.sections}>
            <View style={styles.section}>
              <Text
                weight='semiBold'
                style={styles.sectionLabel}>
                어떤 분위기의 생활을 원하시나요?
              </Text>
              <View style={styles.optionRow}>
                {ATMOSPHERE_OPTIONS.map((option) => (
                  <LifestyleOptionCard
                    key={option.value}
                    emoji={option.emoji}
                    label={option.label}
                    labelLines={option.labelLines}
                    selected={atmosphere === option.value}
                    onPress={() =>
                      updateDraft({ matching: { atmosphere: option.value } })
                    }
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionLabelBlock}>
                <Text
                  weight='semiBold'
                  style={[
                    styles.sectionLabel,
                    styles.sectionLabelMultiline,
                  ]}>
                  룸메를 고를 때 가장 중요한 기준을
                </Text>
                <Text
                  weight='semiBold'
                  style={[
                    styles.sectionLabel,
                    styles.sectionLabelMultiline,
                  ]}>
                  <Text
                    weight='semiBold'
                    style={styles.sectionLabelUnderline}>
                    한 가지만
                  </Text>
                  {" 선택해주세요"}
                </Text>
              </View>
              <View style={styles.criteriaRow}>
                {PRIORITY_OPTIONS.map((option) => (
                  <IconSelectChip
                    key={option.value}
                    variant='criteria'
                    emoji={option.emoji}
                    label={option.label}
                    selected={priority === option.value}
                    onPress={() =>
                      updateDraft({ matching: { priority: option.value } })
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
    </BackgroundGradient>
  );
}
