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
    gap: 6,
  },

  iconWrap: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: TYPE.small.fontSize,
    fontWeight: "500",
    color: COLORS.textPrimary,
  },
});

export default styles;
