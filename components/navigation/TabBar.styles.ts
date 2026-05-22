import { StyleSheet } from "react-native";
import { fs, hs, vs } from "../../constants";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingTop: vs(10),
    paddingHorizontal: hs(20),
  },
  tabGroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  plusSlot: {
    width: hs(75),
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    gap: vs(4),
    paddingVertical: vs(2),
  },
  icon: {
    width: hs(28),
    height: hs(28),
    resizeMode: "contain",
  },
  label: {
    fontSize: fs(10),
    color: "#39445F",
  },
  plusButton: {
    position: "absolute",
    top: hs(-34),
    left: "50%",
    marginLeft: hs(-37.5),
    width: hs(75),
    height: hs(75),
    alignItems: "center",
    justifyContent: "center",
  },
  plusCircle: {
    width: hs(76),
    height: hs(76),
  },

  // PlusMenu 백드롭 — 탭바 위쪽 전체를 덮어 바깥 탭 시 닫힘
  menuBackdrop: {
    position: "absolute",
    bottom: "100%",
    left: 0,
    right: 0,
    height: 9999,
  },
  // PlusMenu 컨테이너 — 탭바 바로 위, 가운데 정렬
  menuContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    // bottom은 insets.bottom 기반으로 inline 주입
  },
});
