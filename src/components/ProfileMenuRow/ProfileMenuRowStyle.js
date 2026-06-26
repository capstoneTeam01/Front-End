import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  rowDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.divider,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  label: {
    fontSize: TYPE.body.fontSize,
    fontWeight: "500",
  },
});

export default styles;
