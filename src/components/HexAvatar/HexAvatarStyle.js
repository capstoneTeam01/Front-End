import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  polygon: {
    position: "absolute",
  },
  iconLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  editBadge: {
    position: "absolute",
    right: -3,
    bottom: 13,
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
