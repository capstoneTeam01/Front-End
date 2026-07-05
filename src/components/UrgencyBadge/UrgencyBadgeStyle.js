import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";
import { TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  badgeContainer: {
    width: 96,
    height: 104,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    paddingTop: 10,
    paddingBottom: 9,
  },

  iconContainer: {
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },

  badgeText: {
    ...TYPE.caption,
    textAlign: "center",
    lineHeight: 15,
  },

  darkText: {
    color: COLORS.secondary,
  },

  lightText: {
    color: COLORS.white,
  },
});

export default styles;