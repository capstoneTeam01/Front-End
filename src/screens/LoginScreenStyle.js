import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  topShape: {
    position: "absolute",
    top: -60,
    right: -40,
    width: 260,
    height: 260,
    borderRadius: 40,
    backgroundColor: COLORS.whiteOverlayFaint,
    transform: [{ rotate: "18deg" }],
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 260,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.surfaceDark,
    marginBottom: 8,
    marginTop: 16,
  },
  forgotWrap: {
    marginTop: 16,
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 15,
    color: COLORS.surfaceDark,
    fontWeight: "500",
  },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.whiteOverlayHalf,
  },
  orText: {
    marginHorizontal: 12,
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 14,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.surfaceDark,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
});

export default styles;
