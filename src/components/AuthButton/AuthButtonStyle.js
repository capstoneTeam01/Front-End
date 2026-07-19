import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { BUTTON_HEIGHT, RADIUS, SIDE_PADDING, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  button: {
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    backgroundColor: COLORS.lightHoney, 
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SIDE_PADDING,
  },
  buttonSecondary: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.surface,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  label: {
    color: COLORS.textPrimary,
    ...TYPE.button,
  },
});

export default styles;
