import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";
import { RADIUS, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  actionBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 34,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  retakeButton: {
    flex: 1,
    height: 52,
    borderRadius: RADIUS.field,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightHoney,
  },
  retakeText: {
    color: COLORS.secondary,
    fontSize: TYPE.button.fontSize,
    fontWeight: "600",
  },
  confirmButton: {
    flex: 1,
    height: 52,
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
    fontSize: TYPE.button.fontSize,
    fontWeight: "600",
  },
});

export default styles;
