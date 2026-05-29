import { Feather } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { hs } from "../../constants";
import { styles } from "./ChatSwipeActions.styles";

type Props = {
  onMute: () => void;
  onDelete: () => void;
  showMute?: boolean;
};

export function ChatSwipeActions({ onMute, onDelete, showMute = true }: Props) {
  return (
    <View style={styles.container}>
      {showMute && (
        <Pressable
          style={[styles.actionButton, styles.muteButton]}
          onPress={onMute}
          accessibilityRole="button"
          accessibilityLabel="알림 끄기"
        >
          <Feather name="bell-off" size={hs(24)} color="#FFFFFF" />
        </Pressable>
      )}
      <Pressable
        style={[styles.actionButton, styles.deleteButton]}
        onPress={onDelete}
        accessibilityRole="button"
        accessibilityLabel="채팅방 나가기"
      >
        <Feather name="trash-2" size={hs(24)} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}
