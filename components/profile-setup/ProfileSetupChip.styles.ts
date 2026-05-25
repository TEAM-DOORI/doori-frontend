import { StyleSheet } from "react-native";

import { fs, hs, ms, vs } from "../../constants";
import { colorStyle } from "../../constants/colors";

export const styles = StyleSheet.create({
  chip: {
    minHeight: vs(48),
    borderRadius: ms(99),
    borderWidth: hs(1),
    borderColor: colorStyle.S02,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: vs(12),
    paddingHorizontal: hs(20),
  },
  chipInline: {
    alignSelf: "flex-start",
    minHeight: vs(40),
    paddingVertical: vs(9),
    paddingHorizontal: hs(28),
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
    minHeight: vs(40),
    paddingVertical: vs(9),
    paddingLeft: hs(14),
    paddingRight: hs(10),
    flexDirection: "row",
    alignItems: "center",
    gap: hs(6),
    justifyContent: "center",
  },
  chipDropdownWide: {
    minWidth: hs(108),
    paddingLeft: hs(16),
    paddingRight: hs(14),
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
  chipExpanded: {
    borderColor: colorStyle.Sub1,
  },
  chipActive: {
    borderColor: colorStyle.Sub1,
  },
  chipText: {
    fontSize: fs(15),
    lineHeight: vs(22),
    color: colorStyle.S04,
  },
  chipTextActive: {
    color: colorStyle.Sub1,
  },
  chipFieldText: {
    fontSize: fs(15),
    lineHeight: vs(22),
    color: colorStyle.S05,
  },
});
