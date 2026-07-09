import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { BOTTOM_NAV_HEIGHT, RADIUS, SIDE_PADDING, SPACING, TYPE } from "../constants/layout";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    height: 128,
    paddingTop: 52,
    paddingHorizontal: SIDE_PADDING,
    backgroundColor: COLORS.lightHoney,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    color: COLORS.secondary,
    ...TYPE.cardTitle,
  },

  headerSpace: {
    width: 24,
  },

  scroll: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: SPACING.sm,
    paddingBottom: 120,
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

  emptyText: {
    color: COLORS.textMuted,
    ...TYPE.body,
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: BOTTOM_NAV_HEIGHT,
    paddingTop: SPACING.card,
    paddingHorizontal: 34,
    backgroundColor: COLORS.lightHoney,
    borderTopLeftRadius: RADIUS.big,
    borderTopRightRadius: RADIUS.big,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  navText: {
    color: COLORS.honeyBrown,
    ...TYPE.caption,
  },

  navActive: {
    color: COLORS.secondary,
    ...TYPE.caption,
  },
});

export default styles;
