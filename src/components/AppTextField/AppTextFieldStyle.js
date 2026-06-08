import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    height: 57.333,
    paddingTop: 16.667,
    paddingRight: 32,
    paddingBottom: 16.667,
    paddingLeft: 16.667,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 16,
    borderWidth: 0.667,
    borderColor: "#F3F4F6",
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
    fontSize: 14,
    fontWeight: "400",
    color: "rgba(10, 10, 10, 0.5)",
    padding: 0,
  },
});

export default styles;