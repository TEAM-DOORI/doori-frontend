import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { memo, useCallback } from "react";
import { Pressable, View, useWindowDimensions } from "react-native";

import {
  CARD_GAP,
  CARD_HEIGHT,
  CARD_RAISE,
  CARD_WIDTH,
  COLORS,
  styles,
} from "../../app/(tabs)/index.styles";
import { ROOMMATES, type Roommate } from "../../mocks/home";
import { Text } from "../typography";
import { RoommateCarousel } from "../roommate/RoommateCarousel";

const SNAP = CARD_WIDTH + CARD_GAP;

function TraitChip({
  label,
  tone,
}: {
  label: string;
  tone: "light" | "primary";
}) {
  const isPrimary = tone === "primary";
  return (
    <View style={isPrimary ? styles.chipPrimary : styles.chipLight}>
      <Text
        weight="medium"
        style={isPrimary ? styles.chipPrimaryText : styles.chipLightText}
      >
        {label}
      </Text>
    </View>
  );
}

function TraitChipRow({
  traits,
  tone,
}: {
  traits: readonly [string, string, string];
  tone: "light" | "primary";
}) {
  return (
    <View style={tone === "light" ? styles.topChipsRow : styles.cardChipsRow}>
      {traits.map((t) => (
        <TraitChip key={t} label={t} tone={tone} />
      ))}
    </View>
  );
}

const RoommateCard = memo(function RoommateCard({
  item,
  onPress,
}: {
  item: Roommate;
  onPress: (id: string) => void;
}) {
  const handlePress = useCallback(() => onPress(item.id), [onPress, item.id]);

  return (
    <LinearGradient
      colors={[COLORS.cardGradientFrom, "rgba(255,255,255,0)"]}
      locations={[0.55, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.cardGradient}
    >
      <Image source={item.profile} style={styles.profile} contentFit="cover" />
      <Text weight="semiBold" style={styles.name}>
        {item.name}
      </Text>
      <Text weight="semiBold" style={styles.matchRate}>
        나와의 매칭률 {item.matchRate}%
      </Text>
      <TraitChipRow traits={item.traits} tone="primary" />
      <Pressable
        style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={`${item.name} 룸메 보러가기`}
      >
        <Text weight="semiBold" style={styles.ctaText}>
          룸메 보러가기
        </Text>
      </Pressable>
    </LinearGradient>
  );
});

export function HomeRoommateCarousel() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const carouselPadding = (width - CARD_WIDTH) / 2;

  const handleCardPress = useCallback(
    (id: string) => {
      router.push({ pathname: "/roommate/[id]", params: { id } });
    },
    [router],
  );

  const renderCard = useCallback(
    (item: Roommate) => (
      <View style={styles.cardOuter}>
        <RoommateCard item={item} onPress={handleCardPress} />
      </View>
    ),
    [handleCardPress],
  );

  return (
    <View style={styles.carouselWrap}>
      <RoommateCarousel
        data={ROOMMATES}
        snap={SNAP}
        cardRaise={CARD_RAISE}
        listHeight={CARD_HEIGHT + CARD_RAISE}
        contentContainerStyle={{
          paddingHorizontal: carouselPadding,
        }}
        renderCard={renderCard}
      />
    </View>
  );
}
