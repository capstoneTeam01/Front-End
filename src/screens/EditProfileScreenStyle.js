import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { SIDE_PADDING, RADIUS, TYPE } from "../constants/layout";
import { HEADER_FOOTER } from "../constants/typography";

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightHoney,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: COLORS.textPrimary,
    ...TYPE.sectionTitle,
  },
  scroll: {
    paddingHorizontal: SIDE_PADDING,
    paddingTop: 24,
    paddingBottom: 132,
  },
  avatarWrap: {
    alignItems: "flex-start",
    marginBottom: 22,
  },
  label: {
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    ...TYPE.body,
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
  inputDisabled: {
    color: COLORS.textMuted,
  },
  cityField: {
    height: 52,
    borderRadius: RADIUS.field,
    borderWidth: 1,
    borderColor: COLORS.greyText,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cityText: {
    fontSize: TYPE.body.fontSize,
    color: COLORS.textPrimary,
  },
  cityPlaceholder: {
    color: COLORS.placeholder,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerRow: {
    flexDirection: "row",
    gap: 20,
  },
  footerBtn: {
    flex: 1,
    height: 52,
    borderRadius: RADIUS.field,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtn: {
    backgroundColor: COLORS.lightHoney,
  },
  cancelLabel: {
    color: COLORS.secondary,
    ...HEADER_FOOTER.footerButton,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
  },
  saveLabel: {
    color: COLORS.secondary,
    ...HEADER_FOOTER.footerButton,
  },
});

export default styles;
