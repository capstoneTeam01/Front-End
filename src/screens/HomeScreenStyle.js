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
    paddingTop: 0,
    paddingBottom: BOTTOM_NAV_HEIGHT + 40,
  },

  // Twin-hexagon cream band. Bleeds to screen edges past the scroll padding.
  topArea: {
    marginHorizontal: -SIDE_PADDING,
    height: 150,
    justifyContent: "flex-start",
  },

  topBg: {
    ...StyleSheet.absoluteFillObject,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIDE_PADDING,
  },

  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  locationText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.secondary,
  },

  // Hero sits below the cream band with a white gap between them.
  heroWrap: {
    marginTop: SPACING.sm,
    alignItems: "center",
  },

  scanWrap: {
    alignItems: "center",
    marginTop: -44,
    marginBottom: SPACING.large,
    zIndex: 2,
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
    paddingHorizontal: 12,
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
});

export default styles;
