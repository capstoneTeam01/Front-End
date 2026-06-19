import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { RADIUS, SPACING, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.big,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.card,
  },

  badgeText: {
    ...TYPE.caption,
    color: COLORS.textPrimary,
    textTransform: "capitalize",
  },
});

export default styles;