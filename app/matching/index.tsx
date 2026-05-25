import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
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
import {
  FILTER_CHIP_OPTIONS,
  RECOMMENDED_ROOMMATES,
  getMatchingSectionSubtitle,
  roommateMatchesFilter,
  type FilterChipOption,
  type RecommendedRoommate,
} from "../../mocks/matching-recommendations";
import { createRecommendationsStyles } from "./_styles/recommendations.styles";

export default function MatchingRecommendationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const styles = useScaledStyles(createRecommendationsStyles);
  const [activeFilters, setActiveFilters] = useState<FilterChipOption[]>([]);
  const sectionSubtitle = useMemo(() => getMatchingSectionSubtitle(), []);

  const handleRoommatePress = useCallback(
    (id: string) => {
      router.push(`/roommate/${id}` as never);
    },
    [router]
  );

  const toggleFilter = (option: FilterChipOption) => {
    setActiveFilters((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const filteredList = useMemo(() => {
    if (activeFilters.length === 0) {
      return RECOMMENDED_ROOMMATES;
    }
    return RECOMMENDED_ROOMMATES.filter((item) =>
      activeFilters.every((filter) =>
        roommateMatchesFilter(item.traits, filter)
      )
    );
  }, [activeFilters]);

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
            {FILTER_CHIP_OPTIONS.map((option) => {
              const active = activeFilters.includes(option);
              return (
                <Pressable
                  key={option}
                  style={[styles.filterChip, active && styles.filterChipActive]}
                  onPress={() => toggleFilter(option)}
                  accessibilityRole='button'
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={option}>
                  <Text
                    weight='medium'
                    style={[
                      styles.filterChipText,
                      active && styles.filterChipTextActive,
                    ]}>
                    {option}
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
