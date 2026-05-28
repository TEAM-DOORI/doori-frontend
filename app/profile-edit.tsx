import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CustomAlert } from "../components/common/CustomAlert";
import { Text, TextInput } from "../components/typography";
import { vs } from "../constants";
import { PROFILE_EDIT_DEFAULT, PROFILE_EDIT_LIMITS } from "../mocks/profile-edit";
import { COLORS, styles } from "./profile-edit.styles";

type LifestyleType = "morning" | "evening";

export default function ProfileEditScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [lifestyle, setLifestyle] = useState<LifestyleType>(
    PROFILE_EDIT_DEFAULT.lifestyle,
  );
  const [name, setName] = useState<string>(PROFILE_EDIT_DEFAULT.name);
  const [school] = useState<string>(PROFILE_EDIT_DEFAULT.school);
  const [introduction, setIntroduction] = useState<string>(
    PROFILE_EDIT_DEFAULT.introduction,
  );
  const [myTags] = useState([...PROFILE_EDIT_DEFAULT.myTags]);
  const [wantedTagInput, setWantedTagInput] = useState("");
  const [roommateTags, setRoommateTags] = useState<string[]>(
    PROFILE_EDIT_DEFAULT.roommateTags,
  );
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const introCount = introduction.length;
  const isRoommateTagLimitReached =
    roommateTags.length >= PROFILE_EDIT_LIMITS.roommateTagMax;

  const openAlert = (message: string) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleAddRoommateTag = () => {
    const tag = wantedTagInput.trim();
    if (!tag) {
      openAlert("태그를 입력해주세요.");
      return;
    }
    if (roommateTags.length >= PROFILE_EDIT_LIMITS.roommateTagMax) {
      openAlert(
        `원하는 룸메 태그는 최대 ${PROFILE_EDIT_LIMITS.roommateTagMax}개까지 추가할 수 있어요.`,
      );
      return;
    }
    setRoommateTags((prev) => [...prev, tag]);
    setWantedTagInput("");
  };

  const lifestyleOptions = useMemo(
    () => [
      { key: "morning" as const, label: "아침형" },
      { key: "evening" as const, label: "저녁형" },
    ],
    [],
  );

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 140) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="뒤로가기"
          >
            <Feather name="chevron-left" size={24} color={COLORS.text} />
          </Pressable>
          <Text weight="bold" style={styles.headerTitle}>
            프로필 수정
          </Text>
        </View>

        <LinearGradient
          colors={["#FFFFFF", "rgba(255,255,255,0)"]}
          locations={[0, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.heroSection}
        >
          <View style={styles.heroInner}>
            <Image
              source={require("../assets/images/mypage/profile-avatar.png")}
              style={styles.profileImage}
              contentFit="cover"
              accessibilityLabel="프로필 이미지"
            />

            <View style={styles.lifestyleWrap}>
              {lifestyleOptions.map((option) => {
                const selected = lifestyle === option.key;
                return (
                  <Pressable
                    key={option.key}
                    style={[
                      styles.lifestyleOption,
                      selected && styles.lifestyleOptionActive,
                    ]}
                    onPress={() => setLifestyle(option.key)}
                    accessibilityRole="button"
                    accessibilityLabel={option.label}
                  >
                    <Text
                      weight="medium"
                      style={[styles.lifestyleText, selected && styles.lifestyleTextActive]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
          <View style={styles.divider} />
        </LinearGradient>
        <View style={styles.topDivider} />

        <View style={styles.section}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            이름
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.inputBox}
            placeholder="이름을 입력해주세요"
            placeholderTextColor={COLORS.textPlaceholder}
          />
        </View>

        <View style={styles.section}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            학교
          </Text>
          <View style={styles.schoolRow}>
            <TextInput
              value={school}
              style={[styles.inputBox, styles.schoolInput]}
              placeholder="학교를 입력해주세요"
              placeholderTextColor={COLORS.textPlaceholder}
              editable={false}
            />
            <Text weight="medium" style={styles.verifiedText}>
              인증완료
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            자기소개
          </Text>
          <TextInput
            value={introduction}
            onChangeText={(text) =>
              setIntroduction(text.slice(0, PROFILE_EDIT_LIMITS.introductionMax))
            }
            style={[styles.inputBox, styles.introInput]}
            placeholder="미래의 룸메에게 보여질 자기소개를 작성해주세요."
            placeholderTextColor={COLORS.textPlaceholder}
            multiline
          />
          <Text weight="medium" style={styles.countText}>
            <Text style={styles.countCurrent}>{introCount}</Text>/
            {PROFILE_EDIT_LIMITS.introductionMax}
          </Text>
        </View>

        <View style={styles.section}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            나를 나타내는 태그
          </Text>
          <View style={styles.chipList}>
            {myTags.map((tag) => (
              <View key={tag} style={styles.chip}>
                <Text weight="medium" style={styles.chipText}>
                  {tag}
                </Text>
                <Feather name="x" size={14} color={COLORS.primary} />
              </View>
            ))}
          </View>
          <TextInput
            value=""
            editable={false}
            style={styles.addTagInput}
            placeholder="+ 새로 추가하고 싶은 태그를 작성해주세요!"
            placeholderTextColor={COLORS.textPlaceholder}
          />
        </View>

        <View style={styles.section}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            이런 룸메를 원해요
          </Text>
          <TextInput
            value={wantedTagInput}
            onChangeText={setWantedTagInput}
            style={[styles.addTagInput, styles.roommateTagInput]}
            placeholder="원하는 룸메에 대한 태그를 작성해주세요. (최대 3개)"
            placeholderTextColor={COLORS.textPlaceholder}
            editable={!isRoommateTagLimitReached}
          />
          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleAddRoommateTag}
            accessibilityRole="button"
            accessibilityLabel="원하는 룸메 태그 추가"
          >
            <Text weight="regular" style={styles.addButtonText}>
              +
            </Text>
          </Pressable>
          {roommateTags.length > 0 && (
            <View style={styles.chipList}>
              {roommateTags.map((tag) => (
                <View key={tag} style={styles.chip}>
                  <Text weight="medium" style={styles.chipText}>
                    {tag}
                  </Text>
                  <Feather name="x" size={14} color={COLORS.primary} />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, vs(20)) }]}>
        <Pressable style={styles.saveButton} accessibilityRole="button" accessibilityLabel="저장하기">
          <Text weight="semiBold" style={styles.saveButtonText}>
            저장하기
          </Text>
        </Pressable>
      </View>

      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onConfirm={() => setAlertVisible(false)}
      />
    </View>
  );
}
