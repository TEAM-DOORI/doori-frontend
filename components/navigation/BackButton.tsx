import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import { hs, vs } from "../../constants/scale";

type BackButtonProps = {
  onPress?: () => void;
};

export function BackButton({ onPress }: BackButtonProps) {
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
      style={styles.button}
      hitSlop={hs(12)}
      accessibilityRole='button'
      accessibilityLabel='뒤로 가기'>
      <Feather
        name='chevron-left'
        size={28}
        color={"#3B3869"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    paddingVertical: vs(4),
  },
});
