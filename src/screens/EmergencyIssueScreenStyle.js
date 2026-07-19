import { StyleSheet } from "react-native";

import COLORS from "../constants/colors";
import {
  BUTTON_HEIGHT,
  RADIUS,
  SIDE_PADDING,
  SPACING,
  TYPE,
} from "../constants/layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scrollArea: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    paddingBottom: 102,
  },

  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },

  heroContainer: {
    width: "100%",
    height: 520,
    position: "relative",
    backgroundColor: COLORS.charcoal,
    overflow: "hidden",
  },

  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.charcoal,
    alignItems: "center",
    justifyContent: "center",
  },

  placeholderText: {
    ...TYPE.body,
    color: COLORS.greyText,
    marginTop: SPACING.sm,
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },

  heroTextContainer: {
    position: "absolute",
    left: SIDE_PADDING,
    right: SIDE_PADDING,
    bottom: 50,
    zIndex: 2,
  },

  issueTitle: {
    ...TYPE.sectionTitle,
    color: COLORS.white,
    marginBottom: SPACING.sm,
    textTransform: "capitalize",
  },

  issueDescription: {
    ...TYPE.cardTitle,
    color: COLORS.white,
  },

  contentContainer: {
    position: "relative",
    backgroundColor: COLORS.white,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 36,
    paddingBottom: SPACING.large,
  },

  riskBadgePosition: {
    position: "absolute",
    top: -46,
    right: SIDE_PADDING,
    zIndex: 5,
  },

  actionSection: {
    marginBottom: SPACING.section,
  },

  lastActionSection: {
    marginBottom: 0,
  },

  bottomActionContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
  },

  bottomActionContent: {
    width: "100%",
  },

  findExpertsButton: {
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
  },
});

export default styles;
