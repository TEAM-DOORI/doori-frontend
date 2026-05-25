import { View } from "react-native";

import { useScaledStyles } from "../../hooks/useScaledStyles";
import { createProgressBarStyles } from "./ProgressBar.styles";

type ProgressBarProps = {
  progress: number;
};

export function ProgressBar({ progress }: ProgressBarProps) {
  const styles = useScaledStyles(createProgressBarStyles);
  const clamped = Math.min(1, Math.max(0, progress));

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
    </View>
  );
}
