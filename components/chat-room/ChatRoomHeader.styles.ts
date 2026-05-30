import { StyleSheet } from "react-native";
import { fs, hs, vs } from "@constants";
import { colorStyle } from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: hs(20),
    paddingVertical: vs(14),
    backgroundColor: colorStyle.white,
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
    color: colorStyle.NavyDeep,
    textAlign: "center",
    letterSpacing: -0.66,
  },
});
