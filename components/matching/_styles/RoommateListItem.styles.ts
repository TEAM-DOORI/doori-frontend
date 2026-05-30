import { StyleSheet } from "react-native";

import {
  figmaLetterSpacing,
  matchingColors,
} from "../../../constants/matching-figma";
import type { ScaleFns } from "../../../constants/create-scale-api";
import { colorStyle } from "../../../constants/colors";

export const createRoommateListItemStyles = ({ hs, vs, fs }: ScaleFns) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: hs(18),
      paddingVertical: vs(20),
      borderBottomWidth: hs(1.5),
      borderBottomColor: colorStyle.S01,
    },
    avatarWrap: {
      width: hs(52.49),
      height: hs(52.49),
    },
    avatar: {
      width: hs(52.49),
      height: hs(52.49),
      borderRadius: hs(26.245),
    },
    onlineDot: {
      position: "absolute",
      top: 0,
      right: 0,
      width: hs(9.29),
      height: hs(9.29),
      borderRadius: hs(4.645),
      backgroundColor: colorStyle.Sub1,
      borderWidth: hs(2),
      borderColor: "#FFFFFF",
    },
    body: {
      flex: 1,
      gap: vs(9),
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      overflow: "visible",
    },
    titleBlock: {
      flex: 1,
      gap: vs(5),
    },
    name: {
      fontSize: fs(20),
      lineHeight: vs(20 * 1.2),
      letterSpacing: figmaLetterSpacing(20, -4),
      color: matchingColors.titleInk,
    },
    summary: {
      fontSize: fs(14),
      lineHeight: vs(14 * 1.7142857142857142),
      letterSpacing: figmaLetterSpacing(14, -4),
      color: matchingColors.summaryInk,
    },
    favoriteIconWrap: {
      width: hs(24),
      height: vs(22),
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      marginLeft: hs(8),
      overflow: "visible",
    },
    favoriteIcon: {
      width: hs(21),
      height: vs(18.01),
    },
    chipsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: hs(4),
    },
    chip: {
      backgroundColor: matchingColors.chipBg,
      borderRadius: hs(10),
      paddingVertical: vs(3),
      paddingHorizontal: hs(14),
    },
    chipText: {
      fontSize: fs(14),
      lineHeight: vs(14 * 1.4285714285714286),
      letterSpacing: figmaLetterSpacing(14, -3),
      color: colorStyle.Main_Text,
    },
  });
