import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { SIDE_PADDING, BOTTOM_NAV_HEIGHT, TYPE } from "../constants/layout";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 24,
    paddingBottom: BOTTOM_NAV_HEIGHT + 24,
  },
  hero: {
    alignItems: "center",
    paddingVertical: 24,
  },
  name: {
    fontSize: TYPE.sectionTitle.fontSize,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginTop: 16,
  },
  email: {
    fontSize: TYPE.body.fontSize,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  menuCard: {
    marginTop: 16,
    borderRadius: 16,
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
