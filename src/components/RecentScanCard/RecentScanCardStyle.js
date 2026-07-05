import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { RADIUS, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  card: {
    width: 176,
    borderRadius: RADIUS.big,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    overflow: "hidden",
    marginRight: 16,
  },

  imageContainer: {
    width: "100%",
    height: 126,
    backgroundColor: COLORS.warmCream,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.warmCream,
  },

  content: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  title: {
    fontSize: TYPE.cardTitle.fontSize,
    fontWeight: "600",
    color: COLORS.secondary,
    lineHeight: 22,
    marginBottom: 8,
  },

  date: {
    fontSize: TYPE.small.fontSize,
    color: COLORS.mediumGrey,
    marginBottom: 12,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.lightHoney,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  badgeText: {
    fontSize: TYPE.caption.fontSize,
    fontWeight: "600",
    color: COLORS.secondary,
  },
});

export default styles;