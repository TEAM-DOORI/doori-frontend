import { useCallback, useEffect, useMemo, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import Animated, { LinearTransition } from "react-native-reanimated";

import { Text } from "@components/typography";
import { ChatRoomHeader } from "@components/chat-room/ChatRoomHeader";
import { ChatRoomBanner } from "@components/chat-room/ChatRoomBanner";
import { ChatDateDivider } from "@components/chat-room/ChatDateDivider";
import { ReceivedMessage } from "@components/chat-room/ReceivedMessage";
import { SentMessage } from "@components/chat-room/SentMessage";
import { ChatMessageInput } from "@components/chat-room/ChatMessageInput";
import { CHATS } from "@/mocks/chats";
import { MESSAGES_BY_CHAT_ID } from "@/mocks/messages";
import type { ChatTimelineItem, MessageReaction } from "@/types/chat";
import { styles } from "./[id].styles";

function EmptyMessages() {
  return (
    <View style={styles.emptyContainer}>
      <Text weight="medium" style={styles.emptyText}>
        아직 대화가 없습니다
      </Text>
    </View>
  );
}

export default function ChatRoomScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [reactionMap, setReactionMap] = useState<Record<string, MessageReaction[]>>(() => {
    const map: Record<string, MessageReaction[]> = {};
    for (const item of MESSAGES_BY_CHAT_ID[id] ?? []) {
      if (item.kind === "message" && item.data.reactions?.length) {
        map[item.data.id] = [...item.data.reactions];
      }
    }
    return map;
  });

  useEffect(() => {
    const show = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setKeyboardVisible(true),
    );
    const hide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardVisible(false),
    );
    return () => { show.remove(); hide.remove(); };
  }, []);

  const handleDoubleTap = useCallback((messageId: string) => {
    setReactionMap((prev) => {
      const current = prev[messageId] ?? [];
      const existing = current.find((r) => r.emoji === "heart");
      const updated = existing
        ? existing.count > 1
          ? current.map((r) => r.emoji === "heart" ? { ...r, count: r.count - 1 } : r)
          : current.filter((r) => r.emoji !== "heart")
        : [...current, { emoji: "heart" as const, count: 1 }];
      return { ...prev, [messageId]: updated };
    });
  }, []);

  const chat = useMemo(() => CHATS.find((c) => c.id === id), [id]);
  const timeline = useMemo(() => MESSAGES_BY_CHAT_ID[id] ?? [], [id]);

  const renderItem = useCallback(({ item }: { item: ChatTimelineItem }) => {
    if (item.kind === "date") {
      return <ChatDateDivider label={item.label} />;
    }
    const { data } = item;
    const reactions = reactionMap[data.id];
    if (data.sender === "other") {
      return (
        <ReceivedMessage
          message={data}
          reactions={reactions}
          onDoubleTap={() => handleDoubleTap(data.id)}
        />
      );
    }
    return (
      <SentMessage
        message={data}
        reactions={reactions}
        onDoubleTap={() => handleDoubleTap(data.id)}
      />
    );
  }, [reactionMap, handleDoubleTap]);

  if (!chat) {
    return (
      <View style={[styles.notFoundContainer, { paddingTop: insets.top }]}>
        <Text weight="medium" style={styles.notFoundText}>
          채팅방을 찾을 수 없습니다
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <View style={styles.headerZone}>
        <ChatRoomHeader title={chat.title} chatId={id} />
        <ChatRoomBanner />
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Animated.FlatList
          style={styles.messageList}
          contentContainerStyle={[
            styles.messageListContent,
            timeline.length === 0 && { flex: 1 },
          ]}
          data={timeline}
          keyExtractor={(item, index) =>
            item.kind === "date" ? `date-${index}` : item.data.id
          }
          renderItem={renderItem}
          ListEmptyComponent={<EmptyMessages />}
          showsVerticalScrollIndicator={false}
          itemLayoutAnimation={LinearTransition.duration(200)}
        />
        <View style={{ paddingBottom: keyboardVisible ? 0 : insets.bottom }}>
          <ChatMessageInput />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
