import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { SIDE_PADDING, SPACING, RADIUS, TYPE } from "../constants/layout";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scroll: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: SPACING.card,
    paddingBottom: 40,
  },

  banner: {
    marginTop: SPACING.card,
    alignItems: "center",
    paddingHorizontal: 16,
  },

  bannerTitle: {
    fontSize: TYPE.screenTitle.fontSize,
    fontWeight: TYPE.screenTitle.fontWeight,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 12,
  },

  bannerSubtitle: {
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
});

export default styles;
