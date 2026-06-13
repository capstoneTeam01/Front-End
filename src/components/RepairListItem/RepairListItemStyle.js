import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
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
    fontSize: TYPE.body.fontSize,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },

  subtitle: {
    fontSize: TYPE.caption.fontSize,
    fontWeight: "400",
    color: COLORS.textMuted,
  },
});

export default styles;