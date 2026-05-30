import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";

import { colorStyle } from "@constants/colors";
import { Text } from "@components/typography";
import { styles } from "./MessageReactionBadge.styles";

type Props = {
  count: number;
};

export function MessageReactionBadge({ count }: Props) {
  return (
    <View style={styles.container}>
      <AntDesign name="heart" size={8} color={colorStyle.white} />
      <Text weight="medium" style={styles.count}>
        {count}
      </Text>
    </View>
  );
}
