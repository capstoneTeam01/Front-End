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
  buttonDisabled: {
    opacity: 0.55,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    marginRight: 10,
  },
  label: {
    color: COLORS.textPrimary,
    ...TYPE.button,
  },
});

export default styles;
