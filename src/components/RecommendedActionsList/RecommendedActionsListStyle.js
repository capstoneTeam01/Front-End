import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { RADIUS, SPACING, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  sectionTitle: {
    color: COLORS.secondary,
    marginBottom: SPACING.card,
    ...TYPE.cardTitle,
  },

  actionsCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray500,
    borderRadius: RADIUS.big,
    overflow: "hidden",
    marginBottom: 24,
  },

  actionItem: {
    minHeight: 54,
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: SPACING.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },

  actionText: {
    color: COLORS.mediumGrey,
    ...TYPE.small,
  },

  emptyText: {
    color: COLORS.textSecondary,
    padding: SPACING.card,
    ...TYPE.small,
  },
});

export default styles;
