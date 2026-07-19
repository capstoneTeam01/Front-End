import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";
import {
  BUTTON_HEIGHT,
  RADIUS,
  SPACING,
  TYPE,
} from "../../constants/layout";

const styles = StyleSheet.create({
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    gap: SPACING.card,
  },

  button: {
    flex: 1,
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    alignItems: "center",
    justifyContent: "center",
  },

  findExpertsWithDiyButton: {
    backgroundColor: COLORS.lightHoney,
  },

  findExpertsSingleButton: {
    backgroundColor: COLORS.primary,
  },

  diyButton: {
    backgroundColor: COLORS.primary,
  },

  buttonPressed: {
    opacity: 0.78,
  },

  buttonText: {
    color: COLORS.secondary,
    textAlign: "center",
    ...TYPE.button,
  },
});

export default styles;
