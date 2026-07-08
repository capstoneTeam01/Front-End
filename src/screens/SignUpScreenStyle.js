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
    paddingTop: 200,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    lineHeight: 33,
    fontWeight: "400",
    color: COLORS.secondary,
  },
  fieldLabel: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    color: COLORS.honeyBrown,
    marginBottom: 11,
    marginTop: 16,
  },
  field: {
    height: 52,
    borderRadius: 12,
  },
  createWrap: {
    marginTop: 16,
  },
  formButton: {
    height: 48,
    borderRadius: 14,
  },
  formButtonLabel: {
    fontWeight: "400",
  },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 24,
    marginVertical: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(138, 86, 17, 0.22)",
  },
  orText: {
    marginHorizontal: 12,
    color: COLORS.white,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  footerText: {
    fontSize: 16,
    lineHeight: 20,
    color: COLORS.honeyBrown,
  },
  footerLink: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    color: COLORS.textPrimary,
  },
});

export default styles;
