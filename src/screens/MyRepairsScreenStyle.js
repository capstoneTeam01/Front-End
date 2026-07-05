import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { SIDE_PADDING } from "../constants/layout";

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

  scroll: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 120,
  },

  section: {
    marginTop: 24,
  },

  scanList: {
    paddingTop: 18,
    paddingBottom: 4,
  },

  completedList: {
    marginTop: 16,
    gap: 14,
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 104,
    paddingTop: 24,
    paddingHorizontal: 34,
    backgroundColor: COLORS.lightHoney,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  navText: {
    fontSize: 13,
    color: COLORS.honeyBrown,
  },

  navActive: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.secondary,
  },
});

export default styles;