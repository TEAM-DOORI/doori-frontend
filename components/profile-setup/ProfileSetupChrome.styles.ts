import { StyleSheet } from "react-native";

import type { ScaleFns } from "../../constants/create-scale-api";

export const createProfileSetupChromeStyles = ({ hs, vs }: ScaleFns) =>
  StyleSheet.create({
    header: {
      paddingHorizontal: hs(20),
      paddingTop: vs(17),
    },
    headerWithProgress: {
      paddingBottom: vs(44),
    },
    headerBackOnly: {
      paddingBottom: vs(67),
    },
    progressWrap: {
      marginTop: vs(8),
    },
  });
