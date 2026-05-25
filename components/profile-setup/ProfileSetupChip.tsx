import { Feather } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { colorStyle } from "../../constants/colors";
import { useScaledStyles } from "../../hooks/useScaledStyles";
import { Text } from "../typography";
import { DropdownChevron } from "./DropdownChevron";
import { createProfileSetupChipStyles } from "./ProfileSetupChip.styles";

type ChipVariant = "selectable" | "field" | "placeholder";

export type ProfileSetupChipProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
  showChevron?: boolean;
  chevronUp?: boolean;
  variant?: ChipVariant;
  fullWidth?: boolean;
  stretch?: boolean;
  dropdown?: boolean;
  dropdownSize?: "grade" | "enrollment" | "graduation";
  wide?: boolean;
  mutedBorder?: boolean;
  expanded?: boolean;
};

export function ProfileSetupChip({
  label,
  selected = false,
  onPress,
  showChevron,
  chevronUp = false,
  variant = "selectable",
  fullWidth = false,
  stretch = false,
  dropdown = false,
  dropdownSize,
  wide = false,
  mutedBorder = false,
  expanded = false,
}: ProfileSetupChipProps) {
  const styles = useScaledStyles(createProfileSetupChipStyles);
  const isField = variant === "field";
  const isPlaceholder = variant === "placeholder";

  const chevronColor = isField
    ? colorStyle.S05
    : isPlaceholder
    ? colorStyle.S04
    : selected
    ? colorStyle.Sub1
    : colorStyle.S04;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        !fullWidth && !stretch && !dropdown && styles.chipInline,
        fullWidth && styles.chipFullWidth,
        stretch && styles.chipStretch,
        dropdown && styles.chipDropdown,
        dropdown &&
          dropdownSize === "grade" &&
          styles.chipDropdownGrade,
        dropdown &&
          dropdownSize === "enrollment" &&
          styles.chipDropdownEnrollment,
        dropdown &&
          (dropdownSize === "graduation" || wide) &&
          styles.chipDropdownGraduation,
        isPlaceholder && styles.chipPlaceholder,
        showChevron && !dropdown && styles.chipWithChevron,
        (fullWidth || stretch) && showChevron && styles.chipTriggerRow,
        !isField && !isPlaceholder && selected && styles.chipActive,
        mutedBorder && styles.chipBorderMuted,
        expanded && !mutedBorder && styles.chipExpanded,
      ]}
      accessibilityRole='button'
      accessibilityState={{
        selected: isField || isPlaceholder ? false : selected,
        expanded: showChevron ? expanded : undefined,
      }}>
      <Text
        weight='semiBold'
        style={[
          isField
            ? styles.chipFieldText
            : isPlaceholder
              ? styles.chipPlaceholderText
              : styles.chipText,
          !isField && !isPlaceholder && selected && styles.chipTextActive,
          dropdown && styles.chipDropdownLabel,
        ]}>
        {label}
      </Text>
      {showChevron ? (
        dropdown ? (
          <View style={styles.chipDropdownChevron}>
            <DropdownChevron
              color={chevronColor}
              up={chevronUp}
            />
          </View>
        ) : (
          <Feather
            name={chevronUp ? "chevron-up" : "chevron-down"}
            size={16}
            color={chevronColor}
          />
        )
      ) : null}
    </Pressable>
  );
}
