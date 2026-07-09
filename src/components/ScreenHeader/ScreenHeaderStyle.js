import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 32,
  },

  leading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },

  back: {
    marginRight: 4,
  },

  title: {
    color: COLORS.textPrimary,
    ...TYPE.cardTitle,
  },
});

export default styles;
