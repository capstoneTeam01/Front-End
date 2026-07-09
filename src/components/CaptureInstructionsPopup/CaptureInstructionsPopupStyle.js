import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { HEADER_FOOTER } from "../../constants/typography";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
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
  footer: {
    paddingHorizontal: 24,
    paddingTop: 20,
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
    ...HEADER_FOOTER.footerButton,
  },
});

export default styles;
