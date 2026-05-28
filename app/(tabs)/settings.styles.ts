import { StyleSheet } from "react-native";

import { fs, hs, ms, vs } from "../../constants";
import { colorStyle } from "../../constants/colors";

export const COLORS = {
  bg: colorStyle.Main2,
  cardBg: colorStyle.Main2,
  sectionTitle: colorStyle.Sub1,
  text: colorStyle.Main_Text,
  textMuted: colorStyle.S05,
  divider: colorStyle.S03,
} as const;

export const PROFILE_SIZE = hs(112);
export const PROFILE_IMAGE_SIZE = hs(98);

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: hs(20),
  },
  pageTitle: {
    marginTop: vs(18),
    fontSize: fs(22),
    lineHeight: fs(31),
    color: COLORS.text,
    letterSpacing: -0.66,
  },
  heroSection: {
    marginTop: vs(20),
    marginHorizontal: -hs(20),
    borderTopLeftRadius: ms(200),
    borderTopRightRadius: ms(200),
    overflow: "hidden",
    paddingBottom: vs(20),
  },
  heroInner: {
    paddingHorizontal: hs(20),
    alignItems: "center",
    width: "100%",
  },
  profileBlock: {
    alignItems: "center",
    marginTop: vs(16),
    width: "100%",
  },
  profileRing: {
    width: PROFILE_SIZE,
    height: PROFILE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_SIZE / 2,
  },
  userInfoLine: {
    marginTop: vs(15),
    textAlign: "center",
  },
  schoolInline: {
    fontSize: fs(16),
    lineHeight: fs(24),
    color: COLORS.textMuted,
    letterSpacing: -0.64,
  },
  userNameInline: {
    fontSize: fs(24),
    lineHeight: fs(24),
    color: COLORS.text,
    letterSpacing: -0.96,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: vs(32),
    gap: hs(15),
    paddingHorizontal: hs(10),
  },
  actionCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: ms(20),
    paddingTop: vs(12),
    paddingBottom: vs(18),
    paddingHorizontal: hs(14),
    alignItems: "center",
    gap: vs(6),
  },
  actionIcon: {
    width: hs(45),
    height: hs(45),
  },
  actionLabel: {
    fontSize: fs(17),
    lineHeight: fs(24),
    color: COLORS.text,
    letterSpacing: -0.54,
    textAlign: "center",
  },
  menuWrap: {
    marginTop: vs(36),
    gap: vs(38),
  },
  menuSection: {
    gap: vs(30),
  },
  sectionTitle: {
    fontSize: fs(18),
    lineHeight: fs(22),
    color: COLORS.sectionTitle,
    letterSpacing: -0.54,
  },
  menuItems: {
    gap: vs(40),
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuLabel: {
    fontSize: fs(20),
    lineHeight: fs(24),
    color: COLORS.text,
    letterSpacing: -0.6,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.divider,
    width: "100%",
  },
});
