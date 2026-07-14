import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
  },

  content: {
    alignItems: "center",
    gap: 7,
  },

  iconWrap: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: TYPE.small.fontSize,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.textPrimary,
  },
});

export default styles;
