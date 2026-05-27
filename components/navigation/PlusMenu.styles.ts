import { StyleSheet } from "react-native";
import { fs, hs, ms, vs } from "../../constants";

export const ITEM_WIDTH = hs(80);
export const ICON_SIZE = hs(49);

export const styles = StyleSheet.create({
  archBg: {
    width: hs(244),
    height: hs(122),
    backgroundColor: "rgba(255,255,255,0.6)",
    borderTopLeftRadius: hs(122),
    borderTopRightRadius: hs(122),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: vs(-1) },
    shadowOpacity: 0.08,
    shadowRadius: ms(10),
    elevation: 8,
  },
  itemWrap: {
    position: "absolute",
    width: ITEM_WIDTH,
    alignItems: "center",
    gap: vs(4),
  },
  itemPressable: {
    alignItems: "center",
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  label: {
    fontSize: fs(14),
    color: "#4E6FD3",
    letterSpacing: -0.42,
    textAlign: "center",
  },
});
