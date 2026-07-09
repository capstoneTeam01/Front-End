import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { SIDE_PADDING, TYPE, RADIUS } from "../constants/layout";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  markAllBtn: {
    alignSelf: "flex-end",
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 12,
    paddingBottom: 4,
  },

  markAllText: {
    color: COLORS.textPrimary,
    ...TYPE.small,
  },

  list: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 16,
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
    backgroundColor: COLORS.warmCream,
  },

  iconChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightHoney,
    justifyContent: "center",
    alignItems: "center",
  },

  body: {
    flex: 1,
  },

  message: {
    color: COLORS.textPrimary,
    ...TYPE.small,
  },

  time: {
    color: COLORS.textMuted,
    marginTop: 4,
    ...TYPE.caption,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },

  stateBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingTop: 80,
    paddingHorizontal: SIDE_PADDING,
  },

  emptyTitle: {
    color: COLORS.textPrimary,
    marginTop: 4,
    ...TYPE.body,
  },

  emptyText: {
    color: COLORS.textMuted,
    textAlign: "center",
    ...TYPE.small,
  },

  retryBtn: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.lightHoney,
  },

  retryText: {
    color: COLORS.secondary,
    ...TYPE.button,
  },
});

export default styles;
