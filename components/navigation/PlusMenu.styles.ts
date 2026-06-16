import { StyleSheet } from "react-native";
import { fs, hs, vs } from "../../constants";

export const ITEM_WIDTH = hs(80);
export const ICON_SIZE = hs(49);

export const styles = StyleSheet.create({
  archBg: {
    width: hs(244),
    height: hs(122),
    backgroundColor: "rgba(255,255,255,0.6)",
    borderTopLeftRadius: hs(122),
    borderTopRightRadius: hs(122),
    // Android elevation은 z-축 우선순위까지 올려 탭바를 가리므로 사용 X.
    // 양 플랫폼 모두 boxShadow로 통일 (RN 0.76+ 지원)
    boxShadow: "0px -1px 10px rgba(0,0,0,0.08)",
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
