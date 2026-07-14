import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { RADIUS, SIDE_PADDING, SPACING, TYPE } from "../constants/layout";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scroll: {
    paddingHorizontal: SIDE_PADDING,
    paddingBottom: 40,
  },

  heroWrap: {
    alignItems: "center",
  },

  bannerTitle: {
    color: COLORS.secondary,
    textAlign: "center",
    marginBottom: SPACING.card,
    ...TYPE.screenTitle,
  },

  bannerSubtitle: {
    color: COLORS.honeyBrown,
    textAlign: "center",
    ...TYPE.body,
  },

  scanWrap: {
    alignItems: "center",
    zIndex: 2,
  },

  popularHeader: {
    marginTop: 24,
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
});

export default styles;
