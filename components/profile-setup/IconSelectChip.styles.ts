import { StyleSheet } from "react-native";

import { fs, hs, ms, vs } from "../../constants";
import { colorStyle } from "../../constants/colors";

export const styles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
    minHeight: vs(40),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: hs(6),
    borderRadius: ms(99),
    borderWidth: hs(1),
    backgroundColor: "#FFFFFF",
    paddingVertical: vs(9),
    paddingHorizontal: hs(20),
  },
  chipUnselected: {
    borderColor: colorStyle.S04,
  },
  chipSelected: {
    borderColor: colorStyle.Sub1,
  },
  emoji: {
    fontSize: fs(20),
    lineHeight: vs(26),
    paddingVertical: vs(2),
    includeFontPadding: false,
  },
  label: {
    fontSize: fs(15),
    lineHeight: vs(22),
    color: colorStyle.S04,
  },
  labelSelected: {
    color: colorStyle.Sub1,
  },
});
