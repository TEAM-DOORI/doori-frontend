import { StyleSheet } from "react-native";
import { fs, hs, vs } from "../../constants";
import { colorStyle } from "../../constants/colors";

export const styles = StyleSheet.create({
  banner: {
    marginHorizontal: hs(16),
    marginVertical: vs(10),
    paddingHorizontal: hs(16),
    paddingVertical: vs(10),
    borderRadius: 30,
    backgroundColor: "#E0E8FA",
    borderWidth: 1,
    borderColor: colorStyle.Main2,
  },
  text: {
    fontSize: fs(12),
    color: "#5370A8",
    lineHeight: fs(18),
  },
  bold: {
    fontSize: fs(12),
    color: "#5370A8",
  },
});
