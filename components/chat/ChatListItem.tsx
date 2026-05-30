import { Pressable, View } from "react-native";

import type { Chat } from "@/types/chat";
import { Text } from "@components/typography";
import { ChatAvatar } from "./ChatAvatar";
import { styles } from "./ChatListItem.styles";

type Props = {
  item: Chat;
  onPress: (id: string) => void;
};

export function ChatListItem({ item, onPress }: Props) {
  return (
    <View style={item.closed && styles.closed}>
      <Pressable
        style={({ pressed }) => [
          styles.pressable,
          pressed && { opacity: 0.85 },
        ]}
        onPress={() => onPress(item.id)}
        accessibilityRole="button"
        accessibilityLabel={`${item.title} 채팅방`}
      >
        <View style={styles.row}>
          <ChatAvatar avatar={item.avatar} />
          <View style={styles.body}>
            <View style={styles.topRow}>
              <Text weight="semiBold" style={styles.name}>
                {item.title}
              </Text>
              <Text weight="regular" style={styles.timestamp}>
                {item.timestamp}
              </Text>
            </View>
            <View style={styles.topRow}>
              <Text
                weight="regular"
                style={styles.lastMessage}
                numberOfLines={1}
              >
                {item.lastMessage}
              </Text>
              {!!item.unreadCount && (
                <View style={styles.badge}>
                  <Text weight="semiBold" style={styles.badgeText}>
                    {item.unreadCount}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
