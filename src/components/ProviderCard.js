import React from "react";
import { Pressable, Text, View } from "react-native";
import ProviderPlainButton from "./ProviderPlainButton";

const ProviderCard = ({ provider, selected = false, onPress, onToggle }) => {
  return (
    <View style={{ paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
      <Pressable onPress={onPress}>
        <Text>{selected ? "✓ " : ""}{provider.businessName || "Provider"}</Text>
        <Text>{provider.city || "City not available"}</Text>
        <Text>
          Rating: {provider.rating || "N/A"} | Reviews: {provider.reviewCount || 0}
        </Text>
      </Pressable>

      <ProviderPlainButton title={selected ? "Remove" : "Select"} onPress={onToggle} />
    </View>
  );
};

export default ProviderCard;
