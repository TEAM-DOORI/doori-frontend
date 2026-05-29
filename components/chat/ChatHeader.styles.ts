import { StyleSheet } from "react-native";
import { fs, hs, vs } from "../../constants";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: hs(20),
    paddingVertical: vs(14),
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: fs(20),
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
