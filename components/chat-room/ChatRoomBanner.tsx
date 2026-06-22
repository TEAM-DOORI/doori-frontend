import { View } from "react-native";

import { Text } from "@components/typography";
import { styles } from "./ChatRoomBanner.styles";

export function ChatRoomBanner() {
  return (
    <View style={styles.container}>
      <Text weight="medium" style={styles.text}>
        {"안전한 매칭을 위해 상대방의 "}
        <Text weight="medium" style={[styles.text, styles.underline]}>
          학교 인증 여부
        </Text>
        {"를 확인하고 대화를 이어가세요 🙂"}
      </Text>
    </View>
  );
}
