import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { RADIUS, SIDE_PADDING, TYPE } from "../../constants/layout";

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
    paddingBottom: 40,
    alignItems: "center",
  },

  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray500,
    marginBottom: 20,
  },

  title: {
    fontSize: TYPE.sectionTitle.fontSize,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: TYPE.small.fontSize,
    fontWeight: "400",
    color: COLORS.textSecondary,
    marginBottom: 24,
  },

  grid: {
    flexDirection: "row",
    gap: 12,
    alignSelf: "stretch",
  },

  footer: {
    marginTop: 24,
    fontSize: TYPE.caption.fontSize,
    fontWeight: "400",
    color: COLORS.textMuted,
  },
});

export default styles;
