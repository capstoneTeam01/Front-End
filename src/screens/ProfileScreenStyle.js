import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import {
  SIDE_PADDING,
  BOTTOM_NAV_HEIGHT,
  TYPE,
  RADIUS,
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

  // Twin-hexagon cream band, bleeds to screen edges.
  topArea: {
    marginHorizontal: -SIDE_PADDING,
    height: 110,
  },

  topBg: {
    ...StyleSheet.absoluteFillObject,
  },

  // Hero overlaps up into the cream band slightly.
  heroWrap: {
    marginTop: -8,
    alignItems: "center",
  },

  avatarHex: {
    marginBottom: 16,
  },

  name: {
    fontSize: TYPE.sectionTitle.fontSize,
    fontWeight: "700",
    color: COLORS.textPrimary,
    textAlign: "center",
  },

  email: {
    fontSize: TYPE.body.fontSize,
    color: COLORS.honeyBrown,
    marginTop: 6,
    textAlign: "center",
  },

  menuCard: {
    marginTop: 24,
    borderRadius: RADIUS.big,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.divider,
    backgroundColor: COLORS.white,
    overflow: "hidden",

    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default styles;
