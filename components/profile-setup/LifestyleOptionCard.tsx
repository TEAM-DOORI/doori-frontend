import { Pressable, Text as RNText, View } from "react-native";

import { Text } from "../typography";
import { styles } from "./LifestyleOptionCard.styles";

type LifestyleOptionCardProps = {
  label: string;
  /** 2줄 라벨 — 줄 단위로 렌더해 기기별 자동 줄바꿈 방지 */
  labelLines?: readonly [string, string];
  emoji: string;
  selected: boolean;
  onPress: () => void;
  /** Figma: ⏰ 미선택 시 opacity 0.5 */
  dimEmojiWhenUnselected?: boolean;
};

export function LifestyleOptionCard({
  label,
  labelLines,
  emoji,
  selected,
  onPress,
  dimEmojiWhenUnselected = false,
}: LifestyleOptionCardProps) {
  const showDimmedEmoji = !selected && dimEmojiWhenUnselected;
  const isSplitLabel = labelLines != null;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        selected ? styles.cardSelected : styles.cardUnselected,
      ]}
      accessibilityRole='button'
      accessibilityState={{ selected }}>
      <RNText
        style={[styles.emoji, showDimmedEmoji && styles.emojiDimmed]}>
        {emoji}
      </RNText>
      {isSplitLabel ? (
        <View style={styles.splitLabelBlock}>
          {labelLines.map((line) => (
            <Text
              key={line}
              weight='semiBold'
              numberOfLines={1}
              style={[
                styles.label,
                styles.labelLine,
                selected && styles.labelSelected,
              ]}>
              {line}
            </Text>
          ))}
        </View>
      ) : (
        <Text
          weight='semiBold'
          style={[
            styles.label,
            styles.labelSingle,
            selected && styles.labelSelected,
          ]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
