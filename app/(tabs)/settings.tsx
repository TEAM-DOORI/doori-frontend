import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useGlobalAlert } from "@components/common/GlobalAlertProvider";
import { Text } from "@components/typography";
import { vs } from "@constants";
import {
  MY_PAGE_MENU_SECTIONS,
  MY_PAGE_USER,
  type MyPageMenuItem,
} from "@/mocks/mypage";
import { COLORS, createSettingsLayoutStyles, styles } from "./settings.styles";

function MenuDivider() {
  return <View style={styles.divider} />;
}

function MenuRow({
  item,
  onPress,
}: {
  item: MyPageMenuItem;
  onPress: (item: MyPageMenuItem) => void;
}) {
  const handlePress = useCallback(() => onPress(item), [item, onPress]);

  return (
    <Pressable
      style={({ pressed }) => [styles.menuRow, pressed && styles.menuRowPressed]}
      onPress={handlePress}
      accessibilityRole='button'
      accessibilityLabel={item.label}>
      <Text
        weight='semiBold'
        style={styles.menuLabel}>
        {item.label}
      </Text>
      <Feather
        name='chevron-right'
        size={24}
        color={COLORS.text}
      />
    </Pressable>
  );
}

function MenuSection({
  title,
  items,
  onItemPress,
}: {
  title: string;
  items: MyPageMenuItem[];
  onItemPress: (item: MyPageMenuItem) => void;
}) {
  return (
    <View style={styles.menuSection}>
      <Text
        weight='semiBold'
        style={styles.sectionTitle}>
        {title}
      </Text>
      <View style={styles.menuItems}>
        {items.map((item) => (
          <MenuRow
            key={item.id}
            item={item}
            onPress={onItemPress}
          />
        ))}
      </View>
    </View>
  );
}

export default function MyPageScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showAlert } = useGlobalAlert();

  const showComingSoon = useCallback((label: string) => {
    showAlert({
      title: label,
      message: "준비 중인 기능입니다.",
    });
  }, [showAlert]);

  const handleMenuPress = useCallback(
    (item: MyPageMenuItem) => showComingSoon(item.label),
    [showComingSoon]
  );

  const layoutStyles = useMemo(
    () =>
      createSettingsLayoutStyles({
        paddingTop: insets.top,
        paddingBottom: Math.max(insets.bottom, vs(24)),
      }),
    [insets.bottom, insets.top],
  );

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, layoutStyles.scrollContentInset]}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.content, layoutStyles.contentInset]}>
          <Text
            weight='bold'
            style={styles.pageTitle}>
            마이페이지
          </Text>

          <LinearGradient
            colors={["#FFFFFF", "rgba(255,255,255,0)"]}
            locations={[0, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.heroSection}>
            <View style={styles.heroInner}>
              <View style={styles.profileBlock}>
                <View style={styles.profileRing}>
                  <Image
                    source={require("../../assets/images/mypage/profile-avatar.png")}
                    style={styles.profileImage}
                    contentFit='cover'
                    accessibilityLabel='프로필 이미지'
                  />
                </View>
                <Text
                  style={styles.userInfoLine}
                  accessibilityRole='text'
                  accessibilityLabel={`${MY_PAGE_USER.school} ${MY_PAGE_USER.name}`}>
                  <Text
                    weight='regular'
                    style={styles.schoolInline}>
                    {MY_PAGE_USER.school}
                    {"  "}
                  </Text>
                  <Text
                    weight='bold'
                    style={styles.userNameInline}>
                    {MY_PAGE_USER.name}
                  </Text>
                </Text>
              </View>
              <View style={styles.actionRow}>
                <Pressable
                  style={({ pressed }) => [
                    styles.actionCard,
                    pressed && styles.actionCardPressed,
                  ]}
                  onPress={() => router.push("/profile-edit")}
                  accessibilityRole='button'
                  accessibilityLabel='프로필 수정'>
                  <Image
                    source={require("./assets/tabbar/star-tab.png")}
                    style={styles.actionIcon}
                    contentFit='contain'
                  />
                  <Text
                    weight='semiBold'
                    style={styles.actionLabel}
                    numberOfLines={1}>
                    프로필 수정
                  </Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.actionCard,
                    pressed && styles.actionCardPressed,
                  ]}
                  onPress={() => showComingSoon("희망 규칙 설정")}
                  accessibilityRole='button'
                  accessibilityLabel='희망 규칙 설정'>
                  <Image
                    source={require("./assets/tabbar/book-tab.png")}
                    style={styles.actionIcon}
                    contentFit='contain'
                  />
                  <Text
                    weight='semiBold'
                    style={styles.actionLabel}
                    numberOfLines={1}>
                    희망 규칙 설정
                  </Text>
                </Pressable>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.menuWrap}>
            {MY_PAGE_MENU_SECTIONS.map((section, index) => (
              <View key={section.id}>
                {index > 0 && <MenuDivider />}
                <MenuSection
                  title={section.title}
                  items={section.items}
                  onItemPress={handleMenuPress}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
