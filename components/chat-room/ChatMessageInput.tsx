import { Feather } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";

import { hs } from "@constants";
import { colorStyle } from "@constants/colors";
import { styles } from "./ChatMessageInput.styles";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
};

export function ChatMessageInput({ value, onChangeText, onSend }: Props) {
  const canSend = value.trim().length > 0;

  return (
    <View style={styles.container}>
      <Pressable
        hitSlop={hs(8)}
        onPress={() => {}}
      >
        <Feather name="plus" size={hs(26)} color={colorStyle.NavyDeep} />
      </Pressable>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="메시지를 입력하세요"
          placeholderTextColor={colorStyle.S04}
          returnKeyType="send"
          onSubmitEditing={() => { if (canSend) onSend(); }}
          blurOnSubmit={false}
          accessibilityLabel="메시지 입력"
        />
      </View>
      <Pressable
        hitSlop={hs(8)}
        onPress={onSend}
        disabled={!canSend}
        style={canSend ? undefined : styles.sendDisabled}
      >
        <Feather name="send" size={hs(26)} color={colorStyle.NavyDeep} />
      </Pressable>
    </View>
  );
}
