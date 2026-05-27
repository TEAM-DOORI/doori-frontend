import { StyleSheet } from "react-native";

import { colorStyle } from "../../../constants/colors";
import type { ScaleFns } from "../../../constants/create-scale-api";
import {
  figmaLetterSpacing,
  matchingColors,
} from "../../../constants/matching-figma";

export const createMatchingFilterScreenStyles = ({
  hs,
  vs,
  fs,
  ms,
}: ScaleFns) =>
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
      gap: hs(10),
    },
    backButtonWrap: {
      width: hs(36),
      height: vs(46),
      alignItems: "center",
      justifyContent: "center",
    },
    activePillsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: hs(8),
    },
    searchInputWrap: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: hs(8),
      backgroundColor: colorStyle.Main2,
      borderWidth: hs(1),
      borderColor: colorStyle.Main2,
      borderRadius: ms(20),
      paddingHorizontal: hs(18),
      height: vs(46),
      minWidth: 0,
    },
    searchInput: {
      flex: 1,
      fontSize: fs(14),
      lineHeight: vs(14 * 1.4),
      letterSpacing: figmaLetterSpacing(14, -2),
      color: matchingColors.bodyInk,
      paddingVertical: 0,
    },
    searchClearButton: {
      width: hs(20),
      height: hs(20),
      alignItems: "center",
      justifyContent: "center",
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
