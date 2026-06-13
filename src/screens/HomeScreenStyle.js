import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import {
  SIDE_PADDING,
  SPACING,
  RADIUS,
  TYPE,
  BOTTOM_NAV_HEIGHT,
} from "../constants/layout";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scroll: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 8,
    paddingBottom: BOTTOM_NAV_HEIGHT + 24,
  },

  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  locationText: {
    fontSize: TYPE.body.fontSize,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },

  hero: {
    marginTop: SPACING.large,
    alignItems: "center",
  },

  heroTitle: {
    fontSize: TYPE.screenTitle.fontSize,
    fontWeight: TYPE.screenTitle.fontWeight,
    color: COLORS.textPrimary,
    marginBottom: 12,
    textAlign: "center",
  },

  heroSubtitle: {
    fontSize: TYPE.body.fontSize,
    fontWeight: "400",
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 24,
  },

  scanWrap: {
    alignItems: "center",
    marginTop: SPACING.large,
    marginBottom: SPACING.large,
  },

  centerSection: {
    fontSize: TYPE.sectionTitle.fontSize,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.section,
  },

  grid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: SPACING.large,
  },

  popularHeader: {
    marginBottom: SPACING.card,
  },

  repairsCard: {
    borderRadius: RADIUS.big,
    backgroundColor: COLORS.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.divider,

    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },

  stateBox: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  emptyTitle: {
    fontSize: TYPE.body.fontSize,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginTop: 4,
  },

  emptyText: {
    fontSize: TYPE.small.fontSize,
    color: COLORS.textMuted,
    textAlign: "center",
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: BOTTOM_NAV_HEIGHT,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.gray500,
    paddingTop: 10,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },

  navLabel: {
    fontSize: TYPE.caption.fontSize,
    color: COLORS.navInactive,
  },

  navLabelActive: {
    color: COLORS.navActive,
  },
});

export default styles;