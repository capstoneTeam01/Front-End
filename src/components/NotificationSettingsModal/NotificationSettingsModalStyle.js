import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { SIDE_PADDING, TYPE } from "../../constants/layout";

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
  title: {
    fontSize: TYPE.sectionTitle.fontSize,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
});

export default styles;
