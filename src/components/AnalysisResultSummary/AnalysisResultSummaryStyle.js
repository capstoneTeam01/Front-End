import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";
import {
  RADIUS,
  SPACING,
  TYPE,
} from "../../constants/layout";

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray500,
    borderRadius: RADIUS.big,
    padding: SPACING.card,
    marginBottom: SPACING.card,
  },

  issueTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    textTransform: "capitalize",
    ...TYPE.cardTitle,
  },

  issueDescription: {
    color: COLORS.textSecondary,
    marginBottom: SPACING.card,
    ...TYPE.body,
  },

  warningCard: {
    backgroundColor: COLORS.textPrimary,
    borderRadius: RADIUS.big,
    padding: SPACING.card,
    marginBottom: SPACING.section,
  },

  urgencyBadgeContainer: {
    marginBottom: SPACING.sm,
  },

  emergencyTitle: {
    color: COLORS.white,
    marginBottom: SPACING.sm,
    ...TYPE.sectionTitle,
  },

  emergencyDescription: {
    color: COLORS.gray300,
    ...TYPE.body,
  },

  sectionTitle: {
    ...TYPE.sectionTitle,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },

  riskCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray500,
    borderRadius: RADIUS.medium,
    overflow: "hidden",
    marginBottom: SPACING.section,
  },

  riskText: {
    color: COLORS.textPrimary,
    paddingVertical: SPACING.card,
    paddingHorizontal: SPACING.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    ...TYPE.body,
  },
});

export default styles;
