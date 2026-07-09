const FONT = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
  extraBold: "Inter_800ExtraBold",
};

export const TYPOGRAPHY = {
  screenTitle: {
    fontFamily: FONT.semiBold,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "600",
  },
  sectionTitle: {
    fontFamily: FONT.semiBold,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "600",
  },
  cardTitle: {
    fontFamily: FONT.medium,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "500",
  },
  body: {
    fontFamily: FONT.regular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  small: {
    fontFamily: FONT.regular,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
  caption: {
    fontFamily: FONT.medium,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
  },
  button: {
    fontFamily: FONT.medium,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
  },
};

export const HEADER_FOOTER = {
  appHeaderTitle: {
    ...TYPOGRAPHY.sectionTitle,
  },
  appHeaderTitleLeft: {
    ...TYPOGRAPHY.body,
  },
  tabHeaderText: {
    ...TYPOGRAPHY.body,
  },
  bottomNavLabel: {
    ...TYPOGRAPHY.caption,
  },
  bottomNavLabelActive: {
    ...TYPOGRAPHY.small,
  },
  footerButton: {
    ...TYPOGRAPHY.button,
  },
};

export default FONT;
