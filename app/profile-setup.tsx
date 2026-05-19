import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackgroundGradient } from "../components/layout/BackgroundGradient";
import { BackButton } from "../components/navigation/BackButton";
import { InlineChipDropdown } from "../components/profile-setup/InlineChipDropdown";
import { ProfileSetupChip } from "../components/profile-setup/ProfileSetupChip";
import { ProgressBar } from "../components/profile-setup/ProgressBar";
import { Text } from "../components/typography";
import { vs } from "../constants";
import {
  ENROLLMENT_OPTIONS,
  GRADE_OPTIONS,
  GRADUATION_PLACEHOLDER,
  getGraduationYearOptions,
  type EnrollmentOption,
  type GradeOption,
} from "../constants/profile-setup-options";
import { styles } from "./profile-setup.styles";

type PickerField = "grade" | "enrollment" | "graduation";

export default function ProfileSetupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const graduationYearOptions = useMemo(() => getGraduationYearOptions(), []);

  const [gender, setGender] = useState<"male" | "female">("male");
  const [residence, setResidence] = useState<"dorm" | "share">("dorm");
  const [grade, setGrade] = useState<GradeOption>("3학년");
  const [enrollment, setEnrollment] = useState<EnrollmentOption>("재학");
  const [graduation, setGraduation] = useState<string | null>(null);
  const [openPicker, setOpenPicker] = useState<PickerField | null>(null);

  const togglePicker = (field: PickerField) => {
    setOpenPicker((current) => (current === field ? null : field));
  };

  const handleNext = () => {
    router.push("/profile-setup-lifestyle");
  };

  return (
    <BackgroundGradient>
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <BackButton />
          <View style={styles.progressWrap}>
            <ProgressBar progress={0.2} />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
          nestedScrollEnabled>
          <Text
            weight='bold'
            style={styles.title}>
            당신의 정보를 입력해주세요
          </Text>
          <Text
            weight='regular'
            style={styles.description}>
            입력하신 정보를 바탕으로 프로필이 생성됩니다
          </Text>

          <View style={styles.section}>
            <Text
              weight='semiBold'
              style={styles.sectionLabel}>
              성별을 선택해주세요
            </Text>
            <View style={styles.rowCompact}>
              <ProfileSetupChip
                label='남성'
                selected={gender === "male"}
                onPress={() => setGender("male")}
              />
              <ProfileSetupChip
                label='여성'
                selected={gender === "female"}
                onPress={() => setGender("female")}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text
              weight='semiBold'
              style={styles.sectionLabel}>
              거주 정보를 입력해주세요
            </Text>
            <View style={styles.rowCompact}>
              <ProfileSetupChip
                label='기숙사'
                selected={residence === "dorm"}
                onPress={() => setResidence("dorm")}
              />
              <ProfileSetupChip
                label='쉐어하우스'
                selected={residence === "share"}
                onPress={() => setResidence("share")}
              />
            </View>
          </View>

          <View style={[styles.section, styles.sectionDropdown]}>
            <Text
              weight='semiBold'
              style={styles.sectionLabel}>
              현재 학년과 졸업 예정 연도를 입력해주세요
            </Text>
            <View style={styles.rowDropdownContainer}>
              <InlineChipDropdown
                label={grade}
                value={grade}
                options={GRADE_OPTIONS}
                mutedBorder
                open={openPicker === "grade"}
                zIndex={openPicker === "grade" ? 10 : 1}
                onToggle={() => togglePicker("grade")}
                onSelect={(value) => {
                  setGrade(value as GradeOption);
                  setOpenPicker(null);
                }}
              />
              <InlineChipDropdown
                label={enrollment}
                value={enrollment}
                options={ENROLLMENT_OPTIONS}
                mutedBorder
                open={openPicker === "enrollment"}
                zIndex={openPicker === "enrollment" ? 10 : 1}
                onToggle={() => togglePicker("enrollment")}
                onSelect={(value) => {
                  setEnrollment(value as EnrollmentOption);
                  setOpenPicker(null);
                }}
              />
              <InlineChipDropdown
                label={graduation ?? GRADUATION_PLACEHOLDER}
                value={graduation}
                options={graduationYearOptions}
                variant={graduation ? "field" : "placeholder"}
                wide
                open={openPicker === "graduation"}
                zIndex={openPicker === "graduation" ? 10 : 1}
                onToggle={() => togglePicker("graduation")}
                onSelect={(value) => {
                  setGraduation(value);
                  setOpenPicker(null);
                }}
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
