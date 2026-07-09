import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.38)",
  },
  sheet: {
    minHeight: 308,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  handle: {
    width: 40,
    height: 4,
    marginBottom: 20,
    borderRadius: 2,
    backgroundColor: COLORS.gray700,
  },
  title: {
    marginTop: 16,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "400",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  message: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
    color: COLORS.mediumGrey,
    textAlign: "center",
  },
  button: {
    width: "100%",
    height: 46,
    marginTop: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    color: COLORS.secondary,
  },
});

export default styles;
