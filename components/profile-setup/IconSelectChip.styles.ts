import { StyleSheet } from "react-native";

import type { ScaleFns } from "../../constants/create-scale-api";
import { colorStyle } from "../../constants/colors";

const CRITERIA_BORDER = "#D6D6D6";
const CRITERIA_TEXT = "#A0A0A0";

export const createIconSelectChipStyles = ({ hs, vs, fs, ms }: ScaleFns) =>
  StyleSheet.create({
  chip: {
    minHeight: vs(42),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: hs(10),
    borderRadius: ms(30),
    borderWidth: hs(1),
    paddingVertical: vs(10),
    paddingHorizontal: hs(26),
  },
  chipSelect: {
    width: hs(114),
  },
  chipCriteria: {
    alignSelf: "flex-start",
  },
  chipUnselected: {
    borderColor: colorStyle.S03,
    backgroundColor: colorStyle.S01,
  },
  chipSelected: {
    borderColor: colorStyle.Sub1,
    backgroundColor: "#FEFEFE",
  },
  chipCriteriaUnselected: {
    borderColor: CRITERIA_BORDER,
    backgroundColor: "#FEFEFE",
  },
  chipCriteriaSelected: {
    borderColor: colorStyle.Sub1,
    backgroundColor: "#FFFFFF",
  },
  emoji: {
    fontSize: fs(16),
    lineHeight: vs(22),
    includeFontPadding: false,
  },
  label: {
    fontSize: fs(16),
    lineHeight: vs(22),
    color: colorStyle.S03,
  },
  labelCriteria: {
    color: CRITERIA_TEXT,
  },
  labelSelected: {
    color: colorStyle.Sub1,
  },
  });
