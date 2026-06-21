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
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    textTransform: "capitalize",
  },

  issueDescription: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 14,
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
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },

  emergencyDescription: {
    fontSize: 15,
    color: COLORS.gray300,
    lineHeight: 22,
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
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: "500",
    paddingVertical: 14,
    paddingHorizontal: SPACING.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
});

export default styles;