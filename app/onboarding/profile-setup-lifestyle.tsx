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
import { useScaledStyles } from "../../hooks/useScaledStyles";
import { createLifestyleScreenStyles } from "./_styles/profile-setup-lifestyle.styles";

export default function ProfileSetupLifestyleScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const styles = useScaledStyles(createLifestyleScreenStyles);
  const { draft, updateDraft } = useProfileSetup();
  const { smoking, sleep } = draft.lifestyle;

  const handleNext = () => {
    router.push("/onboarding/profile-setup-preferences");
  };

  return (
    <BackgroundGradient>
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <BackButton />
          <View style={styles.progressWrap}>
            <ProgressBar progress={0.4} />
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
              흡연 여부를 선택해주세요
            </Text>
            <View style={styles.rowCompact}>
              <IconSelectChip
                emoji='🚭'
                label='비흡연'
                selected={smoking === "non-smoker"}
                onPress={() =>
                  updateDraft({ lifestyle: { smoking: "non-smoker" } })
                }
              />
              <IconSelectChip
                emoji='🚬'
                label='흡연'
                selected={smoking === "smoker"}
                onPress={() =>
                  updateDraft({ lifestyle: { smoking: "smoker" } })
                }
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text
              weight='semiBold'
              style={styles.sectionLabel}>
              보통 언제 잠에 드나요?
            </Text>
            <View style={styles.sleepRow}>
              <LifestyleOptionCard
                emoji='☀'
                label='일찍 자요'
                selected={sleep === "early"}
                onPress={() => updateDraft({ lifestyle: { sleep: "early" } })}
              />
              <LifestyleOptionCard
                emoji='🌙'
                label='늦게 자요'
                selected={sleep === "late"}
                onPress={() => updateDraft({ lifestyle: { sleep: "late" } })}
              />
              <LifestyleOptionCard
                emoji='⏰'
                label='일정하지 않아요'
                labelLines={["일정하지", "않아요"]}
                dimEmojiWhenUnselected
                selected={sleep === "irregular"}
                onPress={() =>
                  updateDraft({ lifestyle: { sleep: "irregular" } })
                }
              />
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
