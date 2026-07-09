import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { SIDE_PADDING } from "../constants/layout";

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
    fontSize: 28,
    lineHeight: 33,
    fontWeight: "400",
    color: COLORS.secondary,
    textAlign: "center",
    marginBottom: 16,
  },

  bannerSubtitle: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    color: COLORS.honeyBrown,
    textAlign: "center",
  },

  scanWrap: {
    alignItems: "center",
    zIndex: 2,
  },

  popularHeader: {
    marginTop: 7,
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
});

export default styles;
