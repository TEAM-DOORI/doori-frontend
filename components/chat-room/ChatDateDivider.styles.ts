import { StyleSheet } from "react-native";
import { fs, vs } from "@constants";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: vs(12),
  },
  label: {
    fontSize: fs(12),
    color: "#4D5052",
    letterSpacing: -0.36,
  },
});
