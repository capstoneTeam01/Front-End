import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { RADIUS, SIDE_PADDING, TYPE } from "../../constants/layout";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 12,
    paddingBottom: 40,
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray500,
    marginBottom: 20,
  },
  iconHex: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  iconHexDanger: {
    backgroundColor: "#D32F2F",
  },
  iconHexNeutral: {
    backgroundColor: COLORS.primary,
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: 8,
    ...TYPE.sectionTitle,
  },
  message: {
    color: COLORS.textSecondary,
    ...TYPE.small,
  },
  fieldLabel: {
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    ...TYPE.small,
  },
  input: {
    height: 52,
    borderRadius: RADIUS.field,
    borderWidth: 1,
    borderColor: COLORS.greyText,
    paddingHorizontal: 16,
    color: COLORS.textPrimary,
    ...TYPE.body,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  btn: {
    flex: 1,
    height: 52,
    borderRadius: RADIUS.field,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmBtn: {
    backgroundColor: COLORS.primary,
  },
  confirmLabel: {
    color: COLORS.textPrimary,
    ...TYPE.button,
  },
  cancelBtn: {
    backgroundColor: COLORS.lightHoney,
  },
  cancelLabel: {
    color: COLORS.textPrimary,
    ...TYPE.button,
  },
});

export default styles;
