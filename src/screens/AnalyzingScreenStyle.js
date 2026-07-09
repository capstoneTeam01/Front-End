import { StyleSheet } from "react-native";

import COLORS from "../constants/colors";
import {
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
    height: 200,
    overflow: "visible",
  },

  heroContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  heroContent: {
    ...StyleSheet.absoluteFillObject,
  },

  mascot: {
    position: "absolute",
    alignSelf: "center",
  },

  heroTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "400",
    color: COLORS.secondary,
    textAlign: "center",
  },

  stepsCard: {
    position: "absolute",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    paddingHorizontal: 16,
    paddingVertical: 7,

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
    marginRight: 16,
  },

  stepText: {
    flex: 1,
    ...TYPE.body,
    color: COLORS.honeyBrown,
    lineHeight: 22,
  },

  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
  },

  bottomArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },

  cancelButton: {
    width: "100%",
    height: 46,
    borderRadius: 14,
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
