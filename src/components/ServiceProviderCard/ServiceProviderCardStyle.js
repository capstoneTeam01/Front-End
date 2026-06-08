import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    width: 354,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.gray500,
    backgroundColor: COLORS.white,
  },

  card: {
    height: 104,
    padding: 20,
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
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 10,
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
    fontSize: 12,
    color: COLORS.black,
  },

  ratingText: {
    fontSize: 12,
    color: COLORS.black,
  },

  reviewText: {
    fontSize: 12,
    color: COLORS.gray900,
  },

  right: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  distance: {
    fontSize: 12,
    color: COLORS.gray900,
    marginBottom: 8,
  },
});

export default styles;