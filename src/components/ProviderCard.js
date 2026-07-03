import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/colors";
import ProviderHexAvatar from "./ProviderHexAvatar";
import ProviderRating from "./ProviderRating";

const selectedTick = require("../../assets/serviceProvider/provider-selected-tick.png");

const ProviderCard = ({ provider, selected = false, onPress, onToggle }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed ? styles.pressed : null]}>
      <ProviderHexAvatar label={provider.businessName} selected={selected} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{provider.businessName || "Provider"}</Text>
        <ProviderRating rating={provider.rating} reviewCount={provider.reviewCount} />
        <Text style={styles.distance} numberOfLines={1}>{provider.city || "City not available"}</Text>
      </View>

      <Pressable onPress={onToggle} hitSlop={10} style={styles.selectButton}>
        {selected ? (
          <Image source={selectedTick} style={styles.selectedTick} />
        ) : (
          <View style={styles.selectCircle} />
        )}
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.providerLightGray,
  },
  pressed: {
    opacity: 0.82,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 3,
  },
  distance: {
    color: COLORS.providerMidGray,
    fontSize: 11,
    marginTop: 2,
  },
  selectButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  selectCircle: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 1.3,
    borderColor: COLORS.providerBorder,
  },
  selectedTick: {
    width: 27,
    height: 27,
    resizeMode: "contain",
  },
});

export default ProviderCard;
