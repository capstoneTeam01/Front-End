import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { SIDE_PADDING, RADIUS, TYPE } from "../constants/layout";
import { HEADER_FOOTER } from "../constants/typography";

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
    fontSize: 12,
    color: COLORS.mediumGrey,
  },

  filterTextActive: {
    color: COLORS.secondary,
    fontWeight: "500",
  },

  list: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 18,
    paddingBottom: 120,
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
    fontSize: TYPE.body.fontSize,
    fontWeight: "500",
    color: COLORS.secondary,
    marginBottom: 8,
  },

  meta: {
    fontSize: TYPE.small.fontSize,
    color: COLORS.mediumGrey,
  },

  categoryText: {
    color: COLORS.primary,
    fontWeight: "500",
  },

  emptyText: {
    fontSize: TYPE.body.fontSize,
    color: COLORS.textMuted,
    textAlign: "center",
    paddingVertical: 32,
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },

  footerButton: {
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  footerButtonText: {
    color: COLORS.secondary,
    ...HEADER_FOOTER.footerButton,
  },
});

export default styles;
