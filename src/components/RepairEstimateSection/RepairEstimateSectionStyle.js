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
    justifyContent: "space-between",
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
    paddingHorizontal: 6,
    paddingVertical: 8,
  },

  iconContainer: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
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
    textTransform: "capitalize",
    width: "100%",
    paddingHorizontal: 2,
    ...TYPE.small,
  },
});

export default styles;
