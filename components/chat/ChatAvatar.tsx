import { Image } from "expo-image";
import { View } from "react-native";

import type { ChatAvatarData } from "../../types/chat";
import { MEMBER_OVERLAP, styles } from "./ChatAvatar.styles";

type Props = {
  avatar: ChatAvatarData;
};

export function ChatAvatar({ avatar }: Props) {
  if (avatar.variant === "single") {
    return (
      <View style={styles.container}>
        <Image
          source={avatar.source}
          style={styles.singleImage}
          contentFit="cover"
        />
        {avatar.isOnline && <View style={styles.onlineDot} />}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.groupWrapper}>
        <Image
          source={avatar.foodImage}
          style={styles.foodImage}
          contentFit="cover"
        />
        <View style={styles.membersRow}>
          {avatar.members.slice(0, 3).map((src, i) => (
            <Image
              key={i}
              source={src}
              style={[
                styles.memberImage,
                i > 0 && { marginLeft: -MEMBER_OVERLAP },
              ]}
              contentFit="cover"
            />
          ))}
        </View>
      </View>
    </View>
  );
}
