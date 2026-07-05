import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  // Anchors the bar to the bottom of the screen with side margins
  // so it "floats" instead of spanning edge-to-edge.
  floatWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
  },

  bar: {
    flexDirection: "row",
    alignItems: "center",
    height: 68,
    paddingHorizontal: 8,
    // shadow so the floating bar lifts off the content
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },

  shape: {
    ...StyleSheet.absoluteFillObject,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  navLabel: {
    fontSize: TYPE.caption.fontSize,
    fontWeight: "500",
    color: COLORS.mediumGrey,
  },

  navLabelActive: {
    color: COLORS.textPrimary,
    fontWeight: "700",
  },
});

export default styles;
