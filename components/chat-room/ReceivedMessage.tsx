import { Image } from "expo-image";
import { View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

import { hs } from "@constants";
import { Text } from "@components/typography";
import type { ChatMessage, MessageReaction } from "@/types/chat";
import { MessageReactionBadge } from "./MessageReactionBadge";
import { useDoubleTapHeart } from "@hooks/useDoubleTapHeart";
import { styles } from "./ReceivedMessage.styles";

const HEART_OVERLAY_COLOR = "rgba(255,255,255,0.85)";
const sampleProfile = require("@assets/images/chat/chat-profile.png");

type Props = {
  message: ChatMessage;
  reactions?: readonly MessageReaction[];
  onDoubleTap?: () => void;
};

export function ReceivedMessage({ message, reactions, onDoubleTap }: Props) {
  const activeReactions = reactions ?? message.reactions ?? [];
  const { animatedHeartStyle, doubleTapGesture } = useDoubleTapHeart(onDoubleTap);

  return (
    <View style={styles.container}>
      <Image source={sampleProfile} style={styles.avatar} />
      <View style={styles.body}>
        <View style={styles.bubbleRow}>
          <GestureDetector gesture={doubleTapGesture}>
            <View style={styles.bubble}>
              <Text weight="medium" style={styles.text}>
                {message.text}
              </Text>
              <Animated.View style={[styles.heartOverlay, animatedHeartStyle]} pointerEvents="none">
                <AntDesign name="heart" size={hs(40)} color={HEART_OVERLAY_COLOR} />
              </Animated.View>
            </View>
          </GestureDetector>
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
    </View>
  );
}
