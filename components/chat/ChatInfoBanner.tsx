import { View } from "react-native";

import { Text } from "../typography";
import { styles } from "./ChatInfoBanner.styles";

export function ChatInfoBanner() {
  return (
    <View style={styles.banner}>
      <Text weight="regular" style={styles.text}>
        안전한 매칭을 위해 상대방의{" "}
        <Text weight="semiBold" style={styles.bold}>
          학교 인증 여부
        </Text>
        를 확인해주세요 🙂
      </Text>
    </View>
  );
}
