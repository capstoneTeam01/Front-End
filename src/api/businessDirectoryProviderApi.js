import { apiGet } from "./apiClient";
import {
  DEFAULT_PROVIDER_CATEGORY,
  DEFAULT_PROVIDER_CITY,
  DEFAULT_PROVIDER_LIMIT,
} from "../utils/providerConstants";
import { normalizeProviderCategory } from "../utils/issueProviderRouteMapper";
import { resolveProviderCity } from "../utils/providerCityResolver";

const buildProviderSyncPath = ({
  city = DEFAULT_PROVIDER_CITY,
  category = DEFAULT_PROVIDER_CATEGORY,
  limit = DEFAULT_PROVIDER_LIMIT,
} = {}) => {
  const cleanCategory = normalizeProviderCategory(category, DEFAULT_PROVIDER_CATEGORY);
  const cleanCity = resolveProviderCity({ city, fallback: DEFAULT_PROVIDER_CITY }).city;
  const params = `category=${encodeURIComponent(cleanCategory)}&city=${encodeURIComponent(cleanCity)}&limit=${encodeURIComponent(String(limit))}`;
  return `/api/business-directory/providers/sync?${params}`;
};

export const fetchBusinessDirectoryProviders = async ({
  city = DEFAULT_PROVIDER_CITY,
  category = DEFAULT_PROVIDER_CATEGORY,
  limit = DEFAULT_PROVIDER_LIMIT,
} = {}) => {
  const path = buildProviderSyncPath({ city, category, limit });
  const data = await apiGet(path);

  if (!data?.ok || !Array.isArray(data?.providers)) {
    throw new Error(data?.message || "Provider sync response was not valid");
  }

  return {
    ...data,
    providers: Array.isArray(data.providers) ? data.providers : [],
    requestedPath: path,
  };
};
