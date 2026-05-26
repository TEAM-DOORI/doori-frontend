import { Pressable, Text as RNText, View } from "react-native";

import { useScaledStyles } from "../../hooks/useScaledStyles";
import { Text } from "../typography";
import { createSociabilityFilterCardStyles } from "./_styles/SociabilityFilterCard.styles";

type SociabilityFilterCardProps = {
  emoji: string;
  title: string;
  descriptionLines: readonly [string, string];
  selected: boolean;
  onPress: () => void;
};

export function SociabilityFilterCard({
  emoji,
  title,
  descriptionLines,
  selected,
  onPress,
}: SociabilityFilterCardProps) {
  const styles = useScaledStyles(createSociabilityFilterCardStyles);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
      accessibilityRole="button"
      accessibilityState={{ selected }}>
      <View style={styles.leftBlock}>
        <Text
          weight="semiBold"
          numberOfLines={1}
          style={[styles.title, selected && styles.titleSelected]}>
          {title}
        </Text>
        <RNText allowFontScaling={false} style={styles.emoji}>
          {emoji}
        </RNText>
      </View>

      <View style={styles.descriptionBlock}>
        <Text
          weight="medium"
          numberOfLines={1}
          style={[
            styles.descriptionLine,
            selected && styles.descriptionLineSelected,
          ]}>
          {descriptionLines[0]}
        </Text>
        <Text
          weight="medium"
          numberOfLines={1}
          style={[
            styles.descriptionLine,
            selected && styles.descriptionLineSelected,
          ]}>
          {descriptionLines[1]}
        </Text>
      </View>
    </Pressable>
  );
}
