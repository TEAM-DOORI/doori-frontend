import { useEffect, useRef, useState } from "react";
import { Animated, Easing, View, type LayoutChangeEvent } from "react-native";

import { useScaledStyles } from "../../hooks/useScaledStyles";
import { createProgressBarStyles } from "./ProgressBar.styles";

type ProgressBarProps = {
  progress: number;
  animated?: boolean;
};

export function ProgressBar({ progress, animated = false }: ProgressBarProps) {
  const styles = useScaledStyles(createProgressBarStyles);
  const clamped = Math.min(1, Math.max(0, progress));
  const [trackWidth, setTrackWidth] = useState(0);
  const progressAnim = useRef(new Animated.Value(clamped)).current;

  useEffect(() => {
    if (!animated || trackWidth === 0) {
      progressAnim.setValue(clamped);
      return;
    }

    Animated.timing(progressAnim, {
      toValue: clamped,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [animated, clamped, progressAnim, trackWidth]);

  const handleTrackLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  if (animated && trackWidth > 0) {
    const fillWidth = progressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, trackWidth],
    });

    return (
      <View style={styles.track} onLayout={handleTrackLayout}>
        <Animated.View style={[styles.fill, { width: fillWidth }]} />
      </View>
    );
  }

  return (
    <View style={styles.track} onLayout={animated ? handleTrackLayout : undefined}>
      <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
    </View>
  );
}
