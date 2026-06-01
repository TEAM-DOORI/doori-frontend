import { StyleSheet } from "react-native";

import { color, colorStyle } from "../../../constants/colors";
import type { ScaleFns } from "../../../constants/create-scale-api";

export const createIntroStyles = ({ hs, vs, fs, ms }: ScaleFns) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: hs(20),
      paddingBottom: vs(24),
    },
    title: {
      fontSize: fs(24),
      lineHeight: vs(32),
      color: colorStyle.Main_Text,
      marginBottom: vs(8),
    },
    description: {
      fontSize: fs(16),
      lineHeight: vs(22),
      color: colorStyle.S05,
      marginBottom: vs(75),
    },
    fields: {
      gap: vs(27),
    },
    field: {},
    fieldLabel: {
      fontSize: fs(18),
      lineHeight: vs(25),
      color: "#4B566A",
      marginBottom: vs(15),
    },
    input: {
      backgroundColor: "#FFFFFF",
      borderRadius: ms(10),
      borderWidth: hs(1),
      borderColor: colorStyle.S03,
      paddingHorizontal: hs(19),
      paddingTop: vs(20),
      paddingBottom: vs(20),
      fontSize: fs(15),
      lineHeight: vs(21),
      color: colorStyle.Main_Text,
      textAlignVertical: "top",
    },
    inputIntro: {
      minHeight: vs(82),
    },
    inputWish: {
      minHeight: vs(103),
    },
    inputBox: {
      position: "relative",
    },
    placeholderOverlay: {
      position: "absolute",
      top: vs(20),
      left: hs(19),
    },
    placeholderLine: {
      fontSize: fs(15),
      lineHeight: vs(21),
      color: colorStyle.S04,
      includeFontPadding: false,
    },
    charCount: {
      alignSelf: "flex-end",
      marginTop: vs(4),
      fontSize: fs(15),
      lineHeight: vs(21),
      color: colorStyle.S04,
    },
    charCountValue: {
      color: colorStyle.Sub1,
    },
    footer: {
      paddingHorizontal: hs(20),
      paddingTop: vs(20),
    },
    startButton: {
      backgroundColor: color.buttonPrimary,
      borderRadius: ms(15),
      paddingVertical: vs(14),
      alignItems: "center",
      justifyContent: "center",
    },
    startButtonText: {
      fontSize: fs(20),
      lineHeight: vs(28),
      color: color.textPrimary,
    },
  });
