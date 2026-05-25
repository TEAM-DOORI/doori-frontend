import { StyleSheet } from "react-native";

import { fs, hs, ms, vs } from "../../constants";
import { colorStyle } from "../../constants/colors";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: hs(103),
    height: vs(120),
    alignItems: "center",
    justifyContent: "center",
    gap: vs(8),
    borderRadius: ms(15),
    borderWidth: hs(1),
    paddingVertical: vs(10),
    paddingHorizontal: hs(10),
  },
  splitLabelBlock: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  cardUnselected: {
    borderColor: colorStyle.S03,
    backgroundColor: colorStyle.S01,
  },
  cardSelected: {
    borderColor: colorStyle.Sub1,
    backgroundColor: "#FFFFFF",
  },
  emoji: {
    fontSize: fs(20),
    lineHeight: vs(30),
    textAlign: "center",
    includeFontPadding: false,
  },
  emojiDimmed: {
    opacity: 0.5,
  },
  label: {
    fontSize: fs(16),
    lineHeight: vs(19),
    color: colorStyle.S03,
    textAlign: "center",
  },
  labelSingle: {
    alignSelf: "stretch",
  },
  labelLine: {
    lineHeight: vs(19),
  },
  labelSelected: {
    color: colorStyle.Sub1,
  },
});
