import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";

import { colorStyle } from "../../constants/colors";
import { Text } from "../typography";
import { DropdownChevron } from "./DropdownChevron";
import { styles } from "./ProfileSetupChip.styles";

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
  wide = false,
  mutedBorder = false,
  expanded = false,
}: ProfileSetupChipProps) {
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
        dropdown && wide && styles.chipDropdownWide,
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
        weight={
          isField || isPlaceholder ? "medium" : selected ? "semiBold" : "medium"
        }
        style={[
          isField ? styles.chipFieldText : styles.chipText,
          !isField && !isPlaceholder && selected && styles.chipTextActive,
        ]}>
        {label}
      </Text>
      {showChevron ? (
        dropdown ? (
          <DropdownChevron
            color={chevronColor}
            up={chevronUp}
          />
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
