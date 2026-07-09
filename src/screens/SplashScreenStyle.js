import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { TYPE } from "../constants/layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.warmCream, 
    alignItems: "center",
    justifyContent: "center",
  },
  logoMark: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    marginBottom: 16,
  },
  wordmark: {
    ...TYPE.screenTitle,
  },
  wordmarkFix: {
    color: COLORS.textPrimary,
  },
  wordmarkBee: {
    color: COLORS.primary,
  },
});

export default styles;
