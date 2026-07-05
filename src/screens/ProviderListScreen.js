import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppHeader from "../components/AppHeader/AppHeader";
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
import {
  buildLocationRouteParams,
  getCurrentCityFromGps,
} from "../utils/locationHelper";
import COLORS from "../constants/colors";
import FONT from "../constants/typography";

const bottomButtonSpace = Platform.OS === "android" ? 28 : 18;

const normalizeSelectedIds = (ids = []) => {
  if (!Array.isArray(ids)) return [];
  return [...new Set(ids.filter(Boolean).map((id) => String(id)))];
};

const ProviderListScreen = ({ navigation, route }) => {
  const initialCity = useMemo(() => {
    const resolved = resolveProviderCity({
      city:
        route?.params?.detectedUserCity ||
        route?.params?.city ||
        DEFAULT_PROVIDER_CITY,
      latitude: route?.params?.detectedLatitude,
      longitude: route?.params?.detectedLongitude,
      fallback: DEFAULT_PROVIDER_CITY,
      preferCoordinates: Boolean(
        route?.params?.detectedLatitude && route?.params?.detectedLongitude,
      ),
    });

    console.log("[FixBee][ProviderList] request city", {
      city: resolved.city,
      source: resolved.source,
      rawCity: route?.params?.detectedUserCity || route?.params?.city,
    });

    return resolved.city;
  }, [
    route?.params?.city,
    route?.params?.detectedUserCity,
    route?.params?.detectedLatitude,
    route?.params?.detectedLongitude,
  ]);

  const [city, setCity] = useState(initialCity);
  const [confirmedLocationParams, setConfirmedLocationParams] = useState({});

  useEffect(() => {
    setCity(initialCity);
    setConfirmedLocationParams({});
  }, [initialCity]);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const location = await getCurrentCityFromGps({
          preferCached: true,
          cacheReason: "provider-list-city-check",
          highAccuracy: false,
        });

        if (!active || !location) return;

        const resolved = resolveProviderCity({
          city: location.city,
          latitude: location.latitude,
          longitude: location.longitude,
          fallback: initialCity,
          preferCoordinates: true,
        });

        setConfirmedLocationParams(buildLocationRouteParams(location));

        if (resolved.city && resolved.city !== initialCity) {
          console.log(
            "[FixBee][ProviderList] corrected provider city from GPS",
            {
              previousCity: initialCity,
              nextCity: resolved.city,
              source: location.providerCitySource || location.source,
              streetAddress: location.streetAddress,
            },
          );
          setCity(resolved.city);
        }
      } catch (error) {
        console.log("[FixBee][ProviderList] GPS city check skipped", {
          city: initialCity,
          error: error?.message,
        });
      }
    })();

    return () => {
      active = false;
    };
  }, [initialCity]);

  const category = useMemo(() => {
    if (route?.params?.fromIssue) return DEFAULT_PROVIDER_CATEGORY;
    return normalizeProviderCategory(
      route?.params?.category,
      DEFAULT_PROVIDER_CATEGORY,
    );
  }, [route?.params?.category, route?.params?.fromIssue]);

  const [selectedIds, setSelectedIds] = useState(() =>
    normalizeSelectedIds(route?.params?.selectedProviderIds),
  );

  const { providers, loading, reloadProviders } =
    useBusinessDirectoryProviderList({ city, category });
  const { syncing, syncProviders, syncError } =
    useBusinessDirectoryProviderSync({ city, category, limit: 20 });

  const selectedProviders = useMemo(
    () => providers.filter((provider) => selectedIds.includes(provider.id)),
    [providers, selectedIds],
  );

  const syncAndReload = async ({ force = false } = {}) => {
    console.log("[FixBee][ProviderList] sync requested", {
      city,
      category,
      force,
    });
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
    const incomingIds = normalizeSelectedIds(
      route?.params?.selectedProviderIds,
    );
    if (!incomingIds.length) return;

    setSelectedIds((current) =>
      normalizeSelectedIds([...current, ...incomingIds]),
    );
  }, [route?.params?.selectedProviderIds]);

  const toggleProvider = (providerId) => {
    setSelectedIds((current) => {
      if (current.includes(providerId)) {
        const next = current.filter((id) => id !== providerId);
        console.log("[FixBee][ProviderList] provider unselected", {
          providerId,
          count: next.length,
        });
        return next;
      }

      if (current.length >= MAX_SELECTED_PROVIDERS) {
        Alert.alert(
          "Selection limit",
          `You can select up to ${MAX_SELECTED_PROVIDERS} providers.`,
        );
        return current;
      }

      const next = [...current, providerId];
      console.log("[FixBee][ProviderList] provider selected", {
        providerId,
        count: next.length,
      });
      return next;
    });
  };

  const openProvider = (provider) => {
    navigation.navigate("ProviderDetails", {
      ...route.params,
      ...confirmedLocationParams,
      providerId: provider.id,
      city,
      detectedUserCity: confirmedLocationParams.detectedUserCity || city,
      category,
      selectedProviderIds: selectedIds,
      selectedProviderNames: selectedProviders.map((item) => item.businessName),
    });
  };

  const handleNext = () => {
    if (!selectedProviders.length) {
      Alert.alert(
        "Choose a provider",
        "Select at least one provider before continuing.",
      );
      return;
    }

    console.log("[FixBee][ProviderList] next pressed", {
      selectedCount: selectedProviders.length,
      city,
      category,
    });

    navigation.navigate("ProviderAddressTime", {
      ...route.params,
      ...confirmedLocationParams,
      city,
      detectedUserCity: confirmedLocationParams.detectedUserCity || city,
      category,
      selectedProviderIds: selectedProviders.map((provider) => provider.id),
      selectedProviderNames: selectedProviders.map(
        (provider) => provider.businessName,
      ),
    });
  };

  const initialLoading = (loading || syncing) && providers.length === 0;
  const selectedSummary = selectedIds.length
    ? `Mail to ${selectedIds.length} selected request expert${selectedIds.length > 1 ? "s" : ""}.`
    : "Select up to 10 request experts.";

  return (
    <View style={styles.safe}>
      <AppHeader title="Experts List" onBack={() => navigation.goBack()} />

      <View style={styles.headerBlock}>
        <Text style={styles.title}>Repair Experts</Text>
        <Text style={styles.subtitle}>
          Nearby professionals recommended by FixBee.
        </Text>
        <Text style={styles.countText}>{selectedSummary}</Text>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={syncing}
            onRefresh={() => syncAndReload({ force: true })}
          />
        }
      >
        {initialLoading ? (
          <View style={styles.centerState}>
            <ActivityIndicator />
            <Text style={styles.stateText}>
              Loading providers from SQLite...
            </Text>
          </View>
        ) : null}

        {!initialLoading && providers.length === 0 ? (
          <View style={styles.centerState}>
            <Text style={styles.stateTitle}>No providers found.</Text>
            {syncError ? (
              <Text style={styles.stateText}>{syncError}</Text>
            ) : null}
            <ProviderPlainButton
              title="Try Again"
              onPress={() => syncAndReload({ force: true })}
            />
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

      <View style={[styles.bottomCta, { paddingBottom: bottomButtonSpace }]}>
        <ProviderPlainButton
          title="Next"
          onPress={handleNext}
          disabled={!selectedProviders.length}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerBlock: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 8,
  },
  title: {
    fontFamily: FONT.extraBold,
    color: COLORS.textPrimary,
    fontSize: 19,
    fontWeight: "800",
  },
  subtitle: {
    fontFamily: FONT.regular,
    color: COLORS.providerMidGray,
    fontSize: 12,
    marginTop: 4,
  },
  countText: {
    fontFamily: FONT.semiBold,
    color: COLORS.providerBrown,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 9,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 110,
  },
  centerState: {
    padding: 18,
    alignItems: "center",
  },
  stateTitle: {
    fontFamily: FONT.bold,
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  stateText: {
    fontFamily: FONT.regular,
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  bottomCta: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 22,
    paddingTop: 12,
    backgroundColor: COLORS.honeyCream,
  },
});

export default ProviderListScreen;
