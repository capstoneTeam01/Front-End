import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  topShape: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 286,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "400",
    color: COLORS.secondary,
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.honeyBrown,
    marginBottom: 8,
    marginTop: 16,
  },
  forgotWrap: {
    marginTop: 16,
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 15,
    color: COLORS.honeyBrown,
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
    backgroundColor: "rgba(138, 86, 17, 0.22)",
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
    color: COLORS.honeyBrown,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
});

export default styles;
