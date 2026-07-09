import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";
import { HEADER_FOOTER } from "../../constants/typography";
import { BUTTON_HEIGHT, RADIUS, SPACING } from "../../constants/layout";

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
    ...HEADER_FOOTER.footerButton,
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
    ...HEADER_FOOTER.footerButton,
  },
});

export default styles;
