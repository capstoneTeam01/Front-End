import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { BOTTOM_NAV_HEIGHT, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
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
