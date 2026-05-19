import { Pressable, Text as RNText, View } from "react-native";

import { Text } from "../typography";
import { styles } from "./LifestyleOptionCard.styles";

type LifestyleOptionCardProps = {
  label: string;
  emoji: string;
  selected: boolean;
  onPress: () => void;
};

export function LifestyleOptionCard({
  label,
  emoji,
  selected,
  onPress,
}: LifestyleOptionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
      accessibilityRole='button'
      accessibilityState={{ selected }}>
      <View style={[styles.emojiWrap, !selected && styles.emojiInactive]}>
        <RNText style={styles.emoji}>{emoji}</RNText>
      </View>
      <Text
        weight='semiBold'
        style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}
