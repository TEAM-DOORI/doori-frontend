import { StyleSheet } from "react-native";
import { fs, hs, HEADER_HEIGHT, HEADER_NAV_ICON_SIZE } from "@constants";
import { colorStyle } from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: hs(20),
    backgroundColor: colorStyle.white,
  },
  iconButton: {
    width: HEADER_NAV_ICON_SIZE,
    height: HEADER_NAV_ICON_SIZE,
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
