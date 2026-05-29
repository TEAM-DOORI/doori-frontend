import { StyleSheet } from "react-native";
import { fs, hs, vs } from "../../constants";
import { colorStyle } from "../../constants/colors";

export const ITEM_HEIGHT = vs(82);

export const styles = StyleSheet.create({
  pressable: {
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: hs(20),
    paddingVertical: vs(16),
    gap: hs(12),
    minHeight: ITEM_HEIGHT,
    borderColor: colorStyle.S02,
    borderBottomWidth: 1,
  },
  body: {
    flex: 1,
    gap: vs(4),
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: fs(15),
    color: "#51595E",
  },
  timestamp: {
    fontSize: fs(12),
    color: colorStyle.S05,
  },
  lastMessage: {
    fontSize: fs(13),
    color: "#0A0A0A",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  badge: {
    minWidth: hs(20),
    height: hs(20),
    borderRadius: hs(10),
    backgroundColor: colorStyle.Main_Text,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: hs(5),
  },
  badgeText: {
    fontSize: fs(11),
    color: "#EDEDED",
  },
  closed: {
    opacity: 0.4,
  },
});
