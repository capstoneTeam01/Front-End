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
    gap: 16,
    alignItems: "center",
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
    paddingHorizontal: 10,
    paddingVertical: 12,
  },

  iconContainer: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },

  estimateLabel: {
    color: COLORS.honeyBrown,
    textAlign: "center",
    lineHeight: 14,
    marginBottom: 4,
    ...TYPE.caption,
  },

  estimateValue: {
    color: COLORS.secondary,
    textAlign: "center",
    lineHeight: 16,
    textTransform: "capitalize",
    width: "100%",
    paddingHorizontal: 4,
    ...TYPE.small,
  },
});

export default styles;
