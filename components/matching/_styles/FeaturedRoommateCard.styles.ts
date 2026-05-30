import {
  StyleSheet,
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
} from "react-native";

import type { ScaleFns } from "../../../constants/create-scale-api";

export type FeaturedRoommateCardStyles = {
  card: ViewStyle;
  inner: ViewStyle;
  avatar: ImageStyle;
  name: TextStyle;
  matchBadge: ViewStyle;
  matchBadgeText: TextStyle;
};

export const createFeaturedRoommateCardStyles = ({
  hs,
  vs,
  fs,
}: ScaleFns): FeaturedRoommateCardStyles =>
  StyleSheet.create({
    card: {
      width: hs(167),
      minHeight: vs(206),
      borderTopLeftRadius: hs(84),
      borderTopRightRadius: hs(84),
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      paddingTop: vs(31),
      paddingLeft: hs(43),
      paddingRight: hs(45),
      alignItems: "center",
      justifyContent: "flex-start",
      overflow: "visible",
    },
    inner: {
      alignItems: "center",
      alignSelf: "stretch",
      gap: vs(4),
    },
    avatar: {
      width: hs(62),
      height: hs(62),
      borderRadius: hs(31),
    },
    name: {
      fontSize: fs(18),
      lineHeight: vs(18 * 1.5),
      letterSpacing: fs(18) * -0.03,
      color: "#121212",
      textAlign: "center",
    },
    matchBadge: {
      backgroundColor: "#FFF195",
      borderRadius: hs(20),
      paddingVertical: vs(2),
      paddingHorizontal: hs(10),
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    matchBadgeText: {
      fontSize: fs(12),
      lineHeight: vs(17),
      letterSpacing: fs(12) * -0.03,
      color: "#4E6FD3",
      textAlign: "center",
    },
  });
