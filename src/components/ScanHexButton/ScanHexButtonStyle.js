import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    backgroundColor: COLORS.surfaceDark,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default styles;
