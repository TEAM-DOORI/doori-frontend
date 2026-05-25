import { Pressable, Text as RNText } from "react-native";

import { Text } from "../typography";
import { styles } from "./IconSelectChip.styles";

type IconSelectChipVariant = "select" | "criteria";

type IconSelectChipProps = {
  label: string;
  emoji: string;
  selected: boolean;
  onPress: () => void;
  /** select: 흡연 칩(114px) / criteria: 매칭 우선 기준 칩 */
  variant?: IconSelectChipVariant;
};

export function IconSelectChip({
  label,
  emoji,
  selected,
  onPress,
  variant = "select",
}: IconSelectChipProps) {
  const isCriteria = variant === "criteria";

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        isCriteria ? styles.chipCriteria : styles.chipSelect,
        selected
          ? isCriteria
            ? styles.chipCriteriaSelected
            : styles.chipSelected
          : isCriteria
            ? styles.chipCriteriaUnselected
            : styles.chipUnselected,
      ]}
      accessibilityRole='button'
      accessibilityState={{ selected }}>
      <RNText style={styles.emoji}>{emoji}</RNText>
      <Text
        weight='semiBold'
        style={[
          styles.label,
          isCriteria && !selected && styles.labelCriteria,
          selected && styles.labelSelected,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}
