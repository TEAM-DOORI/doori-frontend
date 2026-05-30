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

export function useDoubleTapHeart(onDoubleTap?: () => void) {
  const heartScale = useSharedValue(0);
  const heartOpacity = useSharedValue(0);
  const heartTranslateY = useSharedValue(0);

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }, { translateY: heartTranslateY.value }],
    opacity: heartOpacity.value,
  }));

  const triggerHeartAnimation = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    heartScale.value = 0;
    heartOpacity.value = 0;
    heartTranslateY.value = 0;

    heartScale.value = withSequence(
      withTiming(1.5, { duration: 150 }),
      withTiming(1.1, { duration: 100 }),
      withDelay(200, withTiming(0, { duration: 250 })),
    );
    heartOpacity.value = withSequence(
      withTiming(1, { duration: 50 }),
      withDelay(300, withTiming(0, { duration: 250 })),
    );
    heartTranslateY.value = withDelay(200, withTiming(-35, { duration: 400 }));

    if (onDoubleTap) onDoubleTap();
  }, [onDoubleTap, heartScale, heartOpacity, heartTranslateY]);

  const doubleTapGesture = useMemo(
    () => Gesture.Tap().numberOfTaps(2).runOnJS(true).onEnd(triggerHeartAnimation),
    [triggerHeartAnimation],
  );

  return { animatedHeartStyle, doubleTapGesture };
}
