import { StyleSheet } from "react-native";
import { fs, hs, vs } from "@constants";
import { colorStyle } from "@constants/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: hs(20),
    paddingTop: vs(6),
    paddingBottom: vs(6),
    backgroundColor: colorStyle.white,
  },
  inputBox: {
    flex: 1,
    height: vs(45),
    marginHorizontal: hs(8),
    borderRadius: hs(30),
    borderWidth: 1,
    borderColor: colorStyle.Main,
    backgroundColor: colorStyle.S01,
    justifyContent: "center",
    paddingHorizontal: hs(16),
  },
  input: {
    flex: 1,
    fontSize: fs(14),
    color: colorStyle.TextBody,
  },
  sendDisabled: {
    opacity: 0.35,
  },
});
