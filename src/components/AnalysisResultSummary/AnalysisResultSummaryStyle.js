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
    marginBottom: 18,
  },

  issueTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    textTransform: "capitalize",
    ...TYPE.sectionTitle,
  },

  issueDescription: {
    color: COLORS.textSecondary,
    marginBottom: 14,
    ...TYPE.body,
  },

  warningCard: {
    backgroundColor: COLORS.textPrimary,
    borderRadius: RADIUS.big,
    padding: SPACING.card,
    marginBottom: 20,
  },

  urgencyBadgeContainer: {
    marginBottom: 12,
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
    marginBottom: 10,
  },

  riskCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray500,
    borderRadius: RADIUS.medium,
    overflow: "hidden",
    marginBottom: 20,
  },

  riskText: {
    color: COLORS.textPrimary,
    paddingVertical: 14,
    paddingHorizontal: SPACING.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    ...TYPE.body,
  },
});

export default styles;
