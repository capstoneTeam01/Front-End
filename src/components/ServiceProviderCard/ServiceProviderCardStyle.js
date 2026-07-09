import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { RADIUS, SPACING, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  container: {
    width: 354,
    borderRadius: RADIUS.field,
    borderWidth: 2,
    borderColor: COLORS.gray500,
    backgroundColor: COLORS.white,
  },

  card: {
    minHeight: 104,
    padding: SPACING.card,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    width: 210,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  icon: {
    width: 54,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },

  details: {
    width: 129,
  },

  title: {
    color: COLORS.black,
    marginBottom: 10,
    ...TYPE.body,
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  star: {
    color: COLORS.black,
    ...TYPE.caption,
  },

  ratingText: {
    color: COLORS.black,
    ...TYPE.caption,
  },

  reviewText: {
    color: COLORS.gray900,
    ...TYPE.caption,
  },

  right: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  distance: {
    color: COLORS.gray900,
    marginBottom: 8,
    ...TYPE.caption,
  },
});

export default styles;
