import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
  },

  content: {
    alignItems: "center",
    gap: 8,
  },

  iconWrap: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    color: COLORS.textPrimary,
    ...TYPE.small,
  },
});

export default styles;
