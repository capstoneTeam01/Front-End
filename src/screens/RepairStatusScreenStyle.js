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
    flexGrow: 1,
    paddingBottom: 102,
  },

  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
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

  hero: {
    width: "100%",
    height: 520,
    backgroundColor: COLORS.charcoal,
    position: "relative",
    overflow: "hidden",
  },

  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },

  heroPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
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

  heroTitle: {
    color: COLORS.white,
    marginBottom: 6,
    ...TYPE.sectionTitle,
  },

  heroDescription: {
    color: COLORS.white,
    ...TYPE.cardTitle,
  },

  contentContainer: {
    position: "relative",
    backgroundColor: COLORS.white,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 36,
    paddingBottom: 32,
  },

  riskBadgePosition: {
    position: "absolute",
    top: -46,
    right: SIDE_PADDING,
    zIndex: 5,
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
    marginBottom: 28,
  },

  sectionTitle: {
    color: COLORS.textPrimary,
    marginBottom: 14,
    ...TYPE.cardTitle,
  },

  sectionHint: {
    color: COLORS.textSecondary,
    marginTop: -8,
    marginBottom: 14,
    ...TYPE.small,
  },

  detailList: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: RADIUS.big,
    overflow: "hidden",
    backgroundColor: COLORS.white,
  },

  detailRow: {
    minHeight: 52,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray300,
  },

  detailRowLast: {
    borderBottomWidth: 0,
  },

  detailText: {
    color: COLORS.textSecondary,
    ...TYPE.small,
  },

  estimateSection: {
    marginBottom: 32,
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

  chosenProviderCard: {
    minHeight: 64,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: RADIUS.big,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  providerInitial: {
    width: 36,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.lightHoney,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  providerInitialText: {
    color: COLORS.secondary,
    ...TYPE.body,
  },

  feedbackLink: {
    alignSelf: "flex-start",
    paddingVertical: 14,
  },

  feedbackLinkText: {
    color: COLORS.secondary,
    textDecorationLine: "underline",
    ...TYPE.small,
  },

  feedbackSubmittedText: {
    color: COLORS.textSecondary,
    marginTop: 12,
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
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },

  confirmationModal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },

  modalMascot: {
    alignSelf: "center",
    marginBottom: 16,
  },

  confirmationTitle: {
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 12,
    ...TYPE.screenTitle,
  },

  confirmationMessage: {
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 28,
    ...TYPE.small,
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
});

export default styles;
