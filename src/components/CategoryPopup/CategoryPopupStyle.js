import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { SIDE_PADDING, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 12,
    paddingBottom: 32,
    alignItems: "center",
  },

  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray700,
    marginBottom: 16,
  },

  title: {
    fontSize: TYPE.sectionTitle.fontSize,
    lineHeight: 28,
    fontWeight: "400",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: TYPE.small.fontSize,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.mediumGrey,
    marginBottom: 16,
  },

  grid: {
    flexDirection: "row",
    gap: 12,
    alignSelf: "stretch",
  },

  footer: {
    marginTop: 16,
    fontSize: TYPE.small.fontSize,
    lineHeight: 18,
    fontWeight: "400",
    color: COLORS.mediumGrey,
  },
});

export default styles;
