import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { SIDE_PADDING, SPACING, TYPE } from "../constants/layout";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  topShape: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 286,
    paddingBottom: 40,
  },
  title: {
    color: COLORS.secondary,
    marginBottom: SPACING.section,
    ...TYPE.screenTitle,
  },
  fieldLabel: {
    color: COLORS.honeyBrown,
    marginBottom: SPACING.sm,
    marginTop: SPACING.card,
    ...TYPE.small,
  },
  forgotWrap: {
    marginTop: SPACING.card,
    marginBottom: SPACING.section,
  },
  forgotText: {
    color: COLORS.honeyBrown,
    ...TYPE.small,
  },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: SPACING.card,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(138, 86, 17, 0.22)",
  },
  orText: {
    marginHorizontal: 12,
    color: COLORS.white,
    ...TYPE.small,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.section,
  },
  footerText: {
    color: COLORS.honeyBrown,
    ...TYPE.small,
  },
  footerLink: {
    color: COLORS.textPrimary,
    ...TYPE.small,
  },
});

export default styles;
