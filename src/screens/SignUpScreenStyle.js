import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  topShape: {
    position: "absolute",
    top: -70,
    right: -40,
    width: 240,
    height: 240,
    borderRadius: 40,
    backgroundColor: COLORS.whiteOverlayFaint,
    transform: [{ rotate: "18deg" }],
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 150,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.surfaceDark,
    marginBottom: 8,
    marginTop: 14,
  },
  createWrap: {
    marginTop: 24,
  },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
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
    marginTop: 22,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.white,
  },
});

export default styles;
