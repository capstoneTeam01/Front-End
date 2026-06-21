import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import {
  BUTTON_HEIGHT,
  RADIUS,
  TYPE,
} from "../../constants/layout";

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },

  primaryButton: {
    flex: 1,
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    backgroundColor: COLORS.gray900,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    fontSize: TYPE.button.fontSize,
    fontWeight: "700",
    color: COLORS.white,
  },

  secondaryButton: {
    flex: 1,
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    backgroundColor: COLORS.gray500,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    fontSize: TYPE.button.fontSize,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
});

export default styles;