import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import {
  SIDE_PADDING,
  BUTTON_HEIGHT,
  RADIUS,
  TYPE,
} from "../constants/layout";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    height: 128,
    paddingTop: 52,
    paddingHorizontal: SIDE_PADDING,
    backgroundColor: COLORS.lightHoney,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.secondary,
  },

  headerSpace: {
    width: 24,
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
    paddingBottom: 130,
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

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 26,
    paddingBottom: 28,
    backgroundColor: COLORS.warmCream,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  backButton: {
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: TYPE.button.fontSize,
    fontWeight: TYPE.button.fontWeight,
    color: COLORS.secondary,
  },
});

export default styles;