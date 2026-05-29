import { StyleSheet } from "react-native";
import { fs, hs, vs } from "@constants";
import { colorStyle } from "@constants/colors";

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: "flex-end",
    paddingHorizontal: hs(20),
    paddingVertical: vs(6),
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: hs(5),
  },
  meta: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  unread: {
    fontSize: fs(10),
    color: colorStyle.S05,
  },
  bubble: {
    maxWidth: hs(260),
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colorStyle.Main,
    borderTopLeftRadius: hs(30),
    borderTopRightRadius: hs(5),
    borderBottomRightRadius: hs(20),
    borderBottomLeftRadius: hs(30),
    paddingHorizontal: hs(23),
    paddingVertical: vs(10),
  },
  text: {
    fontSize: fs(14),
    color: "#393939",
    lineHeight: fs(14) * 1.4,
    letterSpacing: -0.14,
  },
  timestamp: {
    fontSize: fs(10),
    color: colorStyle.S05,
    alignSelf: "flex-end",
  },
  heartOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  reactionWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-end",
    gap: hs(4),
    marginTop: vs(4),
  },
});
