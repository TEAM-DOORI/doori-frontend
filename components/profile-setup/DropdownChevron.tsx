import { Image } from "expo-image";

import { hs, vs } from "../../constants/scale";
import { colorStyle } from "../../constants/colors";

const DROPDOWN_CHEVRON = require("../../assets/images/profile-setup/dropdown-chevron.svg");

type DropdownChevronProps = {
  /** 기본 S05, field 칩과 동일 */
  color?: string;
  up?: boolean;
};

/** Figma node 1221:4681 — Polygon 1 (10×7, S05) */
export function DropdownChevron({
  color = colorStyle.S05,
  up = false,
}: DropdownChevronProps) {
  return (
    <Image
      source={DROPDOWN_CHEVRON}
      style={{
        width: hs(10),
        height: vs(7),
        tintColor: color,
        transform: [{ rotate: up ? "180deg" : "0deg" }],
      }}
      contentFit='contain'
      accessibilityElementsHidden
    />
  );
}
