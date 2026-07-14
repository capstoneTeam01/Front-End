import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  row: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.divider,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },

  iconChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    flex: 1,
  },

  title: {
    fontSize: TYPE.small.fontSize,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.honeyBrown,
    marginBottom: 2,
  },

  subtitle: {
    fontSize: TYPE.small.fontSize,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.mediumGrey,
  },
});

export default styles;
