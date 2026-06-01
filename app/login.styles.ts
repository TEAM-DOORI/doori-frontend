import { StyleSheet } from "react-native";
import { fs, hs, ms, vs } from "../constants";

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: hs(24),
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: vs(110),
    paddingBottom: vs(24),
  },
  logoSection: {
    alignItems: "center",
    marginBottom: vs(24),
  },
  subtitle: {
    fontSize: fs(20),
    lineHeight: vs(30),
    color: "#3B3869",
    textAlign: "center",
    marginBottom: vs(8),
  },
  logo: {
    width: hs(210),
    height: vs(126),
  },
  actionBlock: {
    width: "100%",
    alignItems: "center",
    marginTop: vs(48),
  },
  characterSection: {
    alignItems: "center",
    marginBottom: vs(-30),
    zIndex: 2,
    elevation: 2,
  },
  speechGroup: {
    alignItems: "center",
    width: hs(207),
  },
  speechBubble: {
    backgroundColor: "#FFFFFF",
    borderRadius: ms(99),
    paddingHorizontal: hs(16),
    paddingVertical: vs(8),
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: vs(2) },
    shadowOpacity: 0.06,
    shadowRadius: ms(8),
    elevation: 3,
  },
  speechBubbleTail: {
    width: 0,
    height: 0,
    borderLeftWidth: hs(8),
    borderRightWidth: hs(8),
    borderTopWidth: vs(10),
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#FFFFFF",
    marginTop: 0,
    marginBottom: 0,
  },
  speechText: {
    fontSize: fs(15),
    lineHeight: vs(22),
    color: "#3B3869",
    textAlign: "center",
  },
  character: {
    width: hs(207),
    height: vs(143),
    marginTop: vs(-2),
  },
  footer: {
    width: "100%",
    gap: vs(12),
    zIndex: 1,
    elevation: 1,
  },
  primaryButton: {
    backgroundColor: "#FFEF82",
    borderRadius: ms(15),
    paddingVertical: vs(16),
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonPressed: {
    opacity: 0.92,
  },
  primaryButtonText: {
    fontSize: fs(18),
    lineHeight: vs(24),
    color: "#3B3869",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: ms(15),
    paddingVertical: vs(16),
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonPressed: {
    opacity: 0.92,
  },
  secondaryButtonText: {
    fontSize: fs(18),
    lineHeight: vs(24),
    color: "#777777",
  },
});
