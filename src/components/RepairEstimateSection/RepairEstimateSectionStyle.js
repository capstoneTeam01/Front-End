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
    textAlign: "center",
    marginBottom: 10,
  },

  estimateRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  estimateBox: {
    flex: 1,
    minHeight: 86,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray500,
    borderRadius: RADIUS.medium,
    paddingVertical: 14,
    paddingHorizontal: SPACING.sm,
    alignItems: "center",
    justifyContent: "center",
  },

  estimateLabel: {
    ...TYPE.caption,
    fontWeight: "400",
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },

  estimateValue: {
    ...TYPE.small,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "center",
    flexShrink: 1,
  },
});

export default styles;