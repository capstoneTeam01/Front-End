import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { HEADER_FOOTER } from "../constants/typography";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  heroWrap: {
    marginTop: 88,
    alignItems: "center",
  },
  heroContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  textBlock: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 52,
    alignItems: "center",
  },
  title: {
    fontSize: 27,
    fontWeight: "400",
    color: COLORS.secondary,
    marginBottom: 18,
    textAlign: "center",
  },
  body: {
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
  },
  buttonHalf: {
    flex: 1,
  },
  welcomeButton: {
    height: 47,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
  },
  welcomeButtonLabel: {
    color: COLORS.secondary,
    ...HEADER_FOOTER.footerButton,
  },
});

export default styles;
