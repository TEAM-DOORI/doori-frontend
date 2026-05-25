import { StyleSheet } from "react-native";

import { fs, hs, ms, vs } from "../../constants";
import { colorStyle } from "../../constants/colors";

export const styles = StyleSheet.create({
  chip: {
    minHeight: vs(48),
    borderRadius: ms(99),
    borderWidth: hs(1),
    borderColor: colorStyle.S03,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: vs(12),
    paddingHorizontal: hs(20),
  },
  chipInline: {
    alignSelf: "flex-start",
    minHeight: vs(42),
    borderRadius: ms(30),
    paddingVertical: vs(10),
    paddingHorizontal: hs(26),
  },
  chipFullWidth: {
    width: "100%",
    alignSelf: "stretch",
  },
  chipStretch: {
    width: "100%",
    minHeight: vs(44),
    paddingVertical: vs(10),
    paddingHorizontal: hs(10),
  },
  chipDropdown: {
    alignSelf: "flex-start",
    height: vs(42),
    borderRadius: ms(40),
    paddingVertical: 0,
    paddingHorizontal: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: hs(10),
  },
  chipDropdownLabel: {
    flexShrink: 0,
    includeFontPadding: false,
  },
  chipDropdownChevron: {
    flexShrink: 0,
  },
  chipDropdownGrade: {
    width: hs(102),
    paddingLeft: hs(22),
    paddingRight: hs(22),
  },
  chipDropdownEnrollment: {
    width: hs(80),
    paddingLeft: hs(16),
    paddingRight: hs(16),
  },
  chipDropdownGraduation: {
    width: hs(131),
    paddingLeft: hs(21),
    paddingRight: hs(20),
  },
  chipWithChevron: {
    flexDirection: "row",
    gap: hs(4),
  },
  chipTriggerRow: {
    justifyContent: "space-between",
    paddingHorizontal: hs(20),
  },
  chipBorderMuted: {
    borderColor: colorStyle.S05,
  },
  chipPlaceholder: {
    borderColor: colorStyle.S04,
  },
  chipExpanded: {
    borderColor: colorStyle.Sub1,
  },
  chipActive: {
    borderColor: colorStyle.Sub1,
  },
  chipText: {
    fontSize: fs(16),
    lineHeight: vs(22),
    color: colorStyle.S03,
  },
  chipTextActive: {
    color: colorStyle.Sub1,
  },
  chipFieldText: {
    fontSize: fs(16),
    lineHeight: vs(22),
    color: colorStyle.S05,
  },
  chipPlaceholderText: {
    fontSize: fs(16),
    lineHeight: vs(22),
    color: colorStyle.S04,
  },
});
