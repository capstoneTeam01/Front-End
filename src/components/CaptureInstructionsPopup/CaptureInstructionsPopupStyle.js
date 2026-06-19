import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { RADIUS, SIDE_PADDING, TYPE } from "../../constants/layout";

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
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 12,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray500,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: TYPE.sectionTitle.fontSize,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: TYPE.small.fontSize,
    fontWeight: "400",
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  tipsCard: {
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: RADIUS.medium,
    overflow: "hidden",
    marginBottom: 24,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  tipDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  tipIconWrap: {
    width: 28,
    alignItems: "center",
  },
  tipText: {
    flex: 1,
    fontSize: TYPE.body.fontSize,
    fontWeight: "400",
    color: COLORS.textPrimary,
  },
  scanButton: {
    backgroundColor: COLORS.gray900,
    borderRadius: RADIUS.field,
    paddingVertical: 16,
    alignItems: "center",
  },
  scanButtonText: {
    color: COLORS.white,
    fontSize: TYPE.button.fontSize,
    fontWeight: "600",
  },
});

export default styles;
