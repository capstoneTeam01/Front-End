import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  button: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 16,

    backgroundColor: COLORS.white,

    minHeight: 49,
  },

  activeButton: {
    backgroundColor: COLORS.black,
  },

  text: {
    color: "#0A0A0A",
    ...TYPE.body,
  },

  activeText: {
    color: COLORS.white,
  },
});

export default styles;
