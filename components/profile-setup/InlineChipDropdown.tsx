import {
  Pressable,
  ScrollView,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useScaledStyles } from "../../hooks/useScaledStyles";
import { Text } from "../typography";
import { createInlineChipDropdownStyles } from "./InlineChipDropdown.styles";
import {
  ProfileSetupChip,
  type ProfileSetupChipProps,
} from "./ProfileSetupChip";

type InlineChipDropdownProps = {
  label: string;
  options: readonly string[];
  value: string | null;
  open: boolean;
  zIndex: number;
  onToggle: () => void;
  onSelect: (value: string) => void;
  variant?: ProfileSetupChipProps["variant"];
  wide?: boolean;
  dropdownSize?: ProfileSetupChipProps["dropdownSize"];
  mutedBorder?: boolean;
  wrapperStyle?: StyleProp<ViewStyle>;
};

export function InlineChipDropdown({
  label,
  options,
  value,
  open,
  zIndex,
  onToggle,
  onSelect,
  variant = "field",
  wide = false,
  dropdownSize,
  mutedBorder = false,
  wrapperStyle,
}: InlineChipDropdownProps) {
  const styles = useScaledStyles(createInlineChipDropdownStyles);

  return (
    <View style={[styles.dropdownWrapper, { zIndex }, wrapperStyle]}>
      <ProfileSetupChip
        dropdown
        wide={wide}
        dropdownSize={dropdownSize}
        mutedBorder={mutedBorder}
        label={label}
        variant={variant}
        showChevron
        chevronUp={open}
        expanded={open}
        onPress={onToggle}
      />
      {open ? (
        <View
          style={[
            styles.inlineDropdownList,
            (wide || dropdownSize === "graduation") && styles.dropdownListWide,
          ]}>
          <ScrollView
            nestedScrollEnabled
            style={styles.dropdownScroll}
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps='handled'
            bounces={false}>
            {options.map((option, index) => {
              const isSelected = option === value;
              const isLast = index === options.length - 1;

              return (
                <Pressable
                  key={option}
                  style={[
                    styles.dropdownItem,
                    isLast && styles.dropdownItemLast,
                  ]}
                  onPress={() => onSelect(option)}
                  accessibilityRole='button'
                  accessibilityState={{ selected: isSelected }}>
                  <Text
                    weight={isSelected ? "semiBold" : "medium"}
                    style={[
                      styles.dropdownItemText,
                      isSelected && styles.dropdownItemTextActive,
                    ]}>
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}
