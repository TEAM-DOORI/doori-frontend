import { useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
  type TextInput as RNTextInput,
  type StyleProp,
  type TextStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text, TextInput } from "@components/typography";
import { vs } from "@constants";
import { colorStyle } from "@constants/colors";
import { useProfileSetup } from "@/contexts/ProfileSetupContext";
import { useNavigateOnce } from "@hooks/useNavigateOnce";
import { useScaledStyles } from "@hooks/useScaledStyles";
import { createIntroStyles } from "./_styles/_profile-setup-intro.styles";

const INTRO_MAX_LENGTH = 200;

const INTRO_PLACEHOLDER = "미래의 룸메에게 보여질 자기소개를 작성해주세요.";

const ROOMMATE_WISH_PLACEHOLDER_LINES = [
  "희망하는 룸메에 대해 적어주신 내용을 바탕으로,",
  "추후 룸메 추천에 반영해드릴게요.",
] as const;

type IntroStyles = ReturnType<typeof createIntroStyles>;

type CharCountProps = {
  count: number;
  max: number;
  styles: IntroStyles;
};

function CharCount({ count, max, styles }: CharCountProps) {
  return (
    <Text
      weight='medium'
      style={styles.charCount}>
      <Text style={styles.charCountValue}>{count}</Text>/{max}
    </Text>
  );
}

type MultilineIntroFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholderLines?: readonly string[];
  placeholder?: string;
  inputStyle: StyleProp<TextStyle>;
  maxLength: number;
  fieldStyles: IntroStyles;
};

function MultilineIntroField({
  value,
  onChangeText,
  placeholderLines,
  placeholder,
  inputStyle,
  maxLength,
  fieldStyles,
}: MultilineIntroFieldProps) {
  const inputRef = useRef<RNTextInput>(null);
  const showCustomPlaceholder = placeholderLines != null && value.length === 0;

  return (
    <Pressable
      style={fieldStyles.inputBox}
      onPress={() => inputRef.current?.focus()}>
      <TextInput
        ref={inputRef}
        weight='medium'
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholder={showCustomPlaceholder ? "" : placeholder}
        placeholderTextColor={colorStyle.S04}
        multiline
        maxLength={maxLength}
        textAlignVertical='top'
      />
      {showCustomPlaceholder && placeholderLines ? (
        <View
          style={fieldStyles.placeholderOverlay}
          pointerEvents='none'>
          {placeholderLines.map((line) => (
            <Text
              key={line}
              weight='medium'
              style={fieldStyles.placeholderLine}>
              {line}
            </Text>
          ))}
        </View>
      ) : null}
    </Pressable>
  );
}

export default function ProfileSetupIntroScreen() {
  const { push } = useNavigateOnce();
  const insets = useSafeAreaInsets();
  const styles = useScaledStyles(createIntroStyles);
  const { draft, updateDraft } = useProfileSetup();
  const { introduction, roommateWish } = draft.intro;

  const footerPaddingBottom = Math.max(insets.bottom + vs(20), vs(32));
  const footerStyle = [styles.footer, { paddingBottom: footerPaddingBottom }];

  const handleNext = () => {
    push("/onboarding/onboarding-complete");
  };

  const handleIntroChange = (text: string) => {
    updateDraft({ intro: { introduction: text.slice(0, INTRO_MAX_LENGTH) } });
  };

  const handleWishChange = (text: string) => {
    updateDraft({ intro: { roommateWish: text.slice(0, INTRO_MAX_LENGTH) } });
  };

  return (
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}>
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

            <View style={styles.fields}>
              <View style={styles.field}>
                <Text
                  weight='semiBold'
                  style={styles.fieldLabel}>
                  자기소개
                </Text>
                <MultilineIntroField
                  value={introduction}
                  onChangeText={handleIntroChange}
                  placeholder={INTRO_PLACEHOLDER}
                  inputStyle={[styles.input, styles.inputIntro]}
                  maxLength={INTRO_MAX_LENGTH}
                  fieldStyles={styles}
                />
                <CharCount
                  count={introduction.length}
                  max={INTRO_MAX_LENGTH}
                  styles={styles}
                />
              </View>

              <View style={styles.field}>
                <Text
                  weight='semiBold'
                  style={styles.fieldLabel}>
                  룸메 희망 사항 한 줄
                </Text>
                <MultilineIntroField
                  value={roommateWish}
                  onChangeText={handleWishChange}
                  placeholderLines={ROOMMATE_WISH_PLACEHOLDER_LINES}
                  inputStyle={[styles.input, styles.inputWish]}
                  maxLength={INTRO_MAX_LENGTH}
                  fieldStyles={styles}
                />
                <CharCount
                  count={roommateWish.length}
                  max={INTRO_MAX_LENGTH}
                  styles={styles}
                />
              </View>
            </View>
          </ScrollView>

          <View style={footerStyle}>
            <Pressable
              style={({ pressed }) => [
                styles.startButton,
                pressed && styles.startButtonPressed,
              ]}
              onPress={handleNext}
              accessibilityRole='button'
              accessibilityLabel='시작하기'>
              <Text
                weight='bold'
                style={styles.startButtonText}>
                시작하기
              </Text>
            </Pressable>
          </View>
      </KeyboardAvoidingView>
  );
}
