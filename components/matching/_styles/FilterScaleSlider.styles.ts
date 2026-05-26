import { StyleSheet } from "react-native";

import { colorStyle } from "../../../constants/colors";
import type { ScaleFns } from "../../../constants/create-scale-api";
import { figmaLetterSpacing } from "../../../constants/matching-figma";

export const getFilterScaleSliderMetrics = ({ hs, vs }: ScaleFns) => ({
  thumbRadius: hs(8.5),
  thumbSize: hs(17),
  trackHeight: vs(5),
});

export const createFilterScaleSliderStyles = (scale: ScaleFns) => {
  const { hs, vs, fs } = scale;
  const metrics = getFilterScaleSliderMetrics(scale);

  return StyleSheet.create({
    root: {
      width: "100%",
      gap: vs(6),
      overflow: "visible",
    },
    trackWrap: {
      width: "100%",
      height: vs(17),
      justifyContent: "center",
      paddingHorizontal: metrics.thumbRadius,
      overflow: "visible",
    },
    trackArea: {
      width: "100%",
      height: vs(17),
      justifyContent: "center",
      overflow: "visible",
    },
    track: {
      width: "100%",
      height: metrics.trackHeight,
      borderRadius: hs(999),
      backgroundColor: colorStyle.S02,
    },
    thumb: {
      position: "absolute",
      width: metrics.thumbSize,
      height: vs(17),
      borderRadius: hs(999),
      backgroundColor: colorStyle.Sub1,
      top: 0,
    },
    labelsRow: {
      flexDirection: "row",
      width: "100%",
      paddingHorizontal: metrics.thumbRadius,
    },
    labelCell: {
      flex: 1,
      minWidth: 0,
    },
    label: {
      fontSize: fs(15),
      lineHeight: vs(15 * 1.4),
      letterSpacing: figmaLetterSpacing(15, -4),
      color: colorStyle.S05,
    },
    labelActive: {
      color: colorStyle.Main_Text,
    },
    labelLeft: {
      textAlign: "left",
      alignSelf: "flex-start",
    },
    labelCenter: {
      textAlign: "center",
      alignSelf: "center",
    },
    labelRight: {
      textAlign: "right",
      alignSelf: "flex-end",
    },
    labelPlaceholder: {
      height: vs(15 * 1.4),
    },
  });
};
