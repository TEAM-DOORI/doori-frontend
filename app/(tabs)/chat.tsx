import { memo, useCallback, useMemo, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReanimatedSwipeable, { type SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";

import { Text } from "@components/typography";
import { ChatCategoryTabs } from "@components/chat/ChatCategoryTabs";
import { ChatHeader } from "@components/chat/ChatHeader";
import { ChatInfoBanner } from "@components/chat/ChatInfoBanner";
import { ChatListItem } from "@components/chat/ChatListItem";
import { ChatSwipeActions } from "@components/chat/ChatSwipeActions";
import { ACTIONS_TOTAL_WIDTH, BUTTON_WIDTH } from "@components/chat/ChatSwipeActions.constants";
import { CHATS } from "@/mocks/chats";
import type { Chat, ChatFilter } from "@/types/chat";
import { styles } from "./chat.styles";

function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <Text weight="medium" style={styles.emptyText}>
        채팅이 없습니다
      </Text>
    </View>
  );
}

type RightActionsProps = {
  dragX: SharedValue<number>;
  onMute: () => void;
  onDelete: () => void;
  closed?: boolean;
};

function RightActions({ dragX, onMute, onDelete, closed }: RightActionsProps) {
  const width = closed ? BUTTON_WIDTH : ACTIONS_TOTAL_WIDTH;
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: dragX.value + width }],
  }));
  return (
    <Animated.View style={[{ width, alignSelf: "stretch" }, animStyle]}>
      <ChatSwipeActions onMute={onMute} onDelete={onDelete} showMute={!closed} />
    </Animated.View>
  );
}

type SwipeableChatItemProps = {
  item: Chat;
  openSwipeableRef: React.MutableRefObject<SwipeableMethods | null>;
  onPress: (id: string) => void;
  onMute: (id: string) => void;
  onDelete: (id: string) => void;
};

const SwipeableChatItem = memo(function SwipeableChatItem({
  item,
  openSwipeableRef,
  onPress,
  onMute,
  onDelete,
}: SwipeableChatItemProps) {
  const ref = useRef<SwipeableMethods>(null);

  return (
    <ReanimatedSwipeable
      ref={ref}
      renderRightActions={(_progress, dragX) => (
        <RightActions
          dragX={dragX}
          closed={item.closed}
          onMute={() => { onMute(item.id); ref.current?.close(); }}
          onDelete={() => { onDelete(item.id); ref.current?.close(); }}
        />
      )}
      rightThreshold={40}
      friction={2}
      onSwipeableWillOpen={() => {
        if (openSwipeableRef.current !== ref.current) {
          openSwipeableRef.current?.close();
        }
        openSwipeableRef.current = ref.current;
      }}
    >
      <ChatListItem item={item} onPress={onPress} />
    </ReanimatedSwipeable>
  );
});

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<ChatFilter>("all");
  const openSwipeableRef = useRef<SwipeableMethods | null>(null);

  const filteredChats = useMemo(
    () =>
      activeTab === "all"
        ? CHATS
        : CHATS.filter((c) => c.category === activeTab),
    [activeTab],
  );

  const closeOpenSwipeable = useCallback(() => {
    openSwipeableRef.current?.close();
  }, []);

  const handleTabChange = useCallback((tab: ChatFilter) => {
    openSwipeableRef.current?.close();
    setActiveTab(tab);
  }, []);

  const handleMute = useCallback((id: string) => {
    console.log("Mute chat:", id);
  }, []);

  const handleDelete = useCallback((id: string) => {
    console.log("Delete chat:", id);
  }, []);

  const handleChatPress = useCallback((id: string) => {
    // TODO: /chat/[id] 라우트 생성 후 typed routes로 연결
    // router.push({ pathname: "/chat/[id]", params: { id } });
    console.log("Open chat:", id);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Chat }) => (
      <SwipeableChatItem
        item={item}
        openSwipeableRef={openSwipeableRef}
        onPress={handleChatPress}
        onMute={handleMute}
        onDelete={handleDelete}
      />
    ),
    [handleChatPress, handleMute, handleDelete],
  );

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <View style={styles.headerZone} onTouchStart={closeOpenSwipeable}>
        <ChatHeader hasNotification />
        <ChatCategoryTabs active={activeTab} onChange={handleTabChange} />
      </View>
      <View style={styles.contentZone}>
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={<ChatInfoBanner />}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={closeOpenSwipeable}
        />
      </View>
    </View>
  );
}
