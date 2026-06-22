import { View } from "react-native";

import { Text } from "@components/typography";
import { styles } from "./ChatDateDivider.styles";

type Props = {
  label: string;
};

export function ChatDateDivider({ label }: Props) {
  return (
    <View style={styles.container}>
      <Text weight="regular" style={styles.label}>
        {label}
      </Text>
    </View>
  );
}
