import { StyleSheet } from "react-native";
import { fs, hs, vs } from "@constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0E8FA",
    paddingHorizontal: hs(20),
    paddingVertical: vs(5),
  },
  text: {
    fontSize: fs(12),
    color: "#5370A8",
    letterSpacing: -0.5,
    lineHeight: fs(12) * 1.5,
  },
  underline: {
    textDecorationLine: "underline",
  },
});
