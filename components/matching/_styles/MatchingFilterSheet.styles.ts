import { StyleSheet } from "react-native";

import { colorStyle } from "../../../constants/colors";
import type { ScaleFns } from "../../../constants/create-scale-api";
import { figmaLetterSpacing } from "../../../constants/matching-figma";

export const createMatchingFilterSheetStyles = ({ hs, vs, fs }: ScaleFns) =>
  StyleSheet.create({
    sheet: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      maxHeight: "92%",
      backgroundColor: "#FFFFFF",
      borderTopLeftRadius: hs(30),
      borderTopRightRadius: hs(30),
      paddingTop: vs(30),
      paddingBottom: vs(20),
      overflow: "hidden",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: vs(20),
      paddingHorizontal: hs(20),
    },
    title: {
      fontSize: fs(18),
      lineHeight: vs(18 * 1.4),
      letterSpacing: figmaLetterSpacing(18, -4),
      color: colorStyle.Main_Text,
    },
    scroll: {
      flexGrow: 0,
    },
    scrollContent: {
      gap: vs(0),
      paddingBottom: vs(24),
      paddingHorizontal: hs(20),
    },
    sectionGroup: {
      borderBottomWidth: hs(2),
      borderBottomColor: colorStyle.S01,
      paddingVertical: vs(26),
      gap: vs(26),
    },
    sectionGroupLast: {
      borderBottomWidth: 0,
    },
    section: {
      gap: vs(12),
    },
    sectionTitle: {
      fontSize: fs(18),
      lineHeight: vs(18 * 1.4),
      letterSpacing: figmaLetterSpacing(18, -4),
      color: "#4B566A",
      flexShrink: 0,
    },
    chipWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
      gap: hs(8),
      rowGap: vs(10),
    },
    gradeChipRows: {
      width: "100%",
      gap: vs(10),
    },
    gradeChipRow: {
      flexDirection: "row",
      alignItems: "stretch",
      width: "100%",
      gap: hs(8),
    },
    sliderSection: {
      gap: vs(40),
    },
    sliderBlock: {
      gap: vs(15),
    },
    sociabilitySection: {
      gap: vs(50),
      paddingVertical: vs(26),
      borderBottomWidth: hs(2),
      borderBottomColor: colorStyle.S01,
    },
    sociabilityCards: {
      gap: vs(10),
    },
    mbtiSection: {
      gap: vs(12),
      paddingTop: vs(26),
    },
    mbtiHint: {
      fontSize: fs(14),
      lineHeight: vs(14 * 1.4),
      letterSpacing: figmaLetterSpacing(14, -4),
      color: colorStyle.S04,
    },
  });
