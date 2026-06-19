import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    width: 168,
    height: 220,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 18,
    backgroundColor: "#FDFDFD",
    marginRight: 16,
    overflow: "hidden",
  },

  imageContainer: {
    height: 110,
    backgroundColor: "#F3F4F6",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    padding: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0A0A0A",
    marginBottom: 10,
  },

  date: {
    fontSize: 14,
    color: "#4A5565",
    marginBottom: 12,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#E2E2E2",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  badgeText: {
    fontSize: 13,
    color: "#0A0A0A",
  },
});

export default styles;