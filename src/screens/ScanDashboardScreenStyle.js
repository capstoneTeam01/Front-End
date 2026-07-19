import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import {
  SIDE_PADDING,
  TYPE,
  BOTTOM_NAV_HEIGHT,
  SPACING,
} from "../constants/layout";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scroll: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 0,
    paddingBottom: BOTTOM_NAV_HEIGHT + 40,
  },

  heroWrap: {
    alignItems: "center",
  },

  scanWrap: {
    alignItems: "center",
    zIndex: 2,
  },

  heroTitle: {
    color: COLORS.secondary,
    marginBottom: SPACING.card,
    textAlign: "center",
    ...TYPE.screenTitle,
  },

  heroSubtitle: {
    color: COLORS.honeyBrown,
    textAlign: "center",
    ...TYPE.body,
  },

  section: {
    marginTop: SPACING.section,
  },

  scanList: {
    paddingTop: 18,
    paddingBottom: 4,
  },

  completedList: {
    marginTop: SPACING.card,
    gap: SPACING.card,
  },

  stateText: {
    color: COLORS.textMuted,
    marginTop: SPACING.card,
    ...TYPE.body,
  },

  emptyText: {
    color: COLORS.textMuted,
    ...TYPE.body,
  },
});

export default styles;
