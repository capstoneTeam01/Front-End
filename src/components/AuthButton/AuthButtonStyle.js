import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { HEADER_FOOTER } from "../../constants/typography";

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.lightHoney, 
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  buttonSecondary: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.surface,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  label: {
    color: COLORS.textPrimary,
    ...HEADER_FOOTER.footerButton,
  },
});

export default styles;
