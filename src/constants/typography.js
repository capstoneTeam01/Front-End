const FONT = {
  regular: "Rubik_400Regular",
  medium: "Rubik_400Regular",
  semiBold: "Rubik_400Regular",
  bold: "Rubik_400Regular",
  extraBold: "Rubik_400Regular",
};

const HEADER_FOOTER_FONT = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
  extraBold: "Inter_800ExtraBold",
};

export const TYPOGRAPHY = {
  screenTitle: {
    fontFamily: FONT.regular,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "400",
  },
  sectionTitle: {
    fontFamily: FONT.regular,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "400",
  },
  h3: {
    fontFamily: FONT.regular,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "400",
  },
  cardTitle: {
    fontFamily: FONT.regular,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
  },
  cardRegular: {
    fontFamily: FONT.regular,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
  },
  body: {
    fontFamily: FONT.regular,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
  },
  small: {
    fontFamily: FONT.regular,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
  },
  caption: {
    fontFamily: FONT.regular,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
  },
  captionSmall: {
    fontFamily: FONT.regular,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
  },
  button: {
    fontFamily: FONT.regular,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
  },
  headerTitle: {
    fontFamily: HEADER_FOOTER_FONT.regular,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "400",
  },
};

export const HEADER_FOOTER = {
  appHeaderTitle: {
    fontFamily: HEADER_FOOTER_FONT.regular,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "400",
  },
  appHeaderTitleLeft: {
    fontFamily: HEADER_FOOTER_FONT.regular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  tabHeaderText: {
    fontFamily: HEADER_FOOTER_FONT.regular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  bottomNavLabel: {
    fontFamily: HEADER_FOOTER_FONT.medium,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
  },
  bottomNavLabelActive: {
    fontFamily: HEADER_FOOTER_FONT.regular,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
  footerButton: {
    fontFamily: HEADER_FOOTER_FONT.medium,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
  },
};

export default FONT;
