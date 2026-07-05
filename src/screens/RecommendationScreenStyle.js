import { Platform, StyleSheet } from "react-native";

import COLORS from "../constants/colors";
import {
  SIDE_PADDING,
  SPACING,
  TYPE,
} from "../constants/layout";

const bottomButtonSpace =
  Platform.OS === "android" ? 28 : 18;

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

    // Prevents the fixed bottom buttons from covering
    // the final Repair Estimate content.
    paddingBottom: 128,
  },

  /*
   * Issue Detected header
   */
  headerContainer: {
    height: 84,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 22,
    marginBottom: -16,
    backgroundColor: "transparent",
    zIndex: 5,
  },

  headerShape: {
    ...StyleSheet.absoluteFillObject,
  },

  backButton: {
    position: "absolute",
    left: SIDE_PADDING,
    bottom: 12,
    width: 44,
    height: 44,
    alignItems: "flex-start",
    justifyContent: "center",
    zIndex: 2,
  },

  backButtonPressed: {
    opacity: 0.55,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.secondary,
    textAlign: "center",
  },

  /*
   * Uploaded image and issue summary
   */
  heroContainer: {
    width: "100%",
    height: 360,
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
    backgroundColor: COLORS.surfaceDark,
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
    fontSize: 22,
    fontWeight: "500",
    color: COLORS.white,
    lineHeight: 28,
    marginBottom: SPACING.sm,
  },

  issueDescription: {
    ...TYPE.body,
    color: COLORS.white,
    lineHeight: 22,
  },

  /*
   * Main screen content
   */
  contentContainer: {
    position: "relative",
    backgroundColor: COLORS.white,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 48,
    paddingBottom: SPACING.large,
  },

  riskBadgePosition: {
    position: "absolute",
    top: -58,
    right: SIDE_PADDING,
    zIndex: 5,
  },

  sectionContainer: {
    marginBottom: SPACING.large,
  },

  repairEstimateContainer: {
    marginTop: SPACING.sm,
  },

  /*
   * Fixed bottom action area
   * Matches the working Experts List structure.
   */
  bottomActionContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,

    backgroundColor: COLORS.warmCream,

    paddingHorizontal: SIDE_PADDING,
    paddingTop: 12,
    paddingBottom: bottomButtonSpace,
  },

  bottomActionContent: {
    width: "100%",
  },
});

export default styles;