import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { FIELD_HEIGHT, RADIUS, SPACING, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  container: {
    height: FIELD_HEIGHT,
    paddingHorizontal: SPACING.card,
    justifyContent: "center",

    borderRadius: RADIUS.field,
    borderWidth: 1,
    borderColor: COLORS.greyText,
    backgroundColor: COLORS.white,

    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    elevation: 2,
  },

  input: {
    alignSelf: "stretch",
    color: COLORS.textPrimary,
    padding: 0,
    ...TYPE.body,
  },
});

export default styles;
