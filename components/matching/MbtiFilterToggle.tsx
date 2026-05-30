import { Pressable, View } from "react-native";

import { MBTI_OPTIONS } from "../../constants/matching-filter-options";
import { useScaledStyles } from "../../hooks";
import type { MbtiAxisMap } from "../../types/matching-filter";
import { Text } from "../typography";
import { createMbtiFilterToggleStyles } from "./_styles/MbtiFilterToggle.styles";

type MbtiFilterToggleProps = {
  value: Partial<MbtiAxisMap>;
  onChange: (value: Partial<MbtiAxisMap>) => void;
};

export function MbtiFilterToggle({ value, onChange }: MbtiFilterToggleProps) {
  const styles = useScaledStyles(createMbtiFilterToggleStyles);

  return (
    <View style={styles.grid}>
      {MBTI_OPTIONS.map((option) => {
        const selected = value[option.axis] === option.letter;
        return (
          <Pressable
            key={`${option.axis}-${option.letter}`}
            style={[styles.toggle, selected && styles.toggleSelected]}
            onPress={() => {
              if (selected) {
                const next = { ...value };
                delete next[option.axis];
                onChange(next);
                return;
              }
              onChange({ ...value, [option.axis]: option.letter });
            }}
            accessibilityRole="button"
            accessibilityState={{ selected }}>
            <Text
              weight="semiBold"
              style={[styles.letter, selected && styles.letterSelected]}>
              {option.letter}
            </Text>
            <Text
              weight="medium"
              style={[styles.subtitle, selected && styles.subtitleSelected]}>
              {option.subtitle}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
