import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

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
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 24,
  },

  activeText: {
    color: COLORS.white,
  },
});

export default styles;