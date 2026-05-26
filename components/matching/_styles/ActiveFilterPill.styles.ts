import { StyleSheet } from "react-native";

import { colorStyle } from "../../../constants/colors";
import type { ScaleFns } from "../../../constants/create-scale-api";
import { figmaLetterSpacing } from "../../../constants/matching-figma";

export const createActiveFilterPillStyles = ({ hs, vs, fs, ms }: ScaleFns) =>
  StyleSheet.create({
    pill: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      minWidth: hs(120),
      maxWidth: hs(307),
      flexGrow: 1,
      paddingVertical: vs(12),
      paddingHorizontal: hs(18),
      borderRadius: ms(20),
      backgroundColor: colorStyle.Main2,
    },
    label: {
      fontSize: fs(16),
      lineHeight: vs(16 * 1.4),
      letterSpacing: figmaLetterSpacing(16, -4),
      color: "#121212",
      marginRight: hs(12),
    },
    removeButton: {
      minWidth: hs(44),
      minHeight: vs(44),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: ms(22),
    },
  });
