import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";
import { BUTTON_HEIGHT, RADIUS, SPACING, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  headerLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  headerStatusFill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 58,
    backgroundColor: COLORS.lightHoney,
  },
  header: {
    zIndex: 1,
  },
  actionBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  actionRow: {
    flexDirection: "row",
    gap: SPACING.card,
  },
  retakeButton: {
    flex: 1,
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightHoney,
  },
  retakeText: {
    color: COLORS.secondary,
    ...TYPE.button,
  },
  confirmButton: {
    flex: 1,
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  confirmText: {
    color: COLORS.secondary,
    ...TYPE.button,
  },
});

export default styles;
