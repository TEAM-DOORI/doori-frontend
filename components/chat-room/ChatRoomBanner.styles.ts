import { StyleSheet } from "react-native";
import { fs, hs, vs } from "@constants";
import { colorStyle } from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colorStyle.InfoBannerBg,
    paddingHorizontal: hs(20),
    paddingVertical: vs(5),
  },
  text: {
    fontSize: fs(12),
    color: colorStyle.InfoBannerText,
    letterSpacing: -0.5,
    lineHeight: fs(12) * 1.5,
  },
  underline: {
    textDecorationLine: "underline",
  },
});
