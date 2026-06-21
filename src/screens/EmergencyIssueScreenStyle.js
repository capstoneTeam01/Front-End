import { StyleSheet } from "react-native";

import COLORS from "../constants/colors";
import {
  RADIUS,
  SIDE_PADDING,
  SPACING,
  TYPE,
} from "../constants/layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  content: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 18,
    paddingBottom: 28,
  },

  screenTitle: {
    ...TYPE.sectionTitle,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: SPACING.card,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: RADIUS.big,
    marginBottom: SPACING.card,
    backgroundColor: COLORS.gray500,
  },

  imagePlaceholder: {
    width: "100%",
    height: 220,
    borderRadius: RADIUS.big,
    marginBottom: SPACING.card,
    backgroundColor: COLORS.gray500,
    alignItems: "center",
    justifyContent: "center",
  },

  placeholderText: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
});

export default styles;