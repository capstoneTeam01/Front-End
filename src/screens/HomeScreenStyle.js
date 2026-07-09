import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import {
  SIDE_PADDING,
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

  heroWrap: {
    alignItems: "center",
  },

  scanWrap: {
    alignItems: "center",
    zIndex: 2,
  },

  heroTitle: {
    fontSize: 28,
    lineHeight: 33,
    fontWeight: "400",
    color: COLORS.secondary,
    marginBottom: 16,
    textAlign: "center",
  },

  heroSubtitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    color: COLORS.honeyBrown,
    textAlign: "center",
  },

  centerSection: {
    marginTop: 15,
    marginBottom: 16,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "400",
    color: COLORS.honeyBrown,
    textAlign: "center",
  },

  grid: {
    flexDirection: "row",
    alignSelf: "center",
  },

  popularHeader: {
    paddingTop: 24,
    marginBottom: 20,
  },

  popularTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "400",
    color: COLORS.textPrimary,
  },

  popularAction: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.goldenHoney,
  },

  repairsCard: {
    borderRadius: 24,
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
