import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { SIDE_PADDING, RADIUS, TYPE } from "../constants/layout";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 20,
    gap: 18,
  },

  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 18,
  },

  filterPillActive: {
    backgroundColor: COLORS.primary,
  },

  filterText: {
    color: COLORS.mediumGrey,
    ...TYPE.caption,
  },

  filterTextActive: {
    color: COLORS.secondary,
  },

  list: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 18,
    paddingBottom: 32,
  },

  card: {
    minHeight: 92,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: RADIUS.big,
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  iconBox: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.warmCream,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  cardContent: {
    flex: 1,
  },

  title: {
    color: COLORS.secondary,
    marginBottom: 8,
    ...TYPE.body,
  },

  meta: {
    color: COLORS.mediumGrey,
    ...TYPE.small,
  },

  categoryText: {
    color: COLORS.primary,
    ...TYPE.caption,
  },

  emptyText: {
    color: COLORS.textMuted,
    textAlign: "center",
    paddingVertical: 32,
    ...TYPE.body,
  },

});

export default styles;
