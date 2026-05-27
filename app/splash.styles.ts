import { StyleSheet } from "react-native";

import type { ScaleFns } from "../constants/create-scale-api";

export const SPLASH_DURATION_MS = 2500;

export const createSplashStyles = ({ hs, vs }: ScaleFns) =>
  StyleSheet.create({
    root: {
      flex: 1,
      overflow: "hidden",
    },
    characterBlue: {
      position: "absolute",
      top: vs(-40),
      right: hs(-100),
      width: hs(336),
      height: vs(432),
      transform: [{ rotate: "-67.2deg" }],
    },
    characterYellow: {
      position: "absolute",
      left: hs(-180),
      bottom: vs(-20),
      width: hs(460),
      height: vs(600),
      transform: [{ rotate: "30.44deg" }],
    },
    logo: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: hs(99),
      height: vs(182),
      marginTop: vs(-91),
      marginLeft: hs(-49.5),
    },
  });
