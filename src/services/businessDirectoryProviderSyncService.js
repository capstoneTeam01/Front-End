import { PROVIDER_CACHE_STALE_MINUTES } from "../constants/config";
import { fetchBusinessDirectoryProviders } from "../api/businessDirectoryProviderApi";
import {
  getProviderSyncMeta,
  isProviderCacheFresh,
  loadProvidersByCity,
  replaceProvidersForCity,
} from "../localDb/businessDirectoryProviderLocalDb";
import { DEMO_PROVIDERS, DEFAULT_PROVIDER_LIMIT } from "../utils/providerConstants";
import { normalizeProviderCategory } from "../utils/issueProviderRouteMapper";
import { resolveProviderCity } from "../utils/providerCityResolver";

const getCityBreakdown = (providers = []) =>
  providers.reduce((summary, provider) => {
    const key = provider.city || provider.searchCity || "Unknown";
    summary[key] = (summary[key] || 0) + 1;
    return summary;
  }, {});

const providersForDemoCity = (city) => {
  const sameCity = DEMO_PROVIDERS.filter(
    (provider) => String(provider.city).toLowerCase() === String(city).toLowerCase()
  );

  const nearby = DEMO_PROVIDERS.filter(
    (provider) => String(provider.city).toLowerCase() !== String(city).toLowerCase()
  );

  return [...sameCity, ...nearby];
};

export const syncProvidersForCity = async ({
  city,
  category = "plumber",
  limit = DEFAULT_PROVIDER_LIMIT,
  force = false,
  staleMinutes = PROVIDER_CACHE_STALE_MINUTES,
  allowDemoFallback = true,
} = {}) => {
  const cleanCategory = normalizeProviderCategory(category);
  const resolvedCity = resolveProviderCity({ city }).city;
  console.log("[FixBee][ProviderSync] start", { city: resolvedCity, rawCity: city, category: cleanCategory, limit, force });
  const cachedProviders = await loadProvidersByCity({ city: resolvedCity, category: cleanCategory });
  console.log("[FixBee][ProviderSync] local cache checked", { city: resolvedCity, category: cleanCategory, cachedCount: cachedProviders.length });

  if (!force && cachedProviders.length > 0) {
    const fresh = await isProviderCacheFresh({ city: resolvedCity, category: cleanCategory, staleMinutes });
    const meta = await getProviderSyncMeta({ city: resolvedCity, category: cleanCategory });

    if (fresh) {
      console.log("[FixBee][ProviderSync] using fresh local cache", { city: resolvedCity, category: cleanCategory, lastSyncedAt: meta?.lastSyncedAt });
      return {
        ok: true,
        source: "cache-fresh",
        skipped: true,
        message: `Using recent local providers. Last synced ${meta?.lastSyncedAt || "recently"}.`,
        syncedAt: meta?.lastSyncedAt,
      };
    }
  }

  try {
    const response = await fetchBusinessDirectoryProviders({ city: resolvedCity, category: cleanCategory, limit });
    console.log("[FixBee][ProviderSync] backend response received", {
      city: resolvedCity,
      responseCity: response.city,
      category: cleanCategory,
      count: response.providers?.length || 0,
      cityBreakdown: getCityBreakdown(response.providers || []),
      syncedAt: response.syncedAt,
    });

    await replaceProvidersForCity({
      city: resolvedCity,
      category: cleanCategory,
      providers: response.providers,
      syncedAt: response.syncedAt,
      source: "api",
    });

    return {
      ok: true,
      source: "api",
      skipped: false,
      message: `Synced ${response.providers.length} providers from backend.`,
      syncedAt: response.syncedAt,
    };
  } catch (error) {
    console.log("[FixBee][ProviderSync] backend sync failed", { city: resolvedCity, category: cleanCategory, error: error.message });
    if (cachedProviders.length > 0) {
      return {
        ok: true,
        source: "cache",
        skipped: true,
        message: "Backend was not reachable, so cached providers were used.",
        error: error.message,
      };
    }

    if (!allowDemoFallback) {
      throw error;
    }

    const demoProviders = providersForDemoCity(resolvedCity).slice(0, limit);
    console.log("[FixBee][ProviderSync] saving demo providers because backend was unavailable", { city: resolvedCity, count: demoProviders.length });
    const syncedAt = new Date().toISOString();

    await replaceProvidersForCity({
      city: resolvedCity,
      category: cleanCategory,
      providers: demoProviders,
      syncedAt,
      source: "demo",
    });

    return {
      ok: true,
      source: "demo",
      skipped: false,
      message:
        "Backend was not reachable, so demo providers were saved into SQLite for a smooth presentation.",
      error: error.message,
      syncedAt,
    };
  }
};
