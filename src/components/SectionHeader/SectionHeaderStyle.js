import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: COLORS.textPrimary,
    ...TYPE.cardTitle,
  },

  action: {
    color: COLORS.goldenHoney,
    ...TYPE.small,
  },
});

export default styles;
