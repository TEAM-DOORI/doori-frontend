import { StyleSheet } from "react-native";
import { fs, hs, vs } from "@constants";
import { colorStyle } from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: hs(20),
    paddingVertical: vs(6),
  },
  avatar: {
    width: hs(35),
    height: hs(35),
    borderRadius: hs(35 / 2),
    marginRight: hs(8),
    marginTop: vs(2),
  },
  body: {
    flexShrink: 1,
  },
  bubbleRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: hs(5),
  },
  bubble: {
    maxWidth: hs(260),
    backgroundColor: colorStyle.BubbleOther,
    borderWidth: 1,
    borderColor: colorStyle.BubbleOtherBorder,
    borderTopLeftRadius: hs(5),
    borderTopRightRadius: hs(30),
    borderBottomRightRadius: hs(30),
    borderBottomLeftRadius: hs(20),
    paddingHorizontal: hs(24),
    paddingVertical: vs(10),
  },
  text: {
    fontSize: fs(14),
    color: colorStyle.TextBody,
    lineHeight: fs(14) * 1.4,
    letterSpacing: -0.14,
  },
  meta: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  unread: {
    fontSize: fs(10),
    color: colorStyle.S05,
  },
  timestamp: {
    fontSize: fs(10),
    color: colorStyle.S05,
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
    alignSelf: "flex-start",
    gap: hs(4),
    marginTop: vs(4),
    marginLeft: hs(2),
  },
});
