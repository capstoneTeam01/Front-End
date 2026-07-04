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

  topPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
  },

  content: {
    flex: 1,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: SPACING.card,
  },

  heroContainer: {
    flex: 1,
    minHeight: 300,
    maxHeight: 390,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.card,
  },

  heroGraphic: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  heroContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.section,
  },

  userHexagonContainer: {
    width: 82,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.section,
  },

  userHexagonGraphic: {
    position: "absolute",
  },

  userIcon: {
    marginTop: 1,
  },

  heroTitle: {
    ...TYPE.screenTitle,
    color: COLORS.secondary,
    textAlign: "center",
  },

  stepsCard: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.big,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    paddingHorizontal: SPACING.card,
    paddingVertical: 10,

    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },

  stepRow: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
  },

  statusHexagonContainer: {
    width: 42,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.card,
  },

  statusHexagonGraphic: {
    position: "absolute",
  },

  statusIconContent: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  stepText: {
    flex: 1,
    ...TYPE.body,
    color: COLORS.honeyBrown,
    lineHeight: 22,
  },

  pendingStepText: {
    color: COLORS.mediumGrey,
  },

  bottomArea: {
    height: 126,
    marginTop: SPACING.card,
    paddingHorizontal: SIDE_PADDING,
    paddingBottom: SPACING.section,
    justifyContent: "flex-end",
  },

  bottomBackground: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  cancelButton: {
    width: "100%",
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonPressed: {
    opacity: 0.8,
  },

  cancelButtonText: {
    ...TYPE.button,
    color: COLORS.secondary,
  },
});

export default styles;