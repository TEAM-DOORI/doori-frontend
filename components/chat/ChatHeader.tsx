import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

import { hs } from "@constants";
import { Text } from "@components/typography";
import { styles } from "./ChatHeader.styles";

type Props = {
  hasNotification?: boolean;
};

export function ChatHeader({ hasNotification = true }: Props) {
  return (
    <View style={styles.header}>
      <Text weight="bold" style={styles.title}>
        채팅
      </Text>
      {/* TODO: /notifications 라우트 연결 */}
      <View style={styles.bellWrapper}>
        <Feather name="bell" size={hs(24)} color="#102047" />
        {hasNotification && <View style={styles.notificationDot} />}
      </View>
    </View>
  );
}
