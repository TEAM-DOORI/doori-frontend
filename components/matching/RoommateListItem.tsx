import { Image } from "expo-image";
import { Pressable, View } from "react-native";

import { useScaledStyles } from "../../hooks/useScaledStyles";
import type { RecommendedRoommate } from "../../mocks/matching-recommendations";
import { Text } from "../typography";
import { createRoommateListItemStyles } from "./_styles/RoommateListItem.styles";

type RoommateListItemProps = {
  item: RecommendedRoommate;
  onPress?: (id: string) => void;
};

export function RoommateListItem({ item, onPress }: RoommateListItemProps) {
  const styles = useScaledStyles(createRoommateListItemStyles);

  return (
    <Pressable
      style={styles.row}
      onPress={() => onPress?.(item.id)}
      accessibilityRole='button'
      accessibilityLabel={`${item.name}, ${item.matchSummary}`}>
      <View style={styles.avatarWrap}>
        <Image
          source={item.profile}
          style={styles.avatar}
          contentFit='cover'
        />
        <View style={styles.onlineDot} />
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <Text
              weight='bold'
              style={styles.name}>
              {item.name}
            </Text>
            <Text
              weight='medium'
              style={styles.summary}>
              {item.matchSummary}
            </Text>
          </View>
          <View
            style={styles.favoriteIconWrap}
            accessibilityElementsHidden
            importantForAccessibility="no">
            <Image
              source={require("../../assets/images/matching/heart-icon.svg")}
              style={styles.favoriteIcon}
              contentFit="contain"
            />
          </View>
        </View>
        <View style={styles.chipsRow}>
          {item.traits.map((trait) => (
            <View
              key={trait}
              style={styles.chip}>
              <Text
                weight='medium'
                style={styles.chipText}>
                {trait}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}
