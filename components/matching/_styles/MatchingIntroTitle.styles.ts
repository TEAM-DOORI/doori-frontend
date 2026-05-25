import { StyleSheet, type TextStyle, type ViewStyle } from "react-native";

import { colorStyle } from "../../../constants/colors";
import type { ScaleFns } from "../../../constants/create-scale-api";
import {
  figmaLetterSpacing,
  matchingColors,
} from "../../../constants/matching-figma";

const INTRO_FONT = 22;
const INTRO_LINE_HEIGHT = INTRO_FONT * 1.4;

export type MatchingIntroTitleStyles = {
  block: ViewStyle;
  line1: TextStyle;
  line1Text: TextStyle;
  name: TextStyle;
  line2: TextStyle;
};

export const createMatchingIntroTitleStyles = ({
  hs,
  vs,
  fs,
}: ScaleFns): MatchingIntroTitleStyles =>
  StyleSheet.create({
    block: {
      alignSelf: "center",
      alignItems: "center",
      gap: 0,
    },
    line1: {
      textAlign: "center",
      fontSize: fs(INTRO_FONT),
      lineHeight: vs(INTRO_LINE_HEIGHT),
      letterSpacing: figmaLetterSpacing(INTRO_FONT, -3),
    },
    line1Text: {
      fontSize: fs(INTRO_FONT),
      lineHeight: vs(INTRO_LINE_HEIGHT),
      letterSpacing: figmaLetterSpacing(INTRO_FONT, -3),
      color: matchingColors.titleInk,
    },
    name: {
      fontSize: fs(INTRO_FONT),
      lineHeight: vs(INTRO_LINE_HEIGHT),
      letterSpacing: figmaLetterSpacing(INTRO_FONT, -3),
      color: colorStyle.Main_Text,
    },
    line2: {
      textAlign: "center",
      fontSize: fs(INTRO_FONT),
      lineHeight: vs(INTRO_LINE_HEIGHT),
      letterSpacing: figmaLetterSpacing(INTRO_FONT, -3),
      color: matchingColors.titleInk,
    },
  });
