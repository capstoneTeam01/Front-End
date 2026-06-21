import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import {
  RADIUS,
  SPACING,
  TYPE,
} from "../../constants/layout";

const styles = StyleSheet.create({
  sectionTitle: {
    ...TYPE.sectionTitle,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },

  actionsCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray500,
    borderRadius: RADIUS.medium,
    overflow: "hidden",
    marginBottom: SPACING.section,
  },

  actionItem: {
    paddingVertical: 14,
    paddingHorizontal: SPACING.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },

  actionText: {
    ...TYPE.small,
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },

  emptyText: {
    ...TYPE.small,
    fontSize: 15,
    color: COLORS.textSecondary,
    padding: SPACING.card,
    lineHeight: 22,
  },
});

export default styles;