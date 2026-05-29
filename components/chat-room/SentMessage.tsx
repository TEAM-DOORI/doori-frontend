import { useCallback, useRef } from "react";
import { Pressable, View, type GestureResponderEvent } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { Text } from "@components/typography";
import type { ChatMessage, MessageReaction } from "@/types/chat";
import { MessageReactionBadge } from "./MessageReactionBadge";
import { styles } from "./SentMessage.styles";

type Props = {
  message: ChatMessage;
  reactions?: readonly MessageReaction[];
  onDoubleTap?: () => void;
};

export function SentMessage({ message, reactions, onDoubleTap }: Props) {
  const activeReactions = reactions ?? message.reactions ?? [];
  const lastTapRef = useRef<number>(0);

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

  const handlePress = useCallback((_event: GestureResponderEvent) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      triggerHeartAnimation();
    }
    lastTapRef.current = now;
  }, [triggerHeartAnimation]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.meta}>
          {message.unreadBy !== undefined && message.unreadBy > 0 && (
            <Text weight="regular" style={styles.unread}>
              {message.unreadBy}
            </Text>
          )}
          <Text weight="regular" style={styles.timestamp}>
            {message.timestamp}
          </Text>
        </View>
        <Pressable
          style={styles.bubble}
          onPress={handlePress}
        >
          <Text weight="medium" style={styles.text}>
            {message.text}
          </Text>
          <Animated.View style={[styles.heartOverlay, animatedHeartStyle]} pointerEvents="none">
            <AntDesign name="heart" size={40} color="rgba(255,255,255,0.85)" />
          </Animated.View>
        </Pressable>
      </View>
      {activeReactions.length > 0 && (
        <Animated.View
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(120)}
          style={styles.reactionWrapper}
        >
          {activeReactions.map((r) => (
            <MessageReactionBadge key={r.emoji} count={r.count} />
          ))}
        </Animated.View>
      )}
    </View>
  );
}
