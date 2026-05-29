import { StyleSheet } from "react-native";
import { fs, vs } from "../../constants";
import { colorStyle } from "../../constants/colors";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerZone: {
    backgroundColor: "#FFFFFF",
  },
  contentZone: {
    flex: 1,
    backgroundColor: colorStyle.Main2,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: vs(60),
  },
  emptyText: {
    fontSize: fs(14),
    color: colorStyle.S05,
  },
});
