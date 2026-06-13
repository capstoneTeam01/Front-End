import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { SIDE_PADDING, TYPE, RADIUS } from "../constants/layout";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  headerWrap: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  markAllBtn: {
    alignSelf: "flex-end",
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 8,
    paddingBottom: 4,
  },

  markAllText: {
    fontSize: TYPE.small.fontSize,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  demoTag: {
    marginLeft: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  demoTagText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },

  list: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.divider,
  },

  rowUnread: {
    backgroundColor: "#FAFAFA",
  },

  iconChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
  },

  body: {
    flex: 1,
  },

  message: {
    fontSize: TYPE.small.fontSize,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },

  time: {
    fontSize: TYPE.caption.fontSize,
    color: COLORS.textMuted,
    marginTop: 4,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.surfaceDark,
  },

  stateBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  emptyTitle: {
    fontSize: TYPE.body.fontSize,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginTop: 4,
  },

  emptyText: {
    fontSize: TYPE.small.fontSize,
    color: COLORS.textMuted,
  },
});

export default styles;
