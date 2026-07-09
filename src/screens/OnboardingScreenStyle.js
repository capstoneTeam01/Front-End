import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { HEADER_FOOTER } from "../constants/typography";
import { BUTTON_HEIGHT, FIELD_HEIGHT, RADIUS, SIDE_PADDING, SPACING, TYPE } from "../constants/layout";

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
    paddingHorizontal: SIDE_PADDING,
    alignItems: "center",
  },
  title: {
    color: COLORS.secondary,
    marginBottom: SPACING.card,
    textAlign: "center",
    ...TYPE.screenTitle,
  },
  body: {
    color: COLORS.secondary,
    textAlign: "center",
    ...TYPE.body,
  },
  cityField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.field,
    height: FIELD_HEIGHT,
    paddingHorizontal: SPACING.card,
    marginTop: SPACING.card,
    width: "100%",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cityText: {
    color: COLORS.textPrimary,
    ...TYPE.body,
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
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    backgroundColor: COLORS.primary,
  },
  nextButtonLabel: {
    color: COLORS.secondary,
    ...HEADER_FOOTER.footerButton,
  },
});

export default styles;
