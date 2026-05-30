import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";

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
  const [inputText, setInputText] = useState("");
  const [timeline, setTimeline] = useState<ChatTimelineItem[]>(() => MESSAGES_BY_CHAT_ID[id] ?? []);
  const [reactionMap, setReactionMap] = useState<Record<string, MessageReaction[]>>(() => {
    const map: Record<string, MessageReaction[]> = {};
    for (const item of MESSAGES_BY_CHAT_ID[id] ?? []) {
      if (item.kind === "message" && item.data.reactions?.length) {
        map[item.data.id] = [...item.data.reactions];
      }
    }
    return map;
  });

  const flatListRef = useRef<FlatList<ChatTimelineItem>>(null);
  const newMessageIdsRef = useRef(new Set<string>());
  // 전송 직후 콘텐츠 레이아웃이 끝나면 최신 메시지로 스크롤하기 위한 플래그
  const shouldScrollToBottomRef = useRef(false);

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

  const handleSend = useCallback(() => {
    const text = inputText.trim();
    if (!text) return;

    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const msgId = `msg-${Date.now()}`;

    newMessageIdsRef.current.add(msgId);
    shouldScrollToBottomRef.current = true;
    setTimeline((prev) => [
      ...prev,
      { kind: "message", data: { id: msgId, sender: "me", text, timestamp } },
    ]);
    setInputText("");
  }, [inputText]);

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

  const chat = CHATS.find((c) => c.id === id);

  // inverted FlatList용 — timeline은 오래된 순, 표시는 최신이 아래
  const invertedData = useMemo(() => [...timeline].reverse(), [timeline]);

  const renderItem = useCallback(({ item }: { item: ChatTimelineItem }) => {
    if (item.kind === "date") {
      return <ChatDateDivider label={item.label} />;
    }
    const { data } = item;
    const isNew = newMessageIdsRef.current.has(data.id);
    const reactions = reactionMap[data.id];

    const messageNode = data.sender === "other" ? (
      <ReceivedMessage
        message={data}
        reactions={reactions}
        onDoubleTap={() => handleDoubleTap(data.id)}
      />
    ) : (
      <SentMessage
        message={data}
        reactions={reactions}
        onDoubleTap={() => handleDoubleTap(data.id)}
      />
    );

    if (isNew) {
      return (
        <Animated.View entering={FadeIn.duration(200)}>
          {messageNode}
        </Animated.View>
      );
    }
    return messageNode;
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
          ref={flatListRef}
          style={styles.messageList}
          contentContainerStyle={[
            styles.messageListContent,
            timeline.length === 0 && { flex: 1 },
          ]}
          data={invertedData}
          keyExtractor={(item) =>
            item.kind === "date" ? `date-${item.label}` : item.data.id
          }
          renderItem={renderItem}
          ListEmptyComponent={<EmptyMessages />}
          showsVerticalScrollIndicator={false}
          inverted
          itemLayoutAnimation={LinearTransition.duration(200)}
          onContentSizeChange={() => {
            if (shouldScrollToBottomRef.current) {
              shouldScrollToBottomRef.current = false;
              flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
            }
          }}
        />
        <View style={{ paddingBottom: keyboardVisible ? 0 : insets.bottom }}>
          <ChatMessageInput
            value={inputText}
            onChangeText={setInputText}
            onSend={handleSend}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
