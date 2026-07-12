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

  /*
   * Issue Detected header (shared AppHeader shape).
   * Floats over the hero image so the photo bleeds to the very
   * top of the screen and shows through the cut bottom corners.
   */
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },

  /*
   * Uploaded image and issue text
   */
  heroContainer: {
    width: "100%",
    // Starts at the very top of the screen (under the floating
    // header), so the height includes the area behind the header.
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
    color: COLORS.white,
    marginBottom: 12,
    textTransform: "capitalize",
    ...TYPE.cardTitle,
  },

  issueDescription: {
    color: COLORS.white,
    ...TYPE.small,
  },

  /*
   * Emergency action content
   */
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

  /*
   * Fixed Find Experts panel
   */
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
