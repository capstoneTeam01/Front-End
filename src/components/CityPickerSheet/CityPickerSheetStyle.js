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
    paddingBottom: 32,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray700,
    marginBottom: 16,
  },
  title: {
    color: COLORS.textPrimary,
    marginBottom: 8,
    ...TYPE.sectionTitle,
  },
  subtitle: {
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 16,
    ...TYPE.small,
  },
  cityList: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: RADIUS.field,
  },
  rowActive: {
    backgroundColor: COLORS.warmCream,
  },
  rowText: {
    color: COLORS.surfaceDark,
    ...TYPE.body,
  },
  rowTextActive: {
    color: COLORS.textPrimary,
  },
  check: {
    color: COLORS.primary,
    ...TYPE.body,
  },
});

export default styles;
