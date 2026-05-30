import { Feather } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { useScaledStyles } from "../../hooks";
import { Text } from "../typography";
import { createActiveFilterPillStyles } from "./_styles/ActiveFilterPill.styles";

type ActiveFilterPillProps = {
  label: string;
  onRemove: () => void;
};

export function ActiveFilterPill({ label, onRemove }: ActiveFilterPillProps) {
  const styles = useScaledStyles(createActiveFilterPillStyles);

  return (
    <View style={styles.pill}>
      <Text weight="medium" style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      <Pressable
        onPress={onRemove}
        style={styles.removeButton}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`${label} 필터 제거`}>
        <Feather name="x" size={22} color="#696E71" />
      </Pressable>
    </View>
  );
}
