import { StyleSheet } from "react-native";

import type { ScaleFns } from "../../constants/create-scale-api";
import { colorStyle } from "../../constants/colors";

export const createInlineChipDropdownStyles = ({ hs, vs, fs, ms }: ScaleFns) =>
  StyleSheet.create({
  dropdownWrapper: {
    position: "relative",
    alignSelf: "flex-start",
  },
  inlineDropdownList: {
    position: "absolute",
    top: vs(46),
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: ms(12),
    borderWidth: hs(1),
    borderColor: colorStyle.S02,
    shadowColor: colorStyle.black,
    shadowOffset: { width: 0, height: vs(4) },
    shadowOpacity: 0.1,
    shadowRadius: ms(4),
    elevation: 4,
    overflow: "hidden",
  },
  dropdownListWide: {
    minWidth: hs(131),
  },
  dropdownScroll: {
    maxHeight: vs(160),
  },
  dropdownItem: {
    paddingVertical: vs(12),
    paddingHorizontal: hs(14),
    borderBottomWidth: hs(1),
    borderBottomColor: colorStyle.S02,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: fs(14),
    lineHeight: vs(20),
    color: colorStyle.S04,
  },
  dropdownItemTextActive: {
    color: colorStyle.Sub1,
  },
  });
