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
  actionBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.big,
    borderTopRightRadius: RADIUS.big,
  },
  retakeButton: {
    flex: 1,
    height: 52,
    borderRadius: RADIUS.field,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceDark,
  },
  retakeText: {
    color: COLORS.white,
    fontSize: TYPE.button.fontSize,
    fontWeight: "600",
  },
  confirmButton: {
    flex: 1,
    height: 52,
    borderRadius: RADIUS.field,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray500,
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  confirmText: {
    color: COLORS.textPrimary,
    fontSize: TYPE.button.fontSize,
    fontWeight: "600",
  },
});

export default styles;
