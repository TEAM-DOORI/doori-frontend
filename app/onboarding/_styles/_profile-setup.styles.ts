import { StyleSheet } from "react-native";

import type { ScaleFns } from "../../../constants/create-scale-api";
import { color, colorStyle } from "../../../constants/colors";

export const createProfileSetupScreenStyles = ({ hs, vs, fs, ms }: ScaleFns) =>
  StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    flex: 1,
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
  nextButtonPressed: {
    opacity: 0.92,
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
