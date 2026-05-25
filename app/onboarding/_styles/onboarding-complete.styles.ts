import { StyleSheet } from "react-native";

import { fs, hs, ms, vs } from "../../../constants";
import { color, colorStyle } from "../../../constants/colors";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: hs(20),
    paddingTop: vs(17),
    paddingBottom: vs(24),
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
  description: {
    fontSize: fs(15),
    lineHeight: vs(22),
    color: colorStyle.S05,
  },
  illustrationWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: hs(20),
  },
  illustration: {
    width: hs(285),
    height: vs(313),
  },
  footer: {
    paddingHorizontal: hs(20),
    paddingTop: vs(20),
  },
  startButton: {
    backgroundColor: color.buttonPrimary,
    borderRadius: ms(15),
    paddingVertical: vs(16),
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonText: {
    fontSize: fs(18),
    lineHeight: vs(24),
    color: color.textPrimary,
  },
});
