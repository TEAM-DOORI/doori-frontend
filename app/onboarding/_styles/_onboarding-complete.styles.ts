import { StyleSheet } from "react-native";

import { color, colorStyle } from "../../../constants/colors";
import type { ScaleFns } from "../../../constants/create-scale-api";

export const createOnboardingCompleteStyles = ({ hs, vs, fs, ms }: ScaleFns) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    content: {
      paddingHorizontal: hs(20),
    },
    title: {
      fontSize: fs(24),
      lineHeight: vs(32),
      color: colorStyle.Main_Text,
      marginBottom: vs(8),
    },
    descriptionBlock: {},
    descriptionLine: {
      fontSize: fs(16),
      lineHeight: vs(22),
      color: colorStyle.S05,
    },
    illustrationWrap: {
      alignItems: "center",
      marginTop: vs(84),
      paddingHorizontal: hs(20),
    },
    spacer: {
      flex: 1,
    },
    illustration: {
      width: hs(285),
      height: vs(313),
    },
    footer: {
      paddingHorizontal: hs(20),
      paddingTop: vs(20),
    },
    startButtonPressed: {
      opacity: 0.92,
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
