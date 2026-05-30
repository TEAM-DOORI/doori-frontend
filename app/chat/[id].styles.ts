import { StyleSheet } from "react-native";
import { colorStyle } from "@constants/colors";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colorStyle.white,
  },
  headerZone: {
    backgroundColor: colorStyle.white,
  },
  keyboardAvoid: {
    flex: 1,
  },
  messageList: {
    flex: 1,
    backgroundColor: colorStyle.Main2,
  },
  messageListContent: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorStyle.Main2,
  },
  emptyText: {
    color: colorStyle.S05,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundText: {
    color: colorStyle.S05,
  },
});
