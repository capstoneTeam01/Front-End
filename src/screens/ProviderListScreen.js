import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

import ProviderPlainButton from "../components/ProviderPlainButton";
import ProviderCard from "../components/ProviderCard";
import { useBusinessDirectoryProviderList } from "../hooks/useBusinessDirectoryProviderList";
import { useBusinessDirectoryProviderSync } from "../hooks/useBusinessDirectoryProviderSync";
import { normalizeProviderCategory } from "../utils/issueProviderRouteMapper";
import {
  DEFAULT_PROVIDER_CATEGORY,
  DEFAULT_PROVIDER_CITY,
  MAX_SELECTED_PROVIDERS,
} from "../utils/providerConstants";
import { resolveProviderCity } from "../utils/providerCityResolver";

const androidTopSpace = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const bottomButtonSpace = Platform.OS === "android" ? 72 : 20;

const normalizeSelectedIds = (ids = []) => {
  if (!Array.isArray(ids)) return [];
  return [...new Set(ids.filter(Boolean).map((id) => String(id)))];
};

const ProviderListScreen = ({ navigation, route }) => {
  const city = useMemo(() => {
    const resolved = resolveProviderCity({
      city: route?.params?.city || route?.params?.detectedUserCity || DEFAULT_PROVIDER_CITY,
      latitude: route?.params?.detectedLatitude,
      longitude: route?.params?.detectedLongitude,
      fallback: DEFAULT_PROVIDER_CITY,
      preferCoordinates: Boolean(route?.params?.detectedLatitude && route?.params?.detectedLongitude),
    });

    console.log("[FixBee][ProviderList] request city", {
      city: resolved.city,
      source: resolved.source,
      rawCity: route?.params?.city || route?.params?.detectedUserCity,
    });

    return resolved.city;
  }, [
    route?.params?.city,
    route?.params?.detectedUserCity,
    route?.params?.detectedLatitude,
    route?.params?.detectedLongitude,
  ]);

  const category = useMemo(() => {
    if (route?.params?.fromIssue) return DEFAULT_PROVIDER_CATEGORY;
    return normalizeProviderCategory(route?.params?.category, DEFAULT_PROVIDER_CATEGORY);
  }, [route?.params?.category, route?.params?.fromIssue]);

  const [selectedIds, setSelectedIds] = useState(() =>
    normalizeSelectedIds(route?.params?.selectedProviderIds)
  );

  const { providers, loading, reloadProviders } = useBusinessDirectoryProviderList({ city, category });
  const { syncing, syncProviders, syncError } = useBusinessDirectoryProviderSync({ city, category, limit: 20 });

  const selectedProviders = useMemo(
    () => providers.filter((provider) => selectedIds.includes(provider.id)),
    [providers, selectedIds]
  );

  const syncAndReload = async ({ force = false } = {}) => {
    console.log("[FixBee][ProviderList] sync requested", { city, category, force });
    const result = await syncProviders({ force });
    const rows = await reloadProviders();
    console.log("[FixBee][ProviderList] UI reloaded from SQLite", {
      city,
      category,
      source: result?.source,
      count: rows.length,
    });
    return result;
  };

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const cached = await reloadProviders();
        if (!active) return;
        await syncAndReload({ force: cached.length === 0 });
      } catch (error) {
        console.log("[FixBee][ProviderList] sync failed", error?.message);
      }
    })();

    return () => {
      active = false;
    };
  }, [city, category]);

  useEffect(() => {
    const incomingIds = normalizeSelectedIds(route?.params?.selectedProviderIds);
    if (!incomingIds.length) return;

    setSelectedIds((current) => normalizeSelectedIds([...current, ...incomingIds]));
  }, [route?.params?.selectedProviderIds]);

  const toggleProvider = (providerId) => {
    setSelectedIds((current) => {
      if (current.includes(providerId)) {
        const next = current.filter((id) => id !== providerId);
        console.log("[FixBee][ProviderList] provider unselected", { providerId, count: next.length });
        return next;
      }

      if (current.length >= MAX_SELECTED_PROVIDERS) {
        Alert.alert("Selection limit", `You can select up to ${MAX_SELECTED_PROVIDERS} providers.`);
        return current;
      }

      const next = [...current, providerId];
      console.log("[FixBee][ProviderList] provider selected", { providerId, count: next.length });
      return next;
    });
  };

  const openProvider = (provider) => {
    navigation.navigate("ProviderDetails", {
      ...route.params,
      providerId: provider.id,
      city,
      category,
      selectedProviderIds: selectedIds,
      selectedProviderNames: selectedProviders.map((item) => item.businessName),
    });
  };

  const handleNext = () => {
    if (!selectedProviders.length) {
      Alert.alert("Choose a provider", "Select at least one provider before continuing.");
      return;
    }

    console.log("[FixBee][ProviderList] next pressed", {
      selectedCount: selectedProviders.length,
      city,
      category,
    });

    navigation.navigate("ProviderAddressTime", {
      ...route.params,
      city,
      category,
      selectedProviderIds: selectedProviders.map((provider) => provider.id),
      selectedProviderNames: selectedProviders.map((provider) => provider.businessName),
    });
  };

  const initialLoading = (loading || syncing) && providers.length === 0;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 12, paddingTop: 12 + androidTopSpace }}>
        <ProviderPlainButton title="Back" onPress={() => navigation.goBack()} />
        <Text>Find Experts</Text>
        <Text>City: {city}</Text>
        <Text>Category: {category}</Text>
        <Text>Selected: {selectedIds.length}/{MAX_SELECTED_PROVIDERS}</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
        refreshControl={<RefreshControl refreshing={syncing} onRefresh={() => syncAndReload({ force: true })} />}
      >
        {initialLoading ? (
          <View style={{ padding: 12 }}>
            <ActivityIndicator />
            <Text>Loading providers from SQLite...</Text>
          </View>
        ) : null}

        {!initialLoading && providers.length === 0 ? (
          <View style={{ padding: 12 }}>
            <Text>No providers found.</Text>
            {syncError ? <Text>{syncError}</Text> : null}
            <ProviderPlainButton title="Try Again" onPress={() => syncAndReload({ force: true })} />
          </View>
        ) : null}

        {providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            selected={selectedIds.includes(provider.id)}
            onPress={() => openProvider(provider)}
            onToggle={() => toggleProvider(provider.id)}
          />
        ))}
      </ScrollView>

      <View style={{ padding: 12, paddingBottom: bottomButtonSpace }}>
        <ProviderPlainButton title="Next" onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};

export default ProviderListScreen;
