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
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 12,
    paddingBottom: 38,
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray500,
    marginBottom: 28,
  },
  iconHex: {
    width: 80,
    height: 89,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: 12,
    ...TYPE.sectionTitle,
  },
  message: {
    color: COLORS.textSecondary,
    ...TYPE.body,
  },
  fieldLabel: {
    color: COLORS.textPrimary,
    marginTop: 24,
    marginBottom: 12,
    ...TYPE.small,
  },
  input: {
    height: 58,
    borderRadius: RADIUS.field,
    borderWidth: 1,
    borderColor: COLORS.greyText,
    paddingHorizontal: 16,
    color: COLORS.textPrimary,
    ...TYPE.small,
  },
  actions: {
    flexDirection: "row",
    gap: 20,
    marginTop: 34,
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
