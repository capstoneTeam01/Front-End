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

  list: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 24,
    paddingBottom: 120,
  },

  card: {
    minHeight: 92,
    borderWidth: 1,
    borderColor: COLORS.gray500,
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

  title: {
    fontSize: TYPE.body.fontSize,
    fontWeight: "500",
    color: COLORS.secondary,
    marginBottom: 6,
  },

  meta: {
    fontSize: TYPE.small.fontSize,
    color: COLORS.mediumGrey,
  },

  categoryText: {
    color: COLORS.primary,
    fontWeight: "500",
  },

  backButton: {
    position: "absolute",
    left: SIDE_PADDING,
    right: SIDE_PADDING,
    bottom: 28,
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