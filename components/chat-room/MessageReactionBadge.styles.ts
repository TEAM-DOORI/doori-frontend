import { StyleSheet } from "react-native";
import { fs, hs, vs } from "@constants";
import { colorStyle } from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: hs(4),
    backgroundColor: colorStyle.Sub2,
    borderRadius: 999,
    paddingHorizontal: hs(6),
    paddingVertical: vs(2),
  },
  count: {
    fontSize: fs(10),
    color: "#FFFFFF",
    lineHeight: fs(14),
  },
  emojiText: {
    fontSize: fs(8),
    lineHeight: fs(10),
  },
});
