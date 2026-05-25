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
  section: {
    marginBottom: vs(36),
  },
  sectionLabel: {
    fontSize: fs(18),
    lineHeight: vs(22),
    color: "#4B566A",
    marginBottom: vs(15),
  },
  rowCompact: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: hs(10),
    alignSelf: "flex-start",
  },
  sleepRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: hs(8),
    width: "100%",
  },
  footer: {
    paddingHorizontal: hs(20),
    paddingTop: vs(20),
  },
  nextButton: {
    backgroundColor: color.buttonPrimary,
    borderRadius: ms(15),
    paddingVertical: vs(16),
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    fontSize: fs(18),
    lineHeight: vs(24),
    color: color.textPrimary,
  },
});
