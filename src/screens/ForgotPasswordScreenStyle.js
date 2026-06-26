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
    paddingTop: 220,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.surfaceDark,
    lineHeight: 22,
    marginBottom: 28,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.surfaceDark,
    marginBottom: 8,
  },
  sendWrap: {
    marginTop: 24,
  },
  sentBox: {
    backgroundColor: COLORS.whiteOverlayStrong,
    borderRadius: 16,
    padding: 20,
  },
  sentTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  sentBody: {
    fontSize: 14,
    color: COLORS.surfaceDark,
    lineHeight: 20,
  },
  backWrap: {
    marginTop: 28,
    alignItems: "center",
  },
  backText: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
});

export default styles;
