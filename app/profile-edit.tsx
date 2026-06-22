import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useGlobalAlert } from "@components/common/GlobalAlertProvider";
import { Text, TextInput } from "@components/typography";
import { vs } from "@constants";
import { PROFILE_EDIT_DEFAULT, PROFILE_EDIT_LIMITS } from "@/mocks/profile-edit";
import { canAddRoommateTag } from "@/utils/profileEditTags";
import { COLORS, createProfileEditLayoutStyles, styles } from "./profile-edit.styles";

type LifestyleType = "morning" | "evening";
const PROFILE_EDIT_STORAGE_KEY = "profile-edit:draft";
const LIFESTYLE_OPTIONS: { key: LifestyleType; label: string }[] = [
  { key: "morning", label: "아침형" },
  { key: "evening", label: "저녁형" },
];

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
  const [myTags, setMyTags] = useState<string[]>([...PROFILE_EDIT_DEFAULT.myTags]);
  const [wantedTagInput, setWantedTagInput] = useState("");
  const [roommateTags, setRoommateTags] = useState<string[]>(
    [...PROFILE_EDIT_DEFAULT.roommateTags],
  );
  const [isSaving, setIsSaving] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { showAlert } = useGlobalAlert();

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const introCount = introduction.length;
  const isRoommateTagLimitReached =
    roommateTags.length >= PROFILE_EDIT_LIMITS.roommateTagMax;

  useEffect(() => {
    let mounted = true;

    const loadProfileDraft = async () => {
      try {
        const raw = await AsyncStorage.getItem(PROFILE_EDIT_STORAGE_KEY);
        if (!raw || !mounted) return;
        const parsed = JSON.parse(raw) as {
          lifestyle?: LifestyleType;
          name?: string;
          introduction?: string;
          myTags?: string[];
          roommateTags?: string[];
        };

        if (parsed.lifestyle === "morning" || parsed.lifestyle === "evening") {
          setLifestyle(parsed.lifestyle);
        }
        if (typeof parsed.name === "string") setName(parsed.name);
        if (typeof parsed.introduction === "string") {
          setIntroduction(parsed.introduction.slice(0, PROFILE_EDIT_LIMITS.introductionMax));
        }
        if (Array.isArray(parsed.myTags)) setMyTags(parsed.myTags);
        if (Array.isArray(parsed.roommateTags)) {
          setRoommateTags(parsed.roommateTags.slice(0, PROFILE_EDIT_LIMITS.roommateTagMax));
        }
      } catch {
        // 초안 복원 실패 시 기본값으로 진행
      }
    };

    loadProfileDraft();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAddRoommateTag = () => {
    const result = canAddRoommateTag(roommateTags, wantedTagInput);
    if (!result.ok) {
      if (result.reason === "empty") {
        showAlert({ message: "태그를 입력해주세요." });
        return;
      }
      if (result.reason === "limit") {
        showAlert({
          message: `원하는 룸메 태그는 최대 ${PROFILE_EDIT_LIMITS.roommateTagMax}개까지 추가할 수 있어요.`,
        });
        return;
      }
      showAlert({ message: "이미 추가된 태그입니다." });
      return;
    }

    setRoommateTags((prev) => [...prev, result.value]);
    setWantedTagInput("");
  };

  const handleRemoveMyTag = (tagToRemove: string) => {
    setMyTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleRemoveRoommateTag = (tagToRemove: string) => {
    setRoommateTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      showAlert({
        title: "입력 확인",
        message: "이름을 입력해주세요.",
      });
      return;
    }

    const payload = {
      lifestyle,
      name: trimmedName,
      school,
      introduction: introduction.trim(),
      myTags,
      roommateTags,
      updatedAt: new Date().toISOString(),
    };

    setIsSaving(true);
    try {
      await AsyncStorage.setItem(PROFILE_EDIT_STORAGE_KEY, JSON.stringify(payload));
      showAlert({
        title: "저장 완료",
        message: "프로필 정보가 저장되었습니다.",
      });
    } catch {
      showAlert({
        title: "저장 실패",
        message: "저장 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const footerBottomInset =
    keyboardHeight > 0 ? vs(20) : Math.max(insets.bottom, vs(20));

  const layoutStyles = useMemo(
    () =>
      createProfileEditLayoutStyles({
        paddingTop: insets.top,
        scrollPaddingBottom: vs(24),
        footerPaddingBottom: footerBottomInset,
        keyboardPaddingBottom: keyboardHeight,
      }),
    [footerBottomInset, insets.top, keyboardHeight],
  );

  return (
    <View
      style={[
        styles.root,
        Platform.OS === "android" && keyboardHeight > 0 && layoutStyles.rootKeyboardInset,
      ]}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.content, layoutStyles.scrollContentInset]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets
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
              {LIFESTYLE_OPTIONS.map((option) => {
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
                <Pressable
                  onPress={() => handleRemoveMyTag(tag)}
                  accessibilityRole="button"
                  accessibilityLabel={`${tag} 태그 삭제`}
                >
                  <Feather name="x" size={14} color={COLORS.primary} />
                </Pressable>
              </View>
            ))}
          </View>
          <TextInput
            value=""
            editable={false}
            style={[styles.addTagInput, styles.addTagInputDisabled]}
            placeholder="태그 추가 기능 준비 중입니다."
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
              pressed && styles.pressedAddButton,
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
              {roommateTags.map((tag, index) => (
                <View key={`${tag}-${index}`} style={styles.chip}>
                  <Text weight="medium" style={styles.chipText}>
                    {tag}
                  </Text>
                  <Pressable
                    onPress={() => handleRemoveRoommateTag(tag)}
                    accessibilityRole="button"
                    accessibilityLabel={`${tag} 태그 삭제`}
                  >
                    <Feather name="x" size={14} color={COLORS.primary} />
                  </Pressable>
                </View>
              ))}
            </View>
          )}
        </View>
        </ScrollView>

        <View style={[styles.footer, layoutStyles.footerInset]}>
          <Pressable
            style={({ pressed }) => [
              styles.saveButton,
              (pressed || isSaving) && styles.pressedSaveButton,
            ]}
            onPress={handleSave}
            disabled={isSaving}
            accessibilityRole="button"
            accessibilityLabel="저장하기"
          >
            <Text weight="semiBold" style={styles.saveButtonText}>
              {isSaving ? "저장 중..." : "저장하기"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
