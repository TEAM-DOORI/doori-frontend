import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

import { createScaleFns, type ScaleFns } from "../constants/create-scale-api";

type StyleFactory<T> = (scale: ScaleFns) => T;

export function useScaledStyles<T>(styleFactory: StyleFactory<T>): T {
  const { width } = useWindowDimensions();

  return useMemo(() => {
    const scaleFns = createScaleFns(width);
    return styleFactory(scaleFns);
  }, [styleFactory, width]);
}
