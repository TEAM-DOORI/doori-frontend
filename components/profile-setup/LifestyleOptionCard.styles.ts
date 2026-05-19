import { StyleSheet } from "react-native";

import { fs, hs, ms, vs } from "../../constants";
import { colorStyle } from "../../constants/colors";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: vs(116),
    alignItems: "center",
    justifyContent: "center",
    gap: vs(10),
    borderRadius: ms(15),
    borderWidth: hs(1),
    borderColor: colorStyle.S02,
    backgroundColor: "#FFFFFF",
    paddingTop: vs(20),
    paddingBottom: vs(16),
    paddingHorizontal: hs(8),
    overflow: "visible",
  },
  cardSelected: {
    borderColor: colorStyle.Sub1,
  },
  emojiWrap: {
    minWidth: hs(32),
    minHeight: vs(40),
    paddingVertical: vs(6),
    paddingHorizontal: hs(6),
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  emojiInactive: {
    opacity: 0.5,
  },
  emoji: {
    fontSize: fs(26),
    lineHeight: vs(32),
    textAlign: "center",
    includeFontPadding: false,
  },
  label: {
    fontSize: fs(14),
    lineHeight: vs(20),
    color: colorStyle.S04,
    textAlign: "center",
  },
  labelSelected: {
    color: colorStyle.Sub1,
  },
});
