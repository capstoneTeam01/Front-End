import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: TYPE.sectionTitle.fontSize,
    fontWeight: TYPE.sectionTitle.fontWeight,
    color: COLORS.textPrimary,
  },

  action: {
    fontSize: TYPE.small.fontSize,
    fontWeight: "400",
    color: COLORS.textPrimary,
  },
});

export default styles;