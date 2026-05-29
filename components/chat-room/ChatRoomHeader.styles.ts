import { StyleSheet } from "react-native";
import { fs, hs, vs } from "@constants";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: hs(20),
    paddingVertical: vs(14),
    backgroundColor: "#FFFFFF",
  },
  iconButton: {
    width: hs(28),
    height: hs(28),
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: fs(22),
    color: "#102047",
    textAlign: "center",
    letterSpacing: -0.66,
  },
});
