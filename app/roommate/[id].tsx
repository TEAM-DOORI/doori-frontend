import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackButton } from "../../components/navigation/BackButton";
import { Text } from "../../components/typography";
import { colorStyle } from "../../constants/colors";
import { useScaledStyles } from "../../hooks/useScaledStyles";
import { getRoommateDetail } from "../../mocks/roommate-detail";
import { createRoommateDetailStyles } from "./_styles/roommate-detail.styles";

export default function RoommateDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const styles = useScaledStyles(createRoommateDetailStyles);

  const roommate = id ? getRoommateDetail(id) : undefined;

  if (!roommate) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <BackButton />
        </View>
        <View style={{ padding: 20 }}>
          <Text weight="medium">룸메이트 정보를 찾을 수 없습니다.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <BackButton iconColor="#3B3869" iconSize={28} compact />
        </View>

        <View style={styles.profileRow}>
          <View style={styles.avatarWrap}>
            <Image
              source={roommate.profile}
              style={styles.avatar}
              contentFit="cover"
            />
            <View style={styles.onlineDot} />
          </View>
          <View style={styles.profileText}>
            <Text weight="bold" style={styles.name}>
              {roommate.name}
            </Text>
            <Text weight="regular" style={styles.matchSummary}>
              {roommate.matchSummary}
            </Text>
          </View>
        </View>

        <View style={styles.arcBackground}>
          <LinearGradient
            colors={["#FFFFFF", "rgba(255,255,255,0)"]}
            locations={[0, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.arcGradient}
          />
          <View style={styles.matchSection}>
            <View style={styles.matchRateBlock}>
              <Text weight="semiBold" style={styles.matchLabel}>
                나와의 매칭률
              </Text>
              <View style={styles.matchRateRow}>
                <Text weight="semiBold" style={styles.matchRateValue}>
                  {roommate.matchRate}
                </Text>
                <Text weight="bold" style={styles.matchRateSuffix}>
                  %
                </Text>
              </View>
            </View>
            <View style={styles.tagsWrap}>
              {roommate.personalityTags.map((tag) => (
                <View key={tag} style={styles.tagChip}>
                  <Text weight="medium" style={styles.tagChipText}>
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.contentSection}>
          <LinearGradient
            colors={["#FFF9DD", "#FFF195"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.introCardOuter}>
            <View style={styles.introCardInner}>
              <Text weight="semiBold" style={styles.introTitle}>
                자기소개
              </Text>
              <View style={styles.introBodyWrap}>
                {roommate.introductionLines.map((line) => (
                  <Text
                    key={line}
                    weight="medium"
                    style={styles.introBodyLine}>
                    {line}
                  </Text>
                ))}
              </View>
            </View>
          </LinearGradient>

          <View style={styles.divider} />

          <View style={styles.preferencesSection}>
            <Text weight="semiBold" style={styles.preferencesTitle}>
              이런 룸메를 원해요
            </Text>
            <View style={styles.preferencesList}>
              {roommate.preferredTraits.map((trait) => (
                <LinearGradient
                  key={trait}
                  colors={[colorStyle.Main2, colorStyle.Main]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={styles.preferenceChipOuter}>
                  <View style={styles.preferenceChipInner}>
                    <Text weight="semiBold" style={styles.preferenceChipText}>
                      {trait}
                    </Text>
                  </View>
                </LinearGradient>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { paddingBottom: Math.max(insets.bottom, 30) },
        ]}>
        <View style={styles.footerRow}>
          <Pressable
            style={({ pressed }) => [
              styles.favoriteButton,
              pressed && { opacity: 0.85 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="관심 룸메이트">
            <Image
              source={require("../../assets/images/roommate-detail/heart-straight.svg")}
              style={styles.favoriteIcon}
              contentFit="fill"
            />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.ctaButton,
              pressed && { opacity: 0.9 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="룸메 요청 보내기">
            <Text weight="semiBold" style={styles.ctaText}>
              룸메 요청 보내기
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
