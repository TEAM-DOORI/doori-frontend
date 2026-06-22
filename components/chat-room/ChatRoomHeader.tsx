import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

import { Text } from "@components/typography";
import { HEADER_NAV_ICON_SIZE } from "@constants";
import { colorStyle } from "@constants/colors";
import { hs } from "@constants/scale";
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
        <Feather
          name="chevron-left"
          size={HEADER_NAV_ICON_SIZE}
          color={colorStyle.NavyDeep}
        />
      </Pressable>
      <Text weight="semiBold" style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Pressable
        style={styles.iconButton}
        onPress={() => {}} // TODO: 채팅방 옵션 메뉴 구현
        hitSlop={hs(8)}
      >
        <Feather
          name="more-vertical"
          size={HEADER_NAV_ICON_SIZE}
          color={colorStyle.NavyDeep}
        />
      </Pressable>
    </View>
  );
}
