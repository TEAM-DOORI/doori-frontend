import { View } from "react-native";

import { useScaledStyles } from "../../hooks/useScaledStyles";
import { USER_NAME, USER_TRAITS } from "../../mocks/home";
import { MATCHING_INTRO_SUBTITLE } from "../../mocks/matching-recommendations";
import { Text } from "../typography";
import {
  createMatchingIntroTitleStyles,
  type MatchingIntroTitleStyles,
} from "./_styles/MatchingIntroTitle.styles";

export function MatchingIntroTitle() {
  const styles = useScaledStyles<MatchingIntroTitleStyles>(
    createMatchingIntroTitleStyles
  );
  const traitLabel = USER_TRAITS[2] ?? "잘 맞는";

  return (
    <View style={styles.block}>
      <Text
        weight='semiBold'
        style={styles.line1}
        numberOfLines={1}>
        <Text
          weight='semiBold'
          style={styles.line1Text}>
          {traitLabel}{" "}
        </Text>
        <Text
          weight='semiBold'
          style={styles.name}>
          {USER_NAME}
        </Text>
        <Text
          weight='semiBold'
          style={styles.line1Text}>
          님과
        </Text>
      </Text>
      <Text
        weight='semiBold'
        style={styles.line2}
        numberOfLines={1}>
        {MATCHING_INTRO_SUBTITLE}
      </Text>
    </View>
  );
}
