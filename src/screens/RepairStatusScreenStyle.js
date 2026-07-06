import { StyleSheet } from "react-native";

import COLORS from "../constants/colors";
import {
  BUTTON_HEIGHT,
  RADIUS,
  SIDE_PADDING,
  TYPE,
} from "../constants/layout";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scroll: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 24,
    paddingBottom: 120,
  },

  loadingBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: TYPE.small.fontSize,
    color: COLORS.textPrimary,
  },

  summaryCard: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: RADIUS.big,
    backgroundColor: COLORS.white,
    padding: 18,
    marginBottom: 28,
  },

  label: {
    fontSize: TYPE.caption.fontSize,
    color: COLORS.mediumGrey,
    marginBottom: 8,
  },

  title: {
    fontSize: TYPE.sectionTitle.fontSize,
    fontWeight: "600",
    color: COLORS.secondary,
    marginBottom: 14,
  },

  meta: {
    fontSize: TYPE.small.fontSize,
    color: COLORS.honeyBrown,
    marginTop: 4,
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: TYPE.cardTitle.fontSize,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 14,
  },

  emptyText: {
    fontSize: TYPE.small.fontSize,
    color: COLORS.mediumGrey,
  },

  providerCard: {
    minHeight: 76,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.white,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  providerCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.warmCream,
  },

  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightHoney,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  providerContent: {
    flex: 1,
  },

  providerName: {
    fontSize: TYPE.body.fontSize,
    fontWeight: "600",
    color: COLORS.secondary,
    marginBottom: 4,
  },

  providerMeta: {
    fontSize: TYPE.small.fontSize,
    color: COLORS.mediumGrey,
  },

  primaryButton: {
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonDisabled: {
    backgroundColor: COLORS.lightHoney,
    opacity: 0.6,
  },

  primaryButtonText: {
    fontSize: TYPE.button.fontSize,
    fontWeight: TYPE.button.fontWeight,
    color: COLORS.secondary,
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.35)",
  justifyContent: "flex-end",
},

feedbackModal: {
  backgroundColor: COLORS.white,
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  padding: 24,
},

modalTitle: {
  fontSize: 18,
  fontWeight: "600",
  color: COLORS.textPrimary,
  marginBottom: 16,
  textAlign: "center",
},

starRow: {
  flexDirection: "row",
  justifyContent: "center",
  gap: 10,
  marginBottom: 20,
},

feedbackInput: {
  minHeight: 90,
  borderWidth: 1,
  borderColor: COLORS.gray300,
  borderRadius: 14,
  padding: 14,
  marginBottom: 18,
  color: COLORS.textPrimary,
},
});

export default styles;