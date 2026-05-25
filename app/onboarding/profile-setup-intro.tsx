import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackgroundGradient } from "../../components/layout/BackgroundGradient";
import { BackButton } from "../../components/navigation/BackButton";
import { ProgressBar } from "../../components/profile-setup/ProgressBar";
import { Text, TextInput } from "../../components/typography";
import { vs } from "../../constants";
import { colorStyle } from "../../constants/colors";
import { useProfileSetup } from "../../contexts/ProfileSetupContext";
import { styles } from "./_styles/profile-setup-intro.styles";

export default function ProfileSetupIntroScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { draft, updateDraft } = useProfileSetup();
  const { introduction, roommateWish } = draft.intro;

  const handleNext = () => {
    router.push("/onboarding/onboarding-complete");
  };

  return (
    <BackgroundGradient>
      <KeyboardAvoidingView
        style={styles.safeArea}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={insets.top}>
        <View style={[styles.safeArea, { paddingTop: insets.top }]}>
          <View style={styles.header}>
            <BackButton />
            <View style={styles.progressWrap}>
              <ProgressBar progress={1} />
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

            <View style={styles.field}>
              <Text
                weight='semiBold'
                style={styles.fieldLabel}>
                한 줄 소개
              </Text>
              <TextInput
                weight='medium'
                style={[styles.input, styles.inputShort]}
                value={introduction}
                onChangeText={(text) =>
                  updateDraft({ intro: { introduction: text } })
                }
                placeholder='미래의 룸메에게 보여질 자기소개를 작성해주세요.'
                placeholderTextColor={colorStyle.S04}
                multiline
                textAlignVertical='top'
              />
            </View>

            <View style={styles.field}>
              <Text
                weight='semiBold'
                style={styles.fieldLabel}>
                룸메 희망 사항 한 줄
              </Text>
              <TextInput
                weight='medium'
                style={[styles.input, styles.inputTall]}
                value={roommateWish}
                onChangeText={(text) =>
                  updateDraft({ intro: { roommateWish: text } })
                }
                placeholder='희망하는 룸메에 대해 적어주신 내용을 바탕으로, 추후 룸메 추천에 반영해드릴게요.'
                placeholderTextColor={colorStyle.S04}
                multiline
                textAlignVertical='top'
              />
            </View>
          </ScrollView>

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
              onPress={handleNext}
              accessibilityRole='button'
              accessibilityLabel='다음으로'>
              <Text
                weight='bold'
                style={styles.startButtonText}>
                다음으로
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </BackgroundGradient>
  );
}
