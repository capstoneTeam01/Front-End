import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { RADIUS, SPACING, TYPE } from "../constants/layout";

const styles = StyleSheet.create({
  row: {
    minHeight: 104,
    borderWidth: 1,
    borderColor: COLORS.gray500,
    borderRadius: RADIUS.big,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.card,
    marginBottom: SPACING.card,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  divider: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray300,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconChip: {
    width: 72,
    height: 72,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.card,
  },

  text: {
    flex: 1,
  },

  title: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    ...TYPE.cardTitle,
  },

  subtitle: {
    color: COLORS.textSecondary,
    ...TYPE.small,
  },
});

export default styles;
