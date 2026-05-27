import { StyleSheet } from "react-native";

import type { ScaleFns } from "../../constants/create-scale-api";
import { color } from "../../constants/colors";

export const createProgressBarStyles = ({ vs, ms }: ScaleFns) =>
  StyleSheet.create({
    track: {
      width: "100%",
      height: vs(6),
      borderRadius: ms(2),
      backgroundColor: color.progressTrack,
      overflow: "hidden",
    },
    fill: {
      height: "100%",
      borderRadius: ms(2),
      backgroundColor: color.progressFill,
    },
  });
