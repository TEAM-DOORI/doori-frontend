import { StyleSheet } from "react-native";

import { colorStyle } from "../../../constants/colors";
import type { ScaleFns } from "../../../constants/create-scale-api";
import {
  MATCHING_FIGMA,
  figmaLetterSpacing,
  matchingColors,
} from "../../../constants/matching-figma";

export const createRecommendationsStyles = ({ hs, vs, fs, ms }: ScaleFns) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    gradientSection: {
      position: "relative",
      height: vs(MATCHING_FIGMA.bottomPanel.y),
      overflow: "visible",
    },
    hero: {
      paddingTop: vs(MATCHING_FIGMA.back.y - MATCHING_FIGMA.statusBarHeight),
    },
    backRow: {
      paddingLeft: hs(MATCHING_FIGMA.back.x),
      height: vs(MATCHING_FIGMA.back.size),
      justifyContent: "center",
      zIndex: 3,
    },
    introWrap: {
      marginBottom: vs(
        MATCHING_FIGMA.carousel.y -
          (MATCHING_FIGMA.intro.y + MATCHING_FIGMA.intro.height)
      ),
      zIndex: 3,
    },
    carouselSection: {
      marginTop: vs(-8),
      zIndex: 0,
      elevation: 0,
    },
    characterWrap: {
      position: "absolute",
      top: vs(MATCHING_FIGMA.character.y),
      left: hs(MATCHING_FIGMA.character.x),
      width: hs(MATCHING_FIGMA.character.groupWidth),
      height: vs(MATCHING_FIGMA.character.groupHeight),
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
      elevation: 2,
    },
    character: {
      width: hs(MATCHING_FIGMA.character.imageWidth),
      height: vs(MATCHING_FIGMA.character.imageHeight),
    },
    bottomPanel: {
      backgroundColor: "#FFFFFF",
      paddingTop: vs(10),
      minHeight: vs(320),
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: hs(20),
      paddingVertical: vs(10),
      overflow: "visible",
    },
    sectionTitles: {
      flex: 1,
      gap: vs(6),
      marginRight: hs(8),
      minWidth: 0,
    },
    sectionTitle: {
      fontSize: fs(22),
      lineHeight: vs(22 * 1.193359375),
      letterSpacing: figmaLetterSpacing(22, -3),
      color: matchingColors.titleInk,
    },
    sectionSubtitle: {
      fontSize: fs(14),
      lineHeight: vs(14 * 1.4285714285714286),
      letterSpacing: figmaLetterSpacing(14, -3),
      color: matchingColors.bodyInk,
      flexShrink: 0,
      alignSelf: "flex-start",
    },
    headerBackHit: {
      width: hs(30),
      height: hs(30),
      alignItems: "center",
      justifyContent: "center",
    },
    filterRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: hs(7),
      paddingHorizontal: hs(20),
      paddingBottom: vs(10),
    },
    filterChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: hs(8),
      backgroundColor: colorStyle.S01,
      borderWidth: hs(1),
      borderColor: colorStyle.S03,
      borderRadius: ms(999),
      paddingVertical: vs(9),
      paddingHorizontal: hs(18),
    },
    filterChipWide: {
      width: hs(87),
      justifyContent: "center",
    },
    filterChipActive: {
      backgroundColor: colorStyle.Main2,
      borderColor: colorStyle.Main2,
    },
    filterIcon: {
      width: hs(15),
      height: vs(18),
    },
    filterChipText: {
      fontSize: fs(15),
      lineHeight: vs(15 * 1.4),
      letterSpacing: figmaLetterSpacing(15, -3),
      color: matchingColors.bodyInk,
    },
    filterChipTextActive: {
      color: matchingColors.bodyInk,
    },
    divider: {
      height: hs(1.5),
      backgroundColor: matchingColors.divider,
      marginHorizontal: hs(20),
    },
    list: {
      paddingHorizontal: hs(20),
      paddingBottom: vs(32),
    },
  });
