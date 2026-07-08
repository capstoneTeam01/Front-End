import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  tray: {
    width: "100%",
    minHeight: 102,
    position: "relative",
    overflow: "hidden",
  },
  shape: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 29,
    paddingBottom: 26,
  },
});

export default styles;
