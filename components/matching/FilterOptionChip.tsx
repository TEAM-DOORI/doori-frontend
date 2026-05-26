import { Pressable } from "react-native";

import { useScaledStyles } from "../../hooks/useScaledStyles";
import { Text } from "../typography";
import { createFilterOptionChipStyles } from "./_styles/FilterOptionChip.styles";

type FilterOptionChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  /** 학번 행 등 — 가로 공간을 균등 분할해 오른쪽 잘림 방지 */
  fill?: boolean;
};

export function FilterOptionChip({
  label,
  selected,
  onPress,
  fill = false,
}: FilterOptionChipProps) {
  const styles = useScaledStyles(createFilterOptionChipStyles);

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        fill && styles.chipFill,
        selected && styles.chipSelected,
      ]}
      accessibilityRole="button"
      accessibilityState={{ selected }}>
      <Text
        weight={selected ? "semiBold" : "medium"}
        style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}
