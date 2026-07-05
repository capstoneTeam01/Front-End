import { StyleSheet } from "react-native";

import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  
  container: {
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
  },
  side: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  sideRight: {
    alignItems: "flex-end",
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 24,
    color: COLORS.secondary,
  },
});

export default styles;
