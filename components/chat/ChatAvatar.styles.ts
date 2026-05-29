import { StyleSheet } from "react-native";
import { hs, vs } from "../../constants";
import { colorStyle } from "../../constants/colors";

export const AVATAR_SIZE = hs(52.5);
export const FOOD_SIZE = hs(57.5);
export const MEMBER_SIZE = hs(27);
export const ONLINE_DOT_SIZE = hs(10);
export const MEMBER_OVERLAP = hs(12);
export const CONTAINER_SIZE = hs(60);

export const styles = StyleSheet.create({
  container: {
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },

  // single variant
  singleImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  onlineDot: {
    position: "absolute",
    top: vs(7),
    right: hs(7),
    width: ONLINE_DOT_SIZE,
    height: ONLINE_DOT_SIZE,
    borderRadius: ONLINE_DOT_SIZE / 2,
    backgroundColor: colorStyle.Sub1,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },

  // group variant
  groupWrapper: {
    width: CONTAINER_SIZE,
    height: CONTAINER_SIZE,
    position: "relative",
  },
  foodImage: {
    position: "absolute",
    top: 0,
    left: (CONTAINER_SIZE - FOOD_SIZE) / 2,
    width: FOOD_SIZE,
    height: FOOD_SIZE,
    borderRadius: FOOD_SIZE / 2,
  },
  membersRow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  memberImage: {
    width: MEMBER_SIZE,
    height: MEMBER_SIZE,
    borderRadius: MEMBER_SIZE / 2,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
});
