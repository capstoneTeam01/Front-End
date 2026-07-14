import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";
import { BUTTON_HEIGHT, RADIUS, SIDE_PADDING, SPACING, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.38)",
  },
  sheet: {
    minHeight: 308,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 12,
    paddingBottom: 32,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  handle: {
    width: 40,
    height: 4,
    marginBottom: 20,
    borderRadius: 2,
    backgroundColor: COLORS.gray700,
  },
  title: {
    marginTop: 16,
    color: COLORS.textPrimary,
    textAlign: "center",
    ...TYPE.sectionTitle,
  },
  message: {
    marginTop: 8,
    color: COLORS.mediumGrey,
    textAlign: "center",
    ...TYPE.body,
  },
  button: {
    width: "100%",
    height: BUTTON_HEIGHT,
    marginTop: SPACING.section,
    borderRadius: RADIUS.field,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.secondary,
    ...TYPE.button,
  },
});

export default styles;
