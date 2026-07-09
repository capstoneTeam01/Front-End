import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import {
  SPACING,
  TYPE,
} from "../../constants/layout";

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "400",
    color: COLORS.secondary,
    marginBottom: 16,
  },

  actionsCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray500,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 36,
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
    ...TYPE.small,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.mediumGrey,
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
