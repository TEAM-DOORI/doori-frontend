import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  CLEANLINESS_LABELS,
  MATCHING_GRADE_ROWS,
  MATCHING_SLEEP_OPTIONS,
  MATCHING_SMOKING_OPTIONS,
  NOISE_LABELS,
  SOCIABILITY_OPTIONS,
} from "../../constants/matching-filter-options";
import { useScaledStyles } from "../../hooks/useScaledStyles";
import type { MatchingFilters } from "../../types/matching-filter";
import { Text } from "../typography";
import { FilterOptionChip } from "./FilterOptionChip";
import { FilterScaleSlider } from "./FilterScaleSlider";
import { MbtiFilterToggle } from "./MbtiFilterToggle";
import { SociabilityFilterCard } from "./SociabilityFilterCard";
import { createMatchingFilterSheetStyles } from "./_styles/MatchingFilterSheet.styles";

type MatchingFilterSheetProps = {
  draft: MatchingFilters;
  onChange: (next: MatchingFilters) => void;
  onClose: () => void;
};

export function MatchingFilterSheet({
  draft,
  onChange,
  onClose,
}: MatchingFilterSheetProps) {
  const insets = useSafeAreaInsets();
  const styles = useScaledStyles(createMatchingFilterSheetStyles);

  const patch = (partial: Partial<MatchingFilters>) =>
    onChange({ ...draft, ...partial });

  return (
    <View
      style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 20) }]}>
      <View style={styles.header}>
        <Text weight="semiBold" style={styles.title}>
          필터
        </Text>
        <Pressable
          onPress={onClose}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="필터 닫기">
          <Feather name="x" size={30} color="#ADADAD" />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.sectionGroup}>
          <View style={styles.section}>
            <Text weight="semiBold" style={styles.sectionTitle} numberOfLines={1}>
              학번
            </Text>
            <View style={styles.gradeChipRows}>
              {MATCHING_GRADE_ROWS.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.gradeChipRow}>
                  {row.map((grade) => {
                    const isBefore21 = grade === "21학번 이전";
                    return (
                      <View
                        key={grade}
                        style={
                          isBefore21
                            ? styles.gradeChipSlotWide
                            : styles.gradeChipSlot
                        }>
                        <FilterOptionChip
                          label={grade}
                          fill={!isBefore21}
                          selected={draft.grade === grade}
                          onPress={() =>
                            patch({
                              grade: draft.grade === grade ? null : grade,
                            })
                          }
                        />
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text weight="semiBold" style={styles.sectionTitle}>
              수면 패턴
            </Text>
            <View style={styles.chipWrap}>
              {MATCHING_SLEEP_OPTIONS.map((option) => (
                <FilterOptionChip
                  key={option}
                  label={option}
                  selected={draft.sleepPattern === option}
                  onPress={() =>
                    patch({
                      sleepPattern:
                        draft.sleepPattern === option ? null : option,
                    })
                  }
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text weight="semiBold" style={styles.sectionTitle} numberOfLines={1}>
              흡연{"\u00A0"}여부
            </Text>
            <View style={styles.chipWrap}>
              {MATCHING_SMOKING_OPTIONS.map((option) => (
                <FilterOptionChip
                  key={option}
                  label={option}
                  selected={draft.smoking === option}
                  onPress={() =>
                    patch({
                      smoking: draft.smoking === option ? null : option,
                    })
                  }
                />
              ))}
            </View>
          </View>
        </View>

        <View style={[styles.sectionGroup, styles.sliderSection]}>
          <View style={styles.sliderBlock}>
            <Text weight="semiBold" style={styles.sectionTitle} numberOfLines={1}>
              청결도
            </Text>
            <FilterScaleSlider
              labels={[...CLEANLINESS_LABELS]}
              value={draft.cleanliness}
              onChange={(cleanliness) => patch({ cleanliness })}
            />
          </View>
          <View style={styles.sliderBlock}>
            <Text weight="semiBold" style={styles.sectionTitle} numberOfLines={1}>
              소음{"\u00A0"}예민도
            </Text>
            <FilterScaleSlider
              labels={[...NOISE_LABELS]}
              value={draft.noise}
              onChange={(noise) => patch({ noise })}
            />
          </View>
        </View>

        <View style={styles.sociabilitySection}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            친목 성향
          </Text>
          <View style={styles.sociabilityCards}>
            {SOCIABILITY_OPTIONS.map((option) => (
              <SociabilityFilterCard
                key={option.value}
                emoji={option.emoji}
                title={option.title}
                descriptionLines={option.descriptionLines}
                selected={draft.sociability === option.value}
                onPress={() =>
                  patch({
                    sociability:
                      draft.sociability === option.value
                        ? null
                        : option.value,
                  })
                }
              />
            ))}
          </View>
        </View>

        <View style={styles.mbtiSection}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            MBTI
          </Text>
          <Text weight="medium" style={styles.mbtiHint}>
            나와 잘 맞을 것 같은 룸메이트의 MBTI를 조합해 보세요!
          </Text>
          <MbtiFilterToggle
            value={draft.mbti}
            onChange={(mbti) => patch({ mbti })}
          />
        </View>
      </ScrollView>
    </View>
  );
}
