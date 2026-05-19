import { Pressable, Text as RNText } from "react-native";

import { Text } from "../typography";
import { styles } from "./IconSelectChip.styles";

type IconSelectChipProps = {
  label: string;
  emoji: string;
  selected: boolean;
  onPress: () => void;
};

export function IconSelectChip({
  label,
  emoji,
  selected,
  onPress,
}: IconSelectChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        selected ? styles.chipSelected : styles.chipUnselected,
      ]}
      accessibilityRole='button'
      accessibilityState={{ selected }}>
      <RNText style={styles.emoji}>{emoji}</RNText>
      <Text
        weight='semiBold'
        style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}
