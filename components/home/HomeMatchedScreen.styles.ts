import { StyleSheet } from "react-native";

import { fs, hs, ms, vs } from "@constants";
import { colorStyle } from "@constants/colors";

/** Figma 1015:6139 — 아크 패널 (393pt 프레임 기준 396×491, 상단 반원) */
const ARC_PANEL_WIDTH = 396;
const ARC_PANEL_RADIUS = ARC_PANEL_WIDTH / 2;
/** Figma x=-1 — 화면보다 3pt 넓게 중앙 정렬 */
const ARC_PANEL_BLEED = 1.5;

export const MATCHED_COLORS = {
  bgTop: colorStyle.Main2,
  bgBottom: colorStyle.Main,
  borderSoft: "#C7D0FF",
  bubbleYellow: "#FFF195",
  bubbleYellowBorder: "#FFF6C2",
  textBody: "#1F1F1F",
  textMuted: "#828282",
  timeText: "#2C457F",
} as const;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
    width: "100%",
    overflow: "visible",
  },
  header: {
    paddingTop: vs(18),
    paddingHorizontal: hs(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: hs(96),
    height: vs(36),
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: hs(16),
  },
  headerIconHit: {
    width: hs(30),
    height: hs(30),
    alignItems: "center",
    justifyContent: "center",
  },
  headerBellIcon: {
    width: hs(24),
    height: hs(24),
  },
  statusSection: {
    marginTop: vs(30),
    paddingHorizontal: hs(20),
  },
  statusCardSelf: {
    flexDirection: "row",
    alignItems: "center",
    gap: hs(10),
    minHeight: vs(71),
    paddingRight: hs(20),
    paddingLeft: hs(10),
    paddingVertical: vs(8),
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: MATCHED_COLORS.borderSoft,
    borderTopLeftRadius: ms(30),
    borderTopRightRadius: ms(97),
    borderBottomRightRadius: ms(97),
    borderBottomLeftRadius: 0,
  },
  statusCardRoommateWrap: {
    marginTop: vs(13),
    alignSelf: "flex-end",
    width: hs(243),
    maxWidth: "88%",
  },
  statusCardRoommate: {
    flexDirection: "row",
    alignItems: "center",
    gap: hs(10),
    minHeight: vs(68),
    paddingRight: hs(16),
    paddingLeft: hs(10),
    paddingVertical: vs(8),
    backgroundColor: MATCHED_COLORS.bubbleYellow,
    borderWidth: 1,
    borderColor: MATCHED_COLORS.bubbleYellowBorder,
    borderTopLeftRadius: ms(30),
    borderTopRightRadius: ms(30),
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: ms(30),
  },
  statusAvatar: {
    width: hs(55),
    height: hs(55),
    borderRadius: hs(27.5),
  },
  statusTextWrap: {
    flex: 1,
    gap: vs(2),
  },
  statusName: {
    fontSize: fs(18),
    lineHeight: fs(25),
    color: MATCHED_COLORS.textBody,
    letterSpacing: -0.54,
  },
  statusMessage: {
    fontSize: fs(14),
    lineHeight: fs(20),
    color: MATCHED_COLORS.textBody,
    letterSpacing: -0.42,
  },
  scheduleSection: {
    flex: 1,
    marginTop: vs(17),
    alignSelf: "stretch",
    width: "100%",
    alignItems: "center",
    overflow: "visible",
  },
  arcDatesRow: {
    height: vs(104),
    width: hs(ARC_PANEL_WIDTH),
    marginHorizontal: hs(-ARC_PANEL_BLEED),
    position: "relative",
    zIndex: 2,
    marginBottom: vs(-44),
  },
  arcPanel: {
    flex: 1,
    width: hs(ARC_PANEL_WIDTH),
    marginHorizontal: hs(-ARC_PANEL_BLEED),
    backgroundColor: colorStyle.Main2,
    borderTopLeftRadius: hs(ARC_PANEL_RADIUS),
    borderTopRightRadius: hs(ARC_PANEL_RADIUS),
    overflow: "hidden",
  },
  arcPanelContent: {
    paddingHorizontal: hs(20),
    paddingTop: vs(16),
  },
  arcDateSide: {
    position: "absolute",
    fontSize: fs(20),
    lineHeight: fs(28),
    color: colorStyle.black,
    opacity: 0.4,
    letterSpacing: -0.4,
  },
  arcDateLeftFar: {
    left: hs(25),
    top: vs(104),
    transform: [{ translateY: -fs(14) }, { rotate: "-37.14deg" }],
  },
  arcDateLeftNear: {
    left: hs(91),
    top: vs(55),
    transform: [{ translateY: -fs(14) }, { rotate: "-31.7deg" }],
  },
  arcDateRightNear: {
    right: hs(91),
    top: vs(55),
    transform: [{ translateY: -fs(14) }, { rotate: "25.51deg" }],
  },
  arcDateRightFar: {
    right: hs(25),
    top: vs(104),
    transform: [{ translateY: -fs(14) }, { rotate: "45deg" }],
  },
  arcDateCenter: {
    position: "absolute",
    top: vs(28),
    left: 0,
    right: 0,
    textAlign: "center",
    transform: [{ translateY: -fs(28) }],
    fontSize: fs(40),
    lineHeight: fs(56),
    color: colorStyle.black,
    letterSpacing: -0.8,
  },
  monthWeekWrap: {
    alignItems: "center",
    marginTop: vs(12),
    gap: vs(2),
  },
  monthLabel: {
    fontSize: fs(20),
    lineHeight: fs(28),
    color: colorStyle.Main_Text,
    letterSpacing: -0.6,
  },
  weekdayLabel: {
    fontSize: fs(16),
    lineHeight: fs(22),
    color: colorStyle.Sub1,
    letterSpacing: -0.48,
  },
  daySummary: {
    marginTop: vs(13),
    fontSize: fs(14),
    lineHeight: fs(20),
    color: MATCHED_COLORS.textMuted,
    letterSpacing: -0.42,
    textAlign: "center",
  },
  listBottomFade: {
    alignSelf: "stretch",
    width: "100%",
    height: vs(100),
    marginTop: "auto",
  },
  choreList: {
    marginTop: vs(64),
  },
  choreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: hs(12),
  },
  choreIcon: {
    width: hs(50),
    height: hs(50),
  },
  choreBody: {
    flex: 1,
    gap: vs(2),
  },
  choreTitle: {
    fontSize: fs(16),
    lineHeight: fs(22),
    color: MATCHED_COLORS.textBody,
    letterSpacing: -0.48,
  },
  choreTime: {
    fontSize: fs(20),
    lineHeight: fs(28),
    color: MATCHED_COLORS.timeText,
    letterSpacing: -0.4,
  },
  choreAssignee: {
    fontSize: fs(16),
    lineHeight: fs(22),
    color: MATCHED_COLORS.textMuted,
    letterSpacing: -0.48,
    minWidth: hs(40),
    textAlign: "right",
  },
  choreDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colorStyle.S03,
    marginTop: vs(15),
    marginBottom: vs(15),
  },
  devToggle: {
    position: "absolute",
    right: hs(12),
    top: vs(84),
    zIndex: 10,
    backgroundColor: "rgba(21, 23, 27, 0.72)",
    borderRadius: ms(8),
    paddingHorizontal: hs(10),
    paddingVertical: vs(6),
  },
  devToggleText: {
    fontSize: fs(11),
    lineHeight: fs(14),
    color: "#FFFFFF",
    letterSpacing: -0.2,
  },
});
