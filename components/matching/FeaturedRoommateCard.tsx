import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View } from "react-native";

import { useScaledStyles } from "../../hooks";
import type { Roommate } from "../../mocks/home";
import { Text } from "../typography";
import {
  createFeaturedRoommateCardStyles,
  type FeaturedRoommateCardStyles,
} from "./_styles/FeaturedRoommateCard.styles";

type FeaturedRoommateCardProps = {
  item: Roommate;
  onPress?: (id: string) => void;
};

export function FeaturedRoommateCard({
  item,
  onPress,
}: FeaturedRoommateCardProps) {
  const styles = useScaledStyles<FeaturedRoommateCardStyles>(
    createFeaturedRoommateCardStyles,
  );

  return (
    <Pressable
      onPress={() => onPress?.(item.id)}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, 매칭률 ${item.matchRate}%`}>
      <LinearGradient
        colors={["#FFFFFF", "#FFFFFF", "rgba(255,255,255,0)"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.card}>
        <View style={styles.inner}>
          <Image
            source={item.profile}
            style={styles.avatar}
            contentFit="cover"
          />
          <Text
            weight="bold"
            style={styles.name}>
            {item.name}
          </Text>
          <View style={styles.matchBadge}>
            <Text
              weight="semiBold"
              style={styles.matchBadgeText}
              allowFontScaling={false}>
              {`매칭률 ${item.matchRate}%`}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
