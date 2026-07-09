import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { BUTTON_HEIGHT, FIELD_HEIGHT, RADIUS, SIDE_PADDING, SPACING, TYPE } from "../constants/layout";

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
    paddingTop: 200,
    paddingBottom: SPACING.section,
  },
  title: {
    color: COLORS.secondary,
    ...TYPE.screenTitle,
  },
  fieldLabel: {
    color: COLORS.honeyBrown,
    marginBottom: SPACING.sm,
    marginTop: SPACING.card,
    ...TYPE.small,
  },
  field: {
    height: FIELD_HEIGHT,
    borderRadius: RADIUS.field,
  },
  createWrap: {
    marginTop: SPACING.card,
  },
  formButton: {
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
  },
  formButtonLabel: {
    ...TYPE.button,
  },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 24,
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
    ...TYPE.body,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.card,
  },
  footerText: {
    color: COLORS.honeyBrown,
    ...TYPE.body,
  },
  footerLink: {
    color: COLORS.textPrimary,
    ...TYPE.body,
  },
});

export default styles;
