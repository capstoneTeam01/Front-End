import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  yellowLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  beeWrap: {
    zIndex: 2,
  },
});

export default styles;
