import { StyleSheet } from "react-native";

import { colorStyle } from "../../../constants/colors";
import type { ScaleFns } from "../../../constants/create-scale-api";
import { figmaLetterSpacing } from "../../../constants/matching-figma";

export const createMbtiFilterToggleStyles = ({ hs, vs, fs, ms }: ScaleFns) =>
  StyleSheet.create({
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: hs(10),
    },
    toggle: {
      width: hs(76),
      height: vs(76),
      borderRadius: ms(38),
      borderWidth: hs(1.5),
      borderColor: colorStyle.S03,
      backgroundColor: colorStyle.S01,
      alignItems: "center",
      justifyContent: "center",
      gap: vs(2),
    },
    toggleSelected: {
      backgroundColor: "#E2F0FF",
      borderColor: colorStyle.Sub1,
    },
    letter: {
      fontSize: fs(20),
      lineHeight: vs(20 * 1.2),
      letterSpacing: figmaLetterSpacing(20, -4),
      color: colorStyle.S04,
    },
    letterSelected: {
      color: colorStyle.Sub1,
    },
    subtitle: {
      fontSize: fs(12),
      lineHeight: vs(12 * 1.3),
      letterSpacing: figmaLetterSpacing(12, -4),
      color: colorStyle.S04,
    },
    subtitleSelected: {
      color: colorStyle.Sub1,
    },
  });
