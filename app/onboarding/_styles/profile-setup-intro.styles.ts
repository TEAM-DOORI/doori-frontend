import { StyleSheet } from "react-native";

import { fs, hs, ms, vs } from "../../../constants";
import { color, colorStyle } from "../../../constants/colors";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: hs(20),
    paddingBottom: vs(44),
    paddingTop: vs(17),
  },
  progressWrap: {
    marginTop: vs(8),
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
    fontSize: fs(15),
    lineHeight: vs(22),
    color: colorStyle.S05,
    marginBottom: vs(48),
  },
  field: {
    marginBottom: vs(28),
  },
  fieldLabel: {
    fontSize: fs(18),
    lineHeight: vs(22),
    color: "#4B566A",
    marginBottom: vs(12),
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: ms(12),
    borderWidth: hs(1),
    borderColor: colorStyle.S02,
    paddingHorizontal: hs(16),
    fontSize: fs(15),
    lineHeight: vs(22),
    color: colorStyle.Main_Text,
  },
  inputShort: {
    minHeight: vs(82),
    paddingTop: vs(14),
    paddingBottom: vs(14),
    textAlignVertical: "top",
  },
  inputTall: {
    minHeight: vs(120),
    paddingTop: vs(14),
    paddingBottom: vs(14),
    textAlignVertical: "top",
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
