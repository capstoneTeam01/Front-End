import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 58,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  rowDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.divider,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
  },
  label: {
    ...TYPE.body,
  },
});

export default styles;
