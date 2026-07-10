import { StyleSheet } from "react-native";
import { TYPE } from "../constants/layout";

const styles = StyleSheet.create({
  row: {
    minHeight: 104,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 20,
    backgroundColor: "#FDFDFD",
    paddingHorizontal: 18,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  divider: {
    borderTopWidth: 1,
    borderTopColor: "#E9E7E7",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconChip: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },

  text: {
    flex: 1,
  },

  title: {
    color: "#0A0A0A",
    marginBottom: 8,
    ...TYPE.h3,
  },

  subtitle: {
    color: "#4A5565",
    ...TYPE.body,
  },
});

export default styles;
