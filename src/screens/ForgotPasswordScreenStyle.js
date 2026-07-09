import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { RADIUS, SIDE_PADDING, SPACING, TYPE } from "../constants/layout";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  topShape: {
    position: "absolute",
    top: -60,
    right: -40,
    width: 260,
    height: 260,
    borderRadius: 40,
    backgroundColor: COLORS.whiteOverlayFaint,
    transform: [{ rotate: "18deg" }],
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 220,
    paddingBottom: 40,
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    ...TYPE.screenTitle,
  },
  subtitle: {
    color: COLORS.surfaceDark,
    marginBottom: SPACING.section,
    ...TYPE.body,
  },
  fieldLabel: {
    color: COLORS.surfaceDark,
    marginBottom: SPACING.sm,
    ...TYPE.small,
  },
  sendWrap: {
    marginTop: SPACING.section,
  },
  sentBox: {
    backgroundColor: COLORS.whiteOverlayStrong,
    borderRadius: RADIUS.medium,
    padding: SPACING.card,
  },
  sentTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    ...TYPE.cardTitle,
  },
  sentBody: {
    color: COLORS.surfaceDark,
    ...TYPE.small,
  },
  backWrap: {
    marginTop: SPACING.section,
    alignItems: "center",
  },
  backText: {
    color: COLORS.textPrimary,
    ...TYPE.button,
  },
});

export default styles;
