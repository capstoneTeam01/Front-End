import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/colors";
import FONT from "../constants/typography";
import ProviderHexAvatar from "./ProviderHexAvatar";
import ProviderRating from "./ProviderRating";

const selectedTick = require("../../assets/serviceProvider/provider-selected-tick.png");

const ProviderCard = ({ provider, selected = false, onPress, onToggle }) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.card,
        selected ? styles.cardSelected : null,
        pressed ? styles.pressed : null,
      ]}
    >
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
    minHeight: 104,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.providerLightGray,
  },
  cardSelected: {
    backgroundColor: COLORS.warmCream,
    borderColor: COLORS.goldenHoney,
    borderWidth: 1.5,
  },
  pressed: {
    opacity: 0.82,
  },
  content: {
    flex: 1,
    marginLeft: 20,
  },
  name: {
    fontFamily: FONT.regular,
    color: COLORS.secondary,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    marginBottom: 4,
  },
  distance: {
    display: "none",
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
