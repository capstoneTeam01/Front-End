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
    color: COLORS.secondary,
    textAlign: "center",
    ...TYPE.sectionTitle,
  },

  iconContainer: {
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },

  estimateLabel: {
    color: COLORS.honeyBrown,
    textAlign: "center",
    marginBottom: 3,
    ...TYPE.caption,
  },

  estimateValue: {
    color: COLORS.secondary,
    textAlign: "center",
    width: "100%",
    paddingHorizontal: 2,
    ...TYPE.small,
  },
});

export default styles;
