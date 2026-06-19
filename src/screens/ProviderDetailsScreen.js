import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

import ProviderPlainButton from "../components/ProviderPlainButton";
import { loadProviderDetails } from "../localDb/businessDirectoryProviderLocalDb";
import { MAX_SELECTED_PROVIDERS } from "../utils/providerConstants";

const androidTopSpace = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const bottomButtonSpace = Platform.OS === "android" ? 72 : 20;

const normalizeSelectedIds = (ids = []) => {
  if (!Array.isArray(ids)) return [];
  return [...new Set(ids.filter(Boolean).map((id) => String(id)))];
};

const ProviderDetailsScreen = ({ navigation, route }) => {
  const providerId = route?.params?.providerId;
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const row = await loadProviderDetails(providerId);
        if (active) setProvider(row);
        console.log("[FixBee][ProviderDetails] loaded provider", {
          providerId,
          found: Boolean(row),
        });
      } catch (error) {
        console.log("[FixBee][ProviderDetails] load failed", error?.message);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [providerId]);

  const handleAddToList = () => {
    if (!provider) return;

    const selectedIds = normalizeSelectedIds(route?.params?.selectedProviderIds);
    let nextSelectedIds = selectedIds;

    if (!selectedIds.includes(provider.id)) {
      if (selectedIds.length >= MAX_SELECTED_PROVIDERS) {
        Alert.alert("Selection limit", `You can select up to ${MAX_SELECTED_PROVIDERS} providers.`);
        return;
      }

      nextSelectedIds = normalizeSelectedIds([...selectedIds, provider.id]);
    }

    console.log("[FixBee][ProviderDetails] add to list", {
      providerId: provider.id,
      selectedCount: nextSelectedIds.length,
    });

    navigation.navigate("ProviderList", {
      ...route.params,
      selectedProviderIds: nextSelectedIds,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 12, paddingTop: 12 + androidTopSpace }}>
        <ProviderPlainButton title="Back" onPress={() => navigation.goBack()} />
        <Text>Provider Details</Text>
      </View>

      {loading ? (
        <View style={{ padding: 12 }}>
          <ActivityIndicator />
          <Text>Loading provider...</Text>
        </View>
      ) : null}

      {!loading && !provider ? (
        <View style={{ padding: 12 }}>
          <Text>Provider not found.</Text>
          <ProviderPlainButton title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      ) : null}

      {provider ? (
        <>
          <ScrollView contentContainerStyle={{ padding: 12, paddingBottom: 24 }}>
            <Text>{provider.businessName || "Provider"}</Text>
            <Text>Rating: {provider.rating || "N/A"}</Text>
            <Text>Reviews: {provider.reviewCount || 0}</Text>
            <Text>City: {provider.city || provider.requestCity || "Not available"}</Text>
            <Text>Address: {provider.address || "Not available"}</Text>
            <Text>Phone: {provider.phoneDisplay || "Not available"}</Text>
            <Text>Email: {provider.email || "Not available"}</Text>
            <Text>About: {provider.businessDescription || "No description available."}</Text>
          </ScrollView>

          <View style={{ padding: 12, paddingBottom: bottomButtonSpace }}>
            <ProviderPlainButton title="Add to List" onPress={handleAddToList} />
          </View>
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default ProviderDetailsScreen;
