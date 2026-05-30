import { StyleSheet } from "react-native";

import { colorStyle } from "../../../constants/colors";
import type { ScaleFns } from "../../../constants/create-scale-api";
import { figmaLetterSpacing } from "../../../constants/matching-figma";

export const createFilterOptionChipStyles = ({ hs, vs, fs, ms }: ScaleFns) =>
  StyleSheet.create({
    chip: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      paddingVertical: vs(9),
      paddingHorizontal: hs(18),
      borderRadius: ms(999),
      borderWidth: hs(1),
      borderColor: colorStyle.S03,
      backgroundColor: colorStyle.S01,
    },
    chipFill: {
      flex: 1,
      minWidth: 0,
      paddingHorizontal: hs(12),
    },
    chipSelected: {
      backgroundColor: "#E2F0FF",
      borderColor: colorStyle.Sub1,
    },
    chipText: {
      fontSize: fs(15),
      lineHeight: vs(15 * 1.4),
      letterSpacing: figmaLetterSpacing(15, -3),
      color: colorStyle.S04,
      flexShrink: 0,
    },
    chipTextSelected: {
      color: colorStyle.Sub1,
    },
  });
