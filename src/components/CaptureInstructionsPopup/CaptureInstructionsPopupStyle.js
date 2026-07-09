import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "flex-end",
  },
  sheet: {
    height: 534,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    overflow: "hidden",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray700,
    alignSelf: "center",
    marginBottom: 36,
  },
  guide: {
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: "Rubik_400Regular",
    fontSize: 22,
    lineHeight: 28,
    color: COLORS.textPrimary,
    textAlign: "left",
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: "Rubik_400Regular",
    fontSize: 16,
    lineHeight: 20,
    color: COLORS.mediumGrey,
    textAlign: "left",
    marginBottom: 20,
  },
  tipsCard: {
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 24,
    overflow: "hidden",
  },
  tipRow: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 14,
  },
  tipDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  tipIconWrap: {
    width: 44,
    alignItems: "center",
  },
  tipText: {
    flex: 1,
    fontFamily: "Rubik_400Regular",
    fontSize: 16,
    lineHeight: 20,
    color: COLORS.textPrimary,
  },
  footerTray: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  scanButton: {
    height: 46,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  scanButtonText: {
    color: COLORS.secondary,
    fontFamily: "Rubik_400Regular",
    fontSize: 16,
    lineHeight: 20,
  },
});

export default styles;
