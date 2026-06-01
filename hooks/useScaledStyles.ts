import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

import {
  createScaleFns,
  type ScaleFns,
} from "../constants/create-scale-api";

export function useScaledStyles<T>(
  factory: (scale: ScaleFns) => T
): T {
  const { width } = useWindowDimensions();

  return useMemo(() => factory(createScaleFns(width)), [width, factory]);
}
