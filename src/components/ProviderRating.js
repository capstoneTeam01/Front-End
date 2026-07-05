import React from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/colors";
import ProviderGoogleIcon from "./ProviderGoogleIcon";

const ProviderRating = ({ rating, reviewCount, showGoogle = false }) => (
  <View style={styles.row}>
    <Text style={styles.star}>★</Text>
    <Text style={styles.text}>{rating || "N/A"}</Text>
    <Text style={styles.muted}> {reviewCount || 0} reviews</Text>
    {showGoogle ? (
      <>
        <Text style={styles.onText}> on </Text>
        <ProviderGoogleIcon size={18} />
      </>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  star: {
    color: COLORS.honeyDark,
    fontSize: 12,
    marginRight: 3,
  },
  text: {
    color: COLORS.providerBrown,
    fontSize: 12,
    fontWeight: "700",
  },
  muted: {
    color: COLORS.providerMidGray,
    fontSize: 11,
  },
  onText: {
    color: COLORS.providerMidGray,
    fontSize: 11,
    marginLeft: 4,
  },
});

export default ProviderRating;
