import { useCallback, useMemo } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";

import { MATCHING_FIGMA } from "../../constants/matching-figma";
import { createScaleFns } from "../../constants/create-scale-api";
import { ROOMMATES, type Roommate } from "../../mocks/home";
import { RoommateCarousel } from "../roommate/RoommateCarousel";
import { FeaturedRoommateCard } from "./FeaturedRoommateCard";

type MatchingFeaturedCarouselProps = {
  onPress?: (id: string) => void;
};

/** 홈 `index.styles` CARD_RAISE(50)과 동일 — translateY만으로 중앙 강조 */
const CARD_RAISE = 50;
const CARD_HEIGHT = 206;

export function MatchingFeaturedCarousel({
  onPress,
}: MatchingFeaturedCarouselProps) {
  const { width } = useWindowDimensions();

  const metrics = useMemo(() => {
    const { hs, vs } = createScaleFns(width);
    const cardWidth = hs(MATCHING_FIGMA.carousel.cardWidth);
    const cardGap = hs(MATCHING_FIGMA.carousel.cardGap);
    const cardRaise = vs(CARD_RAISE);
    const cardSlotHeight = vs(CARD_HEIGHT);
    const sidePadding = (width - cardWidth) / 2;

    return {
      snap: cardWidth + cardGap,
      cardRaise,
      listHeight: cardSlotHeight + cardRaise,
      cardSlotHeight,
      contentContainerStyle: {
        paddingLeft: sidePadding,
        paddingRight: sidePadding,
        gap: cardGap,
        alignItems: "flex-start" as const,
      },
    };
  }, [width]);

  const slotStyles = useMemo(
    () =>
      StyleSheet.create({
        slot: {
          height: metrics.cardSlotHeight,
          justifyContent: "flex-end",
        },
      }),
    [metrics.cardSlotHeight],
  );

  const renderCard = useCallback(
    (item: Roommate) => (
      <View style={slotStyles.slot}>
        <FeaturedRoommateCard item={item} onPress={onPress} />
      </View>
    ),
    [onPress, slotStyles.slot],
  );

  return (
    <RoommateCarousel
      data={ROOMMATES}
      snap={metrics.snap}
      cardRaise={metrics.cardRaise}
      listHeight={metrics.listHeight}
      contentContainerStyle={metrics.contentContainerStyle}
      nestedScrollEnabled
      loop
      renderCard={renderCard}
    />
  );
}
