import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { RADIUS, SIDE_PADDING, SPACING, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.big,
    borderTopRightRadius: RADIUS.big,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 12,
    paddingBottom: 36,
  },
  handle: {
    alignSelf: "center",
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.gray500,
    marginBottom: SPACING.card,
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    ...TYPE.cardTitle,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: RADIUS.field,
  },
  rowActive: {
    backgroundColor: COLORS.warmCream,
  },
  rowText: {
    color: COLORS.surfaceDark,
    ...TYPE.body,
  },
  rowTextActive: {
    color: COLORS.textPrimary,
  },
  check: {
    color: COLORS.primary,
    ...TYPE.body,
  },
});

export default styles;
