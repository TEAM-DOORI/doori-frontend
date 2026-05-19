import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";

import { gradient } from "../../constants/colors";

type BackgroundGradientProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function BackgroundGradient({ children, style }: BackgroundGradientProps) {
  return (
    <LinearGradient
      colors={[...gradient.background.colors]}
      locations={[...gradient.background.locations]}
      start={gradient.background.start}
      end={gradient.background.end}
      style={[styles.flex, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
