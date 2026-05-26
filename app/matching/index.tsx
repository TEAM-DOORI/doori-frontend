import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type ListRenderItem,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MatchingFeaturedCarousel } from "../../components/matching/MatchingFeaturedCarousel";
import { MatchingIntroTitle } from "../../components/matching/MatchingIntroTitle";
import { RoommateListItem } from "../../components/matching/RoommateListItem";
import { BackButton } from "../../components/navigation/BackButton";
import { Text } from "../../components/typography";
import { useScaledStyles } from "../../hooks/useScaledStyles";
import { MATCHING_QUICK_CHIPS } from "../../constants/matching-filter-options";
import { useMatchingFilters } from "../../contexts/MatchingFilterContext";
import { applyMatchingFilters } from "../../lib/matching/apply-matching-filters";
import type { MatchingQuickChip } from "../../types/matching-filter";
import {
  RECOMMENDED_ROOMMATES,
  getMatchingSectionSubtitle,
  type RecommendedRoommate,
} from "../../mocks/matching-recommendations";
import { createRecommendationsStyles } from "./_styles/recommendations.styles";

export default function MatchingRecommendationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const styles = useScaledStyles(createRecommendationsStyles);
  const { filters, updateFilters } = useMatchingFilters();
  const sectionSubtitle = useMemo(() => getMatchingSectionSubtitle(), []);

  const handleRoommatePress = useCallback(
    (id: string) => {
      router.push(`/roommate/${id}` as never);
    },
    [router]
  );

  const filteredList = useMemo(
    () => applyMatchingFilters(RECOMMENDED_ROOMMATES, filters),
    [filters]
  );

  const toggleQuickChip = (chip: MatchingQuickChip) => {
    const has = filters.quickChips.includes(chip);
    updateFilters({
      quickChips: has
        ? filters.quickChips.filter((c) => c !== chip)
        : [...filters.quickChips, chip],
    });
  };

  const renderListItem: ListRenderItem<RecommendedRoommate> = useCallback(
    ({ item }) => (
      <RoommateListItem
        item={item}
        onPress={handleRoommatePress}
      />
    ),
    [handleRoommatePress]
  );

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.gradientSection}>
          <LinearGradient
            colors={["#D3E0FF", "#FFFFFF"]}
            locations={[0, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={{ paddingTop: insets.top }}>
            <View style={styles.hero}>
              <View style={styles.backRow}>
                <BackButton
                  iconColor='#3B3869'
                  iconSize={28}
                  compact
                />
              </View>
              <View style={styles.introWrap}>
                <MatchingIntroTitle />
              </View>
              <View style={styles.carouselSection}>
                <MatchingFeaturedCarousel onPress={handleRoommatePress} />
              </View>
            </View>
          </View>
          <View
            style={styles.characterWrap}
            pointerEvents='box-none'>
            <Image
              source={require("../../assets/images/matching/matching-character.png")}
              style={styles.character}
              contentFit='contain'
              pointerEvents='none'
              accessibilityLabel='룸메 매칭 안내 캐릭터'
            />
          </View>
        </View>

        <View style={styles.bottomPanel}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitles}>
              <Text
                weight='bold'
                style={styles.sectionTitle}>
                추천 룸메이트
              </Text>
              <Text
                weight="regular"
                style={styles.sectionSubtitle}>
                {sectionSubtitle}
              </Text>
            </View>
            <Pressable
              style={styles.headerBackHit}
              onPress={() => router.back()}
              accessibilityRole='button'
              accessibilityLabel='뒤로 가기'>
              <Feather
                name='chevron-right'
                size={28}
                color='#A2A7AB'
              />
            </Pressable>
          </View>

          <View style={styles.filterRow}>
            <Pressable
              style={[styles.filterChip, styles.filterChipWide]}
              onPress={() => router.push("/matching/filter")}
              accessibilityRole='button'
              accessibilityLabel='필터'>
              <Image
                source={require("../../assets/images/matching/filter-icon.svg")}
                style={styles.filterIcon}
                contentFit='contain'
              />
              <Text
                weight='medium'
                style={styles.filterChipText}>
                필터
              </Text>
            </Pressable>
            {MATCHING_QUICK_CHIPS.map((chip) => {
              const active = filters.quickChips.includes(chip);
              return (
                <Pressable
                  key={chip}
                  style={[styles.filterChip, active && styles.filterChipActive]}
                  onPress={() => toggleQuickChip(chip)}
                  accessibilityRole='button'
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={chip}>
                  <Text
                    weight='medium'
                    style={[
                      styles.filterChipText,
                      active && styles.filterChipTextActive,
                    ]}>
                    {chip}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.divider} />

          <FlatList
            data={filteredList}
            keyExtractor={(item) => item.id}
            renderItem={renderListItem}
            scrollEnabled={false}
            contentContainerStyle={styles.list}
          />
        </View>
      </ScrollView>
    </View>
  );
}
