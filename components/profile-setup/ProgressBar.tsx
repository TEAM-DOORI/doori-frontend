import { StyleSheet, View } from "react-native";

import { color } from "../../constants/colors";
import { ms, vs } from "../../constants/scale";

type ProgressBarProps = {
  progress: number;
};

export function ProgressBar({ progress }: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, progress));

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    height: vs(6),
    borderRadius: ms(99),
    backgroundColor: color.progressTrack,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: ms(99),
    backgroundColor: color.progressFill,
  },
});
