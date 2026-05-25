import { StyleSheet } from "react-native";

import { fs, hs, ms, vs } from "../../../constants";
import { color, colorStyle } from "../../../constants/colors";

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
    overflow: "visible",
  },
  title: {
    fontSize: fs(24),
    lineHeight: vs(32),
    color: "#1A3262",
    marginBottom: vs(8),
  },
  description: {
    fontSize: fs(16),
    lineHeight: vs(22),
    color: colorStyle.S05,
    marginBottom: vs(75),
  },
  section: {
    marginBottom: vs(40),
  },
  sectionDropdown: {
    overflow: "visible",
    zIndex: 10,
  },
  sectionLabel: {
    fontSize: fs(18),
    lineHeight: vs(25),
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
  rowDropdownContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: hs(10),
    maxWidth: hs(353),
    overflow: "visible",
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
  nextButtonDisabled: {
    backgroundColor: colorStyle.S01,
  },
  nextButtonText: {
    fontSize: fs(20),
    lineHeight: vs(28),
    color: color.textPrimary,
  },
  nextButtonTextDisabled: {
    color: colorStyle.S03,
  },
});
