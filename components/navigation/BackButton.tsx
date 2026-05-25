import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import { hs, vs } from "../../constants/scale";

type BackButtonProps = {
  onPress?: () => void;
  iconColor?: string;
  iconSize?: number;
  /** Figma 매칭 뒤로가기(30×30) — 추가 패딩 제거 */
  compact?: boolean;
};

export function BackButton({
  onPress,
  iconColor = "#3B3869",
  iconSize = 28,
  compact = false,
}: BackButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    router.back();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.button, compact && styles.buttonCompact]}
      hitSlop={hs(12)}
      accessibilityRole="button"
      accessibilityLabel="뒤로 가기">
      <Feather
        name="chevron-left"
        size={iconSize}
        color={iconColor}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    paddingVertical: vs(4),
  },
  buttonCompact: {
    paddingVertical: 0,
    width: hs(30),
    height: hs(30),
    alignItems: "center",
    justifyContent: "center",
  },
});
