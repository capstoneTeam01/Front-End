const valueOrNull = (value) => {
  if (value === undefined || value === null || value === "") return null;
  return value;
};

const toNumberOrNull = (value) => {
  if (value === undefined || value === null || value === "") return null;
  const number = Number(value);
  return Number.isNaN(number) ? null : number;
};

const normalizeWebsite = (url) => {
  if (!url) return null;
  const clean = String(url).trim();
  if (!clean) return null;
  if (clean.startsWith("http://") || clean.startsWith("https://")) return clean;
  return `https://${clean}`;
};

const getLatitude = (provider = {}) =>
  toNumberOrNull(
    provider.latitude ??
      provider.lat ??
      provider.coordinates?.latitude ??
      provider.location?.latitude ??
      provider.location?.lat
  );

const getLongitude = (provider = {}) =>
  toNumberOrNull(
    provider.longitude ??
      provider.lng ??
      provider.coordinates?.longitude ??
      provider.location?.longitude ??
      provider.location?.lng
  );

export const mapApiProviderToLocalProvider = (provider = {}, request = {}) => {
  const sourceId = String(
    provider.id || provider.mongoId || provider.providerId || provider.sourceProviderId || provider.businessName || Date.now()
  );
  const cachePrefix = request.cacheKey ? String(request.cacheKey) : "";
  const id = cachePrefix ? `${cachePrefix}:${sourceId}` : sourceId;

  return {
    id,
    mongoId: valueOrNull(provider.mongoId || provider.id),
    providerId: valueOrNull(provider.providerId || provider.sourceProviderId || provider.sourceId || sourceId),
    category: request.category || provider.providerType || provider.primaryCategory || "plumber",
    categoryKey: request.categoryKey || null,
    requestCity: request.city || provider.searchCity || provider.city || "Vancouver",
    requestCityKey: request.cityKey || null,
    businessName: provider.businessName || provider.name || "Unknown Provider",
    businessDescription: valueOrNull(provider.businessDescription || provider.description),
    providerType: valueOrNull(provider.providerType || provider.primaryCategory),
    primaryCategory: valueOrNull(provider.primaryCategory || provider.providerType),
    phoneDisplay: valueOrNull(provider.phoneDisplay || provider.phone || provider.displayPhone),
    phoneNormalized: valueOrNull(provider.phoneNormalized || provider.phoneNumber),
    email: valueOrNull(provider.email),
    address: valueOrNull(provider.address || provider.serviceLocation || provider.formattedAddress),
    city: valueOrNull(provider.city || provider.searchCity || request.city),
    province: valueOrNull(provider.province || provider.provinceCode || "BC"),
    rating: toNumberOrNull(provider.rating),
    reviewCount: toNumberOrNull(provider.reviewCount || provider.reviewsCount || provider.userRatingCount),
    websiteUrl: normalizeWebsite(provider.websiteUrl || provider.directWebsiteUrl || provider.website),
    listingUrl: normalizeWebsite(provider.listingUrl || provider.sourceUrl),
    imageUrl: valueOrNull(provider.imageUrl),
    latitude: getLatitude(provider),
    longitude: getLongitude(provider),
    sourceNames: Array.isArray(provider.sourceNames)
      ? provider.sourceNames.join(", ")
      : valueOrNull(provider.sourceNames || provider.sourceWebsite || provider.source),
    rawJson: JSON.stringify(provider),
    syncedAt: request.syncedAt || new Date().toISOString(),
  };
};

export const mapLocalRowToProvider = (row = {}) => ({
  id: row.id,
  mongoId: row.mongoId,
  providerId: row.providerId,
  category: row.category,
  categoryKey: row.categoryKey,
  requestCity: row.requestCity,
  requestCityKey: row.requestCityKey,
  businessName: row.businessName,
  businessDescription: row.businessDescription,
  providerType: row.providerType,
  primaryCategory: row.primaryCategory,
  phoneDisplay: row.phoneDisplay,
  phoneNormalized: row.phoneNormalized,
  email: row.email,
  address: row.address,
  city: row.city,
  province: row.province,
  rating: toNumberOrNull(row.rating),
  reviewCount: toNumberOrNull(row.reviewCount),
  websiteUrl: row.websiteUrl,
  listingUrl: row.listingUrl,
  imageUrl: row.imageUrl,
  latitude: toNumberOrNull(row.latitude),
  longitude: toNumberOrNull(row.longitude),
  sourceNames: row.sourceNames,
  rawJson: row.rawJson,
  syncedAt: row.syncedAt,
});

export const getProviderInitial = (provider = {}) =>
  String(provider.businessName || "?").trim().charAt(0).toUpperCase() || "?";

export const getProviderSubtitle = (provider = {}) => {
  const city = provider.city || provider.requestCity;
  const province = provider.province;
  if (city && province) return `${city}, ${province}`;
  return city || provider.address || "Metro Vancouver";
};
