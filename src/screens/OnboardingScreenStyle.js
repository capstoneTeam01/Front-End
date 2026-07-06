import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  slide: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center",
  },
hexHero: {
    marginTop: 40,
    marginBottom: 48,
    alignItems: "center",
  },

  textBlock: {
    paddingHorizontal: 32,
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
  cityField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 18,
    marginTop: 28,
    width: "100%",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cityText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  cityPlaceholder: {
    color: COLORS.placeholder,
  },
  chevron: {
    fontSize: 14,
    color: COLORS.surfaceDark,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.whiteOverlayHalf,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: COLORS.white,
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 36,
    paddingTop: 4,
  },
});

export default styles;
