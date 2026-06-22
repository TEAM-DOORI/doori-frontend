import { StyleSheet } from "react-native";
import { fs, vs } from "@constants";
import { colorStyle } from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: vs(12),
  },
  label: {
    fontSize: fs(12),
    color: colorStyle.S06,
    letterSpacing: -0.36,
  },
});
