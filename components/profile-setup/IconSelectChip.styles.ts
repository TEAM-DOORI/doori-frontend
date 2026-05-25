import { StyleSheet } from "react-native";

import { fs, hs, ms, vs } from "../../constants";
import { colorStyle } from "../../constants/colors";

export const styles = StyleSheet.create({
  chip: {
    width: hs(114),
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
  chipUnselected: {
    borderColor: colorStyle.S03,
    backgroundColor: colorStyle.S01,
  },
  chipSelected: {
    borderColor: colorStyle.Sub1,
    backgroundColor: "#FEFEFE",
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
  labelSelected: {
    color: colorStyle.Sub1,
  },
});
