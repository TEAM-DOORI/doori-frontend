import { Feather } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";

import { hs } from "@constants";
import { styles } from "./ChatMessageInput.styles";

export function ChatMessageInput() {
  return (
    <View style={styles.container}>
      <Pressable
        hitSlop={hs(8)}
        onPress={() => console.log("첨부 버튼 탭")} // TODO: 첨부 기능 구현
      >
        <Feather name="plus" size={hs(26)} color="#102047" />
      </Pressable>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          accessibilityLabel="메시지 입력"
        />
      </View>
      <Pressable
        hitSlop={hs(8)}
        onPress={() => console.log("메시지 전송 탭")} // TODO: 메시지 송신 기능 구현
      >
        <Feather name="send" size={hs(26)} color="#102047" />
      </Pressable>
    </View>
  );
}
