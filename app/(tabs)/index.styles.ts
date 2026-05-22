import { StyleSheet } from "react-native";
import { fs, hs, ms, vs } from "../../constants";

export const COLORS = {
  bgTop: "#F3F6FF",
  bgBottom: "#C8D9FF",
  primary: "#4E6FD3",
  textDark: "#1A3262",
  textGray: "#696E71",
  textOnPrimary: "#F8F9FA",
  chipLight: "#FFFFFF",
  ctaBg: "#FFF195",
  ctaText: "#5B4F02",
  cardGradientFrom: "#FFFFFF",
};

const SCREEN_WIDTH = 393;
export const CARD_WIDTH = hs(255);
export const CARD_HEIGHT = ms(335, 0.5);
export const CARD_GAP = hs(8);
export const CARD_RAISE = vs(50);

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
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
  bell: {
    width: hs(30),
    height: hs(30),
  },

  titleWrap: {
    paddingHorizontal: hs(20),
    paddingTop: vs(46),
  },
  titleLine: {
    fontSize: fs(24),
    lineHeight: fs(34),
    color: COLORS.textDark,
    letterSpacing: -0.96,
  },
  titleName: {
    color: COLORS.primary,
  },

  topChipsRow: {
    flexDirection: "row",
    paddingHorizontal: hs(20),
    marginTop: vs(18),
    gap: hs(6),
  },
  chipLight: {
    backgroundColor: COLORS.chipLight,
    borderRadius: ms(16),
    paddingHorizontal: hs(12),
    paddingVertical: vs(7),
    minWidth: hs(57),
    alignItems: "center",
    justifyContent: "center",
  },
  chipLightText: {
    fontSize: fs(12.77),
    lineHeight: fs(19),
    color: COLORS.textGray,
    letterSpacing: -0.53,
  },

  heroWrap: {
    position: "absolute",
    right: hs(20),
    top: vs(46),
    width: hs(118),
    height: vs(127),
    overflow: "visible",
  },
  hero: {
    position: "absolute",
    left: 0,
    width: "100%",
    height: "100%",
  },

  carouselWrap: {
    marginTop: vs(36),
    height: CARD_HEIGHT + CARD_RAISE,
  },
  carouselContent: {
    paddingHorizontal: (SCREEN_WIDTH - 255) / 2,
  },
  cardOuter: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginHorizontal: CARD_GAP / 2,
  },
  cardGradient: {
    flex: 1,
    borderTopLeftRadius: CARD_WIDTH / 2,
    borderTopRightRadius: CARD_WIDTH / 2,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    alignItems: "center",
    paddingTop: vs(26),
  },
  profile: {
    width: hs(88),
    height: hs(88),
    borderRadius: hs(44),
  },
  name: {
    marginTop: vs(17),
    fontSize: fs(20),
    lineHeight: fs(26),
    color: "#080808",
    textAlign: "center",
  },
  matchRate: {
    marginTop: vs(2),
    fontSize: fs(14),
    lineHeight: fs(20),
    color: COLORS.primary,
    textAlign: "center",
  },
  cardChipsRow: {
    flexDirection: "row",
    marginTop: vs(19),
    gap: hs(8),
  },
  chipPrimary: {
    backgroundColor: COLORS.primary,
    borderRadius: ms(16),
    paddingHorizontal: hs(12),
    paddingVertical: vs(7),
    minWidth: hs(57),
    alignItems: "center",
    justifyContent: "center",
  },
  chipPrimaryText: {
    fontSize: fs(12.77),
    lineHeight: fs(19),
    color: COLORS.textOnPrimary,
    letterSpacing: -0.53,
  },

  cta: {
    marginTop: vs(35),
    width: hs(215),
    height: vs(50),
    backgroundColor: COLORS.ctaBg,
    borderRadius: ms(15),
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    fontSize: fs(20),
    lineHeight: fs(26),
    color: COLORS.ctaText,
    letterSpacing: -0.8,
  },
});
