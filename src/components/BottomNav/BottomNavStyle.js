import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { HEADER_FOOTER } from "../../constants/typography";

const styles = StyleSheet.create({
  floatWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    // paddingHorizontal: 16,
  },

  bar: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    paddingHorizontal: 8,
    paddingTop: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
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
