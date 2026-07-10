import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { BUTTON_HEIGHT, RADIUS, SIDE_PADDING, TYPE } from "../constants/layout";
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

  toolIcon: {
    width: 46,
    height: 50,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
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
    paddingBottom: 16,
  },

  stepLeft: {
    width: 58,
    alignItems: "center",
  },

  stepMarker: {
    alignItems: "center",
    justifyContent: "center",
  },

  stepMarkerLayer: {
    width: 48,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },

  stepMarkerBack: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  stepMarkerFront: {
    alignItems: "center",
    justifyContent: "center",
  },

  stepNumber: {
    color: COLORS.white,
    ...TYPE.caption,
  },

  stepNumberActive: {
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
    color: COLORS.secondary,
    marginBottom: 7,
    ...TYPE.small,
  },

  stepDesc: {
    ...TYPE.caption,
    fontSize: 13,
    lineHeight: 20,
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
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    backgroundColor: COLORS.lightHoney,
  },

  warningIcon: {
    width: 68,
    height: 74,
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
    justifyContent: "center",
    paddingHorizontal: SIDE_PADDING,
  },

  completeModal: {
    minHeight: 420,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.big,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 18,
    paddingBottom: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.providerLightGray,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 22,
    elevation: 6,
  },

  modalHandle: {
    width: 34,
    height: 4,
    borderRadius: 10,
    backgroundColor: COLORS.gray700,
    marginBottom: 30,
  },

  modalIcon: {
    width: 78,
    height: 87,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  modalTitle: {
    color: COLORS.textPrimary,
    marginBottom: 26,
    ...TYPE.screenTitle,
  },

  modalText: {
    color: COLORS.providerMidGray,
    textAlign: "center",
    paddingHorizontal: 10,
    ...TYPE.cardTitle,
  },

  modalButtons: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    marginTop: "auto",
  },

  modalDarkButton: {
    flex: 1,
    height: BUTTON_HEIGHT,
    borderRadius: RADIUS.field,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
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

  modalCheckIcon: {
    fontSize: 36,
    color: COLORS.secondary,
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
