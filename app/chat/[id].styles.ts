import { StyleSheet } from "react-native";
import { fs, ms, vs } from "@constants";
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
    paddingVertical: vs(8),
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: ms(40),
    gap: vs(8),
    backgroundColor: colorStyle.Main2,
    // inverted FlatList의 scaleY: -1 을 상쇄해 콘텐츠를 정방향으로 표시
    transform: [{ scaleY: -1 }],
  },
  emptyIconCircle: {
    width: ms(72),
    height: ms(72),
    borderRadius: ms(36),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorStyle.white,
    marginBottom: vs(8),
  },
  emptyTitle: {
    fontSize: fs(16),
    lineHeight: fs(22),
    color: colorStyle.Main_Text,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: fs(13),
    lineHeight: fs(18),
    color: colorStyle.S05,
    textAlign: "center",
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
