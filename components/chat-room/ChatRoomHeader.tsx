import { Feather } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";

import { hs } from "@constants";
import { colorStyle } from "@constants/colors";
import { Text } from "@components/typography";
import { styles } from "./ChatRoomHeader.styles";

type Props = {
  title: string;
  chatId: string;
};

export function ChatRoomHeader({ title, chatId }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.iconButton}
        onPress={() => router.back()}
        hitSlop={hs(8)}
      >
        <Feather name="chevron-left" size={hs(28)} color="{colorStyle.NavyDeep}" />
      </Pressable>
      <Text weight="semiBold" style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Pressable
        style={styles.iconButton}
        onPress={() => console.log("채팅방 메뉴 열기:", chatId)} // TODO: 채팅방 옵션 메뉴 구현
        hitSlop={hs(8)}
      >
        <Feather name="more-vertical" size={hs(28)} color="{colorStyle.NavyDeep}" />
      </Pressable>
    </View>
  );
}
