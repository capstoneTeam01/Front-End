import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { HEADER_FOOTER } from "../../constants/typography";
import { BOTTOM_NAV_HEIGHT } from "../../constants/layout";

const styles = StyleSheet.create({
  floatWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    elevation: 10,
  },

  menu: {
    height: BOTTOM_NAV_HEIGHT,
    overflow: "hidden",
  },

  shape: {
    ...StyleSheet.absoluteFillObject,
  },

  barContent: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "stretch",
    paddingHorizontal: 8,
  },

  navItem: {
    flex: 1,
    flexBasis: 0,
    alignSelf: "stretch",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  navLabel: {
    color: COLORS.navInactiveLabel,
    ...HEADER_FOOTER.bottomNavLabel,
  },

  navLabelActive: {
    color: COLORS.secondary,
    textAlign: "center",
    ...HEADER_FOOTER.bottomNavLabelActive,
  },
});

export default styles;
