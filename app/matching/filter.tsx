import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, View, type ListRenderItem } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ActiveFilterPill } from "../../components/matching/ActiveFilterPill";
import { MatchingFilterSheet } from "../../components/matching/MatchingFilterSheet";
import { RoommateListItem } from "../../components/matching/RoommateListItem";
import { BackButton } from "../../components/navigation/BackButton";
import { Text, TextInput } from "../../components/typography";
import { MATCHING_SHORTCUT_CHIPS } from "../../constants/matching-filter-options";
import { useMatchingFilters } from "../../contexts/MatchingFilterContext";
import { useScaledStyles } from "../../hooks";
import {
  applyMatchingFilters,
  getActiveFilterLabels,
  removeFilterByLabel,
} from "../../lib/matching/apply-matching-filters";
import {
  isShortcutChipActive,
  toggleShortcutChip,
} from "../../lib/matching/matching-shortcut-chip";
import { RECOMMENDED_ROOMMATES } from "../../mocks/matching-recommendations";
import type { MatchingFilters } from "../../types/matching-filter";
import type { RecommendedRoommate } from "../../types/recommended-roommate";
import { createMatchingFilterScreenStyles } from "./_styles/filter.styles";

export default function MatchingFilterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const styles = useScaledStyles(createMatchingFilterScreenStyles);
  const { filters, setFilters } = useMatchingFilters();
  const [draft, setDraft] = useState<MatchingFilters>(filters);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const activeLabels = useMemo(() => getActiveFilterLabels(draft), [draft]);

  const filteredList = useMemo(() => {
    const base = applyMatchingFilters(RECOMMENDED_ROOMMATES, draft);
    const trimmed = searchQuery.trim();

    if (!trimmed) return base;
    return base.filter((item) => item.name.includes(trimmed));
  }, [draft, searchQuery]);

  const applyDraft = useCallback(
    (next: MatchingFilters) => {
      setDraft(next);
      setFilters(next);
    },
    [setFilters]
  );

  const handleRoommatePress = useCallback(
    (id: string) => {
      router.push(`/roommate/${id}` as never);
    },
    [router]
  );

  const renderListItem: ListRenderItem<RecommendedRoommate> = useCallback(
    ({ item }) => (
      <RoommateListItem
        item={item}
        onPress={handleRoommatePress}
      />
    ),
    [handleRoommatePress]
  );

  const closeSheet = () => setSheetOpen(false);

  return (
    <View style={styles.root}>
      <FlatList
        style={styles.list}
        contentContainerStyle={[styles.listContent, { paddingTop: insets.top }]}
        data={filteredList}
        keyExtractor={(item) => item.id}
        renderItem={renderListItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <View style={styles.topRow}>
              <View style={styles.backButtonWrap}>
                <BackButton
                  iconColor='#1A3262'
                  iconSize={30}
                  compact
                />
              </View>
              <View style={styles.searchInputWrap}>
                <Feather
                  name='search'
                  size={16}
                  color='#6B7280'
                />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder='이름으로 검색' //임시 placeholder
                  style={styles.searchInput}
                  returnKeyType='search'
                />
                {searchQuery.length > 0 ? (
                  <Pressable
                    onPress={() => setSearchQuery("")}
                    hitSlop={8}
                    style={styles.searchClearButton}
                    accessibilityRole='button'
                    accessibilityLabel='검색어 지우기'>
                    <Feather
                      name='x'
                      size={16}
                      color='#888D91'
                    />
                  </Pressable>
                ) : null}
              </View>
            </View>

            <View style={styles.filterRow}>
              <Pressable
                style={[styles.filterChip, styles.filterChipWide]}
                onPress={() => setSheetOpen(true)}
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
              {MATCHING_SHORTCUT_CHIPS.map((chip) => {
                const active = isShortcutChipActive(draft, chip);
                return (
                  <Pressable
                    key={chip}
                    style={[
                      styles.filterChip,
                      active && styles.filterChipActive,
                    ]}
                    onPress={() => applyDraft(toggleShortcutChip(draft, chip))}
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
            {activeLabels.length > 0 ? (
              <View style={styles.activePillsRow}>
                {activeLabels.map((label) => (
                  <ActiveFilterPill
                    key={label}
                    label={label}
                    onRemove={() =>
                      applyDraft(removeFilterByLabel(draft, label))
                    }
                  />
                ))}
              </View>
            ) : null}

            <View style={styles.listDivider} />
          </View>
        }
      />

      {sheetOpen ? (
        <>
          <Pressable
            style={styles.overlay}
            onPress={closeSheet}
            accessibilityRole='button'
            accessibilityLabel='필터 닫기'
          />
          <MatchingFilterSheet
            draft={draft}
            onChange={applyDraft}
            onClose={closeSheet}
          />
        </>
      ) : null}
    </View>
  );
}
