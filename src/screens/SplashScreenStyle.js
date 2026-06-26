import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

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
    fontSize: 34,
    fontWeight: "800",
  },
  wordmarkFix: {
    color: COLORS.textPrimary,
  },
  wordmarkBee: {
    color: COLORS.primary,
  },
});

export default styles;
