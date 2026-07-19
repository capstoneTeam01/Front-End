import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { RADIUS, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  card: {
    width: 170,
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
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  title: {
    color: COLORS.secondary,
    marginBottom: 8,
    ...TYPE.cardTitle,
  },

  date: {
    color: COLORS.mediumGrey,
    marginBottom: 8,
    ...TYPE.small,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.lightHoney,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  badgeText: {
    color: COLORS.secondary,
    ...TYPE.caption,
  },
});

export default styles;
