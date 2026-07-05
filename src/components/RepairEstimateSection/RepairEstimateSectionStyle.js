import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";
import {
  SPACING,
  TYPE,
} from "../../constants/layout";

const styles = StyleSheet.create({
  sectionContainer: {
    width: "100%",
  },

  sectionTitle: {
    ...TYPE.sectionTitle,
    color: COLORS.secondary,
    textAlign: "center",
    marginBottom: SPACING.card,
  },

  estimateRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.sm,
  },

  estimateTile: {
    alignItems: "center",
    justifyContent: "center",
  },

  estimateContent: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    paddingVertical: 8,
  },

  dollarIcon: {
    fontSize: 25,
    fontWeight: "400",
    lineHeight: 27,
    color: COLORS.secondary,
    textAlign: "center",
  },

  iconContainer: {
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },

  estimateLabel: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.honeyBrown,
    textAlign: "center",
    lineHeight: 15,
    marginBottom: 3,
  },

  estimateValue: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.secondary,
    textAlign: "center",
    lineHeight: 18,
    width: "100%",
    paddingHorizontal: 2,
  },
});

export default styles;