import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import {
  BUTTON_HEIGHT,
  RADIUS,
  TYPE,
} from "../constants/layout";
import { HEADER_FOOTER } from "../constants/typography";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scroll: {
    width: 354,
    alignSelf: "center",
    paddingTop: 24,
    paddingBottom: 120,
  },

  title: {
    color: COLORS.textPrimary,
    marginBottom: 10,
    ...TYPE.sectionTitle,
  },

  subtitle: {
    color: COLORS.mediumGrey,
    marginBottom: 24,
    ...TYPE.small,
  },

  sectionTitle: {
    color: COLORS.textPrimary,
    marginBottom: 16,
    ...TYPE.cardTitle,
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
    color: COLORS.textPrimary,
    ...TYPE.body,
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
    color: COLORS.white,
    ...TYPE.caption,
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
    color: COLORS.secondary,
    marginBottom: 7,
    ...TYPE.small,
  },

  stepDesc: {
    color: COLORS.honeyBrown,
    ...TYPE.caption,
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
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    backgroundColor: COLORS.lightHoney,
  },

  warningIcon: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.field,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },

  warningText: {
    flex: 1,
    color: COLORS.textPrimary,
    ...TYPE.caption,
  },

  helpBox: {
    minHeight: 92,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginBottom: 20,
  },

  helpTitle: {
    color: COLORS.textPrimary,
    marginBottom: 10,
    ...TYPE.body,
  },

  helpText: {
    color: COLORS.mediumGrey,
    textAlign: "center",
    ...TYPE.caption,
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },

  footerRow: {
    flexDirection: "row",
    gap: 12,
  },

  footerBtn: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  findExpertsBtn: {
    backgroundColor: COLORS.lightHoney,
  },

  diyDoneBtnDisabled: {
    backgroundColor: COLORS.lightHoney,
    opacity: 0.6,
  },

  diyDoneBtnActive: {
    backgroundColor: COLORS.primary,
  },

  footerBtnText: {
    color: COLORS.secondary,
    ...HEADER_FOOTER.footerButton,
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
    color: COLORS.textPrimary,
    marginBottom: 8,
    ...TYPE.cardTitle,
  },

  modalText: {
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 24,
    ...TYPE.small,
  },

  modalButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },

  modalDarkButton: {
    flex: 1,
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  modalLightButton: {
    flex: 1,
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    backgroundColor: COLORS.lightHoney,
    alignItems: "center",
    justifyContent: "center",
  },

  modalDarkText: {
    color: COLORS.secondary,
    ...TYPE.button,
  },

  modalLightText: {
    color: COLORS.secondary,
    ...TYPE.button,
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
    color: COLORS.textPrimary,
    ...TYPE.small,
  },
});

export default styles;
