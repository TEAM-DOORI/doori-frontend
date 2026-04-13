import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 35,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  label: {
    fontSize: 12,
    color: "#39445F",
  },
});
