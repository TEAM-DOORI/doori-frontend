import { StyleSheet } from "react-native";
import { fs, vs } from "../../constants";
import { colorStyle } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colorStyle.S02,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: vs(12),
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: colorStyle.Sub1,
  },
  label: {
    fontSize: fs(14),
    color: "#2E2E2E",
  },
  labelActive: {
    color: colorStyle.Sub1,
  },
});
