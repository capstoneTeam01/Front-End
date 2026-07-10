import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import {
  SIDE_PADDING,
  TYPE,
  RADIUS,
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

  centerSection: {
    marginTop: 15,
    marginBottom: SPACING.card,
    color: COLORS.honeyBrown,
    textAlign: "center",
    ...TYPE.sectionTitle,
  },

  grid: {
    flexDirection: "row",
    alignSelf: "center",
  },

  popularHeader: {
    paddingTop: 24,
    marginBottom: SPACING.card,
  },

  popularTitle: {
    color: COLORS.textPrimary,
    ...TYPE.cardTitle,
  },

  popularAction: {
    color: COLORS.goldenHoney,
    ...TYPE.small,
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
    color: COLORS.textPrimary,
    marginTop: 4,
    ...TYPE.body,
  },

  emptyText: {
    color: COLORS.textMuted,
    textAlign: "center",
    ...TYPE.small,
  },
});

export default styles;
