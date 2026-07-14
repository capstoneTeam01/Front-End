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
    color: COLORS.textPrimary,
    ...TYPE.small,
  },

  summaryCard: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: RADIUS.big,
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 24,
  },

  label: {
    color: COLORS.mediumGrey,
    marginBottom: 8,
    ...TYPE.caption,
  },

  title: {
    color: COLORS.secondary,
    marginBottom: 14,
    ...TYPE.sectionTitle,
  },

  meta: {
    color: COLORS.honeyBrown,
    marginTop: 4,
    ...TYPE.small,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    color: COLORS.textPrimary,
    marginBottom: 14,
    ...TYPE.cardTitle,
  },

  emptyText: {
    color: COLORS.mediumGrey,
    ...TYPE.small,
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
    color: COLORS.secondary,
    marginBottom: 4,
    ...TYPE.body,
  },

  providerMeta: {
    color: COLORS.mediumGrey,
    ...TYPE.small,
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
    color: COLORS.secondary,
    ...TYPE.button,
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
  color: COLORS.textPrimary,
  marginBottom: 16,
  textAlign: "center",
  ...TYPE.cardTitle,
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
  borderRadius: RADIUS.field,
  padding: 14,
  marginBottom: 18,
  color: COLORS.textPrimary,
  ...TYPE.small,
},
});

export default styles;
