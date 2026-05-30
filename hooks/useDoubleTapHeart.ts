import { useCallback, useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const SCALE_PEAK = 1.5;
const SCALE_SETTLE = 1.1;
const SCALE_IN_MS = 150;
const SCALE_SETTLE_MS = 100;
const SCALE_OUT_MS = 250;
const OPACITY_IN_MS = 50;
const OPACITY_OUT_MS = 250;
const FLOAT_DELAY_MS = 200;
const FADE_OUT_DELAY_MS = 300;
const FLOAT_DISTANCE = -35;
const FLOAT_MS = 400;

export function useDoubleTapHeart(onDoubleTap?: () => void) {
  const heartScale = useSharedValue(0);
  const heartOpacity = useSharedValue(0);
  const heartTranslateY = useSharedValue(0);

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }, { translateY: heartTranslateY.value }],
    opacity: heartOpacity.value,
  }));

  const triggerHeartAnimation = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    heartScale.value = 0;
    heartOpacity.value = 0;
    heartTranslateY.value = 0;

    heartScale.value = withSequence(
      withTiming(SCALE_PEAK, { duration: SCALE_IN_MS }),
      withTiming(SCALE_SETTLE, { duration: SCALE_SETTLE_MS }),
      withDelay(FLOAT_DELAY_MS, withTiming(0, { duration: SCALE_OUT_MS })),
    );
    heartOpacity.value = withSequence(
      withTiming(1, { duration: OPACITY_IN_MS }),
      withDelay(FADE_OUT_DELAY_MS, withTiming(0, { duration: OPACITY_OUT_MS })),
    );
    heartTranslateY.value = withDelay(FLOAT_DELAY_MS, withTiming(FLOAT_DISTANCE, { duration: FLOAT_MS }));

    if (onDoubleTap) onDoubleTap();
  }, [onDoubleTap, heartScale, heartOpacity, heartTranslateY]);

  const doubleTapGesture = useMemo(
    () => Gesture.Tap().numberOfTaps(2).runOnJS(true).onEnd(triggerHeartAnimation),
    [triggerHeartAnimation],
  );

  return { animatedHeartStyle, doubleTapGesture };
}
