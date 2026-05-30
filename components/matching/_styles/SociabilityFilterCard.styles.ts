import { StyleSheet } from "react-native";

import { colorStyle } from "../../../constants/colors";
import type { ScaleFns } from "../../../constants/create-scale-api";
import { figmaLetterSpacing } from "../../../constants/matching-figma";

export const createSociabilityFilterCardStyles = ({ hs, vs, fs, ms }: ScaleFns) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: vs(63),
      borderRadius: ms(15),
      borderWidth: hs(1),
      borderColor: colorStyle.S03,
      backgroundColor: colorStyle.S01,
      paddingVertical: vs(10),
      paddingHorizontal: hs(26),
    },
    cardSelected: {
      backgroundColor: "#E2F0FF",
      borderColor: colorStyle.Sub1,
    },
    leftBlock: {
      flexDirection: "row",
      alignItems: "center",
      gap: hs(8),
      flexShrink: 0,
    },
    title: {
      fontSize: fs(18),
      lineHeight: vs(18 * 1.2),
      letterSpacing: figmaLetterSpacing(18, -4),
      color: colorStyle.S04,
    },
    titleSelected: {
      color: colorStyle.Main_Text,
    },
    emoji: {
      fontSize: fs(18),
      lineHeight: vs(22),
    },
    descriptionBlock: {
      flex: 1,
      marginLeft: hs(12),
      alignItems: "flex-end",
      justifyContent: "center",
      gap: vs(2),
      minWidth: 0,
    },
    descriptionLine: {
      fontSize: fs(14),
      lineHeight: vs(14 * 1.4),
      letterSpacing: figmaLetterSpacing(14, -4),
      color: colorStyle.S04,
      textAlign: "right",
    },
    descriptionLineSelected: {
      color: colorStyle.S05,
    },
  });
