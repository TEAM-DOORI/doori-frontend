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
    fontSize: fs(16),
    lineHeight: vs(22),
    color: colorStyle.S05,
    marginBottom: vs(75),
  },
  sections: {
    gap: vs(52),
  },
  section: {},
  sectionLabel: {
    fontSize: fs(18),
    lineHeight: vs(25),
    color: "#4B566A",
    marginBottom: vs(15),
  },
  sectionLabelMultiline: {
    lineHeight: vs(27),
    marginBottom: 0,
  },
  sectionLabelUnderline: {
    textDecorationLine: "underline",
  },
  sectionLabelBlock: {
    gap: 0,
    marginBottom: vs(15),
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: hs(10),
    alignSelf: "stretch",
    width: "100%",
  },
  criteriaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: hs(10),
    rowGap: vs(8),
    alignSelf: "stretch",
    width: "100%",
  },
  footer: {
    paddingHorizontal: hs(20),
    paddingTop: vs(20),
  },
  nextButton: {
    backgroundColor: color.buttonPrimary,
    borderRadius: ms(15),
    paddingVertical: vs(14),
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    fontSize: fs(20),
    lineHeight: vs(28),
    color: color.textPrimary,
  },
});
