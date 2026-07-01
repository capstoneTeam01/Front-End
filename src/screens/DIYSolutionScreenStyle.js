import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import {
  SIDE_PADDING,
  BUTTON_HEIGHT,
  RADIUS,
  TYPE,
} from "../constants/layout";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    height: 72,
    paddingHorizontal: SIDE_PADDING,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightHoney,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  headerTitle: {
    fontSize: TYPE.body.fontSize,
    fontWeight: TYPE.body.fontWeight,
    color: COLORS.textPrimary,
  },

  headerSpace: {
    width: 24,
  },

  scroll: {
    width: 354,
    alignSelf: "center",
    paddingTop: 24,
    paddingBottom: 130,
  },

  title: {
    fontSize: TYPE.sectionTitle.fontSize,
    fontWeight: "400",
    color: COLORS.textPrimary,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: TYPE.small.fontSize,
    lineHeight: 20,
    color: COLORS.mediumGrey,
    marginBottom: 26,
  },

  sectionTitle: {
    fontSize: TYPE.cardTitle.fontSize,
    fontWeight: "500",
    color: COLORS.textPrimary,
    marginBottom: 16,
  },

  toolCard: {
    borderWidth: 1,
    borderColor: COLORS.gray500,
    borderRadius: RADIUS.big,
    backgroundColor: COLORS.white,
    marginBottom: 28,
    overflow: "hidden",
  },

  toolRow: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },

  hexIcon: {
    width: 34,
    height: 34,
    backgroundColor: COLORS.lightHoney,
    marginRight: 16,
    borderRadius: 9,
  },

  toolText: {
    fontSize: TYPE.body.fontSize,
    color: COLORS.textPrimary,
  },

  stepsBox: {
    marginBottom: 24,
  },

  stepRow: {
    flexDirection: "row",
    minHeight: 76,
  },

  stepLeft: {
    width: 44,
    alignItems: "center",
  },

  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: COLORS.lightHoney,
    alignItems: "center",
    justifyContent: "center",
  },

  stepCircleActive: {
    backgroundColor: COLORS.primary,
  },

  stepCircleDone: {
    backgroundColor: COLORS.primary,
  },

  stepNumber: {
    fontSize: TYPE.caption.fontSize,
    fontWeight: "600",
    color: COLORS.white,
  },

  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.gray300,
    marginTop: 4,
  },

  stepLineDone: {
    backgroundColor: COLORS.primary,
  },

  stepContent: {
    flex: 1,
    paddingLeft: 4,
  },

  stepTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.secondary,
    marginBottom: 7,
  },

  stepDesc: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.honeyBrown,
  },

  inactiveText: {
    color: COLORS.mediumGrey,
  },

  inactiveDesc: {
    color: COLORS.greyText,
  },

  warningBox: {
    minHeight: 92,
    borderRadius: RADIUS.big,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    backgroundColor: COLORS.lightHoney,
  },

  warningIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },

  warningText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.textPrimary,
  },

  helpBox: {
    minHeight: 92,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginBottom: 20,
  },

  helpTitle: {
    fontSize: TYPE.body.fontSize,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 10,
  },

  helpText: {
    fontSize: 13,
    color: COLORS.mediumGrey,
    textAlign: "center",
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 22,
    paddingBottom: 28,
    backgroundColor: COLORS.warmCream,
    flexDirection: "row",
    gap: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  secondaryButton: {
    flex: 1,
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    backgroundColor: COLORS.lightHoney,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryText: {
    fontSize: TYPE.button.fontSize,
    fontWeight: TYPE.button.fontWeight,
    color: COLORS.secondary,
  },

  diyButton: {
    flex: 1,
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    alignItems: "center",
    justifyContent: "center",
  },

  diyButtonDisabled: {
    backgroundColor: COLORS.lightHoney,
  },

  diyButtonActive: {
    backgroundColor: COLORS.primary,
  },

  diyButtonText: {
    fontSize: TYPE.button.fontSize,
    fontWeight: TYPE.button.fontWeight,
    color: COLORS.secondary,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  completeModal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: "center",
  },

  modalHandle: {
    width: 34,
    height: 4,
    borderRadius: 10,
    backgroundColor: COLORS.gray700,
    marginBottom: 16,
  },

  modalIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  modalTitle: {
    fontSize: TYPE.cardTitle.fontSize,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },

  modalText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },

  modalButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },

  modalDarkButton: {
    flex: 1,
    height: 44,
    borderRadius: RADIUS.small,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  modalLightButton: {
    flex: 1,
    height: 44,
    borderRadius: RADIUS.small,
    backgroundColor: COLORS.lightHoney,
    alignItems: "center",
    justifyContent: "center",
  },

  modalDarkText: {
    color: COLORS.secondary,
    fontSize: 13,
    fontWeight: "500",
  },

  modalLightText: {
    color: COLORS.secondary,
    fontSize: 13,
    fontWeight: "500",
  },

  backIcon: {
    fontSize: 24,
    color: COLORS.textPrimary,
  },

  stepCheckIcon: {
    fontSize: 16,
    color: COLORS.white,
  },

  warningIconStyle: {
    fontSize: 22,
    color: COLORS.textPrimary,
  },

  modalCheckIcon: {
    fontSize: 26,
    color: COLORS.white,
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
});

export default styles;