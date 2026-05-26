import { StyleSheet } from "react-native";

import { colorStyle } from "../../../constants/colors";
import type { ScaleFns } from "../../../constants/create-scale-api";
import { figmaLetterSpacing } from "../../../constants/matching-figma";
import { matchingColors } from "../../../constants/matching-figma";

export const createMatchingFilterScreenStyles = ({ hs, vs, fs, ms }: ScaleFns) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: hs(20),
      paddingBottom: vs(32),
    },
    headerBlock: {
      gap: vs(20),
      paddingTop: vs(18),
      paddingBottom: vs(10),
    },
    listDivider: {
      height: hs(1.5),
      backgroundColor: matchingColors.divider,
      marginBottom: vs(10),
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: hs(16),
      flexWrap: "wrap",
    },
    activePillsRow: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: hs(8),
      minWidth: 0,
    },
    filterRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: hs(7),
      flexWrap: "wrap",
    },
    filterChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: hs(8),
      backgroundColor: colorStyle.S01,
      borderWidth: hs(1),
      borderColor: colorStyle.S03,
      borderRadius: ms(999),
      paddingVertical: vs(9),
      paddingHorizontal: hs(18),
    },
    filterChipWide: {
      width: hs(87),
      justifyContent: "center",
    },
    filterChipActive: {
      backgroundColor: colorStyle.Main2,
      borderColor: colorStyle.Main2,
    },
    filterIcon: {
      width: hs(15),
      height: vs(18),
    },
    filterChipText: {
      fontSize: fs(15),
      lineHeight: vs(15 * 1.4),
      letterSpacing: figmaLetterSpacing(15, -3),
      color: matchingColors.bodyInk,
    },
    filterChipTextActive: {
      color: matchingColors.bodyInk,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  });
