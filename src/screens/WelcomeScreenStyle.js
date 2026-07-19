import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { BUTTON_HEIGHT, RADIUS, SIDE_PADDING, SPACING, TYPE } from "../constants/layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  heroWrap: {
    marginTop: 88,
    alignItems: "center",
  },
  heroContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  textBlock: {
    flex: 1,
    paddingHorizontal: SIDE_PADDING,
    marginTop: 52,
    alignItems: "center",
  },
  title: {
    color: COLORS.secondary,
    marginBottom: SPACING.card,
    textAlign: "center",
    ...TYPE.screenTitle,
  },
  body: {
    color: COLORS.secondary,
    textAlign: "center",
    ...TYPE.body,
  },
  buttonRow: {
    flexDirection: "row",
    gap: SPACING.card,
  },
  buttonHalf: {
    flex: 1,
  },
  welcomeButton: {
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    backgroundColor: COLORS.primary,
  },
  welcomeButtonLabel: {
    color: COLORS.secondary,
    ...TYPE.button,
  },
});

export default styles;
