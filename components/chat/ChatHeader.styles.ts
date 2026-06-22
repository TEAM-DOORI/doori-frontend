import { fs, hs, HEADER_HEIGHT } from "@constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: hs(20),
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: fs(22),
    color: "#102047",
  },
  bellWrapper: {
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: hs(8),
    height: hs(8),
    borderRadius: hs(4),
    backgroundColor: "#E65353",
  },
});
