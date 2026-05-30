import { StyleSheet } from "react-native";
import { vs } from "@constants";
import { colorStyle } from "@constants/colors";
import { BUTTON_WIDTH } from "./ChatSwipeActions.constants";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  actionButton: {
    width: BUTTON_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    gap: vs(4),
  },
  muteButton: {
    backgroundColor: colorStyle.S05,
  },
  deleteButton: {
    backgroundColor: colorStyle.Sub2,
  },
});
