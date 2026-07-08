import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  slide: {
    flex: 1,
    paddingTop: 88,
    alignItems: "center",
  },
  hexHero: {
    marginBottom: 49,
    alignItems: "center",
  },
  heroContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  textBlock: {
    width: "100%",
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    lineHeight: 33,
    fontWeight: "400",
    color: COLORS.secondary,
    marginBottom: 16,
    textAlign: "center",
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    color: COLORS.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
  cityField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
    marginTop: 16,
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
    gap: 10,
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.goldenHoney,
  },
  dotActive: {
    backgroundColor: COLORS.warmCream,
  },
  nextButton: {
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
  },
  nextButtonLabel: {
    color: COLORS.secondary,
    fontWeight: "400",
  },
});

export default styles;
