import { StyleSheet } from "react-native";

import type { ScaleFns } from "../../../constants/create-scale-api";
import { color, colorStyle } from "../../../constants/colors";
import { onboardingScreenBackground } from "./shared";

export const createPreferencesScreenStyles = ({ hs, vs, fs, ms }: ScaleFns) =>
  StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: onboardingScreenBackground,
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
  optionRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: hs(10),
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
