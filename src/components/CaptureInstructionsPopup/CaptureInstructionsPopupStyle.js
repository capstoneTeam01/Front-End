import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { BUTTON_HEIGHT, RADIUS, SIDE_PADDING, SPACING, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
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
    paddingHorizontal: SIDE_PADDING,
  },
  title: {
    color: COLORS.textPrimary,
    textAlign: "left",
    marginBottom: SPACING.card,
    ...TYPE.sectionTitle,
  },
  subtitle: {
    color: COLORS.mediumGrey,
    textAlign: "left",
    marginBottom: SPACING.card,
    ...TYPE.body,
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
    paddingHorizontal: SPACING.card,
    paddingVertical: SPACING.card,
    gap: 12,
  },
  tipDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  tipIconWrap: {
    width: 50,
    alignItems: "center",
  },
  tipText: {
    flex: 1,
    color: COLORS.textPrimary,
    ...TYPE.body,
  },
  footer: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: SPACING.card,
  },
  scanButton: {
    height: BUTTON_HEIGHT,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.field,
    alignItems: "center",
    justifyContent: "center",
  },
  scanButtonText: {
    color: COLORS.secondary,
    ...TYPE.button,
  },
});

export default styles;
