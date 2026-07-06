import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  heroWrap: {
    marginTop: 100,
    alignItems: "center",
  },
  textBlock: {
    flex: 1,
    paddingHorizontal: 32,
    marginTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 12,
    textAlign: "center",
  },
  body: {
    fontSize: 15,
    color: COLORS.surfaceDark,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
  },
  buttonHalf: {
    flex: 1,
  },
});

export default styles;
