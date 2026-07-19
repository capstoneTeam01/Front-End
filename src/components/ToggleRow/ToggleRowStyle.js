import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { SIDE_PADDING, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: SIDE_PADDING,
  },
  label: {
    color: COLORS.textPrimary,
    ...TYPE.body,
  },
});

export default styles;
