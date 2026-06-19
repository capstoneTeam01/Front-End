import { Platform } from "react-native";
import * as Location from "expo-location";
import { resolveProviderCity } from "./providerCityResolver";

const clean = (value) => String(value || "").trim();

const LOCATION_TIMEOUT_MS = 9000;
const LOCATION_CACHE_MAX_AGE_MS = 10 * 60 * 1000;
const LOCATION_STABILITY_DISTANCE_KM = 0.25;
const DEFAULT_REGION = "BC";
const DEFAULT_CITY = "Vancouver";

let cachedLocationInfo = null;
let inflightLocationPromise = null;

const withTimeout = (promise, timeoutMs, timeoutMessage) => {
  let timer;

  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
    }),
  ]).finally(() => clearTimeout(timer));
};

const toRadians = (degrees) => (degrees * Math.PI) / 180;

const distanceKm = (a = {}, b = {}) => {
  const latA = Number(a.latitude);
  const lonA = Number(a.longitude);
  const latB = Number(b.latitude);
  const lonB = Number(b.longitude);

  if (![latA, lonA, latB, lonB].every(Number.isFinite)) return Infinity;

  const earthRadiusKm = 6371;
  const dLat = toRadians(latB - latA);
  const dLon = toRadians(lonB - lonA);
  const lat1 = toRadians(latA);
  const lat2 = toRadians(latB);

  const value =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
};

const isFreshCachedLocation = (location = cachedLocationInfo, maxAgeMs = LOCATION_CACHE_MAX_AGE_MS) => {
  if (!location?.latitude || !location?.longitude || !location?.cachedAt) return false;
  return Date.now() - location.cachedAt <= maxAgeMs;
};

const looksLikeTransitOrDirectionalRoad = (value) => {
  const text = clean(value);
  if (!text) return false;

  // Android reverse geocoding may return labels like "NB Jacombs Rd" or
  // "SB Fraser St". Those are bus-stop/direction labels, not clean service
  // addresses, so they should not replace a better cached street address.
  return /^(NB|SB|EB|WB)\s+/i.test(text) || /\b(stop|station|bay)\b/i.test(text);
};

const addressQualityScore = (value) => {
  const text = clean(value);
  if (!text) return 0;
  if (looksLikeTransitOrDirectionalRoad(text)) return 1;
  if (/^\d+\s+/.test(text)) return 4;
  if (/\b(street|st\.?|road|rd\.?|avenue|ave\.?|drive|dr\.?|way|crescent|cres\.?|lane|ln\.?)\b/i.test(text)) return 3;
  return 2;
};

const streetCandidateQualityScore = (value) => {
  const text = clean(value);
  if (!text || looksLikeTransitOrDirectionalRoad(text)) return 0;
  if (/^\d+\s+/.test(text)) return 4;
  if (/\b(street|st\.?|road|rd\.?|avenue|ave\.?|drive|dr\.?|way|crescent|cres\.?|lane|ln\.?)\b/i.test(text)) return 3;
  return 0;
};

const getFormattedAddressFirstLine = (place = {}) => {
  const formattedAddress = clean(place.formattedAddress);
  if (!formattedAddress) return "";
  return clean(formattedAddress.split(",")[0]);
};

const pickBestStreetCandidate = (candidates = []) => {
  const ranked = candidates
    .map((candidate, index) => ({
      value: clean(candidate),
      score: streetCandidateQualityScore(candidate),
      index,
    }))
    .filter((candidate) => candidate.value && candidate.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // Prefer shorter street lines over long labels when quality is the same.
      if (a.value.length !== b.value.length) return a.value.length - b.value.length;
      return a.index - b.index;
    });

  return ranked[0]?.value || "";
};

const buildStreetLine = (place = {}) => {
  const name = clean(place.name);
  const street = clean(place.street);
  const streetNumber = clean(place.streetNumber);
  const formattedFirstLine = getFormattedAddressFirstLine(place);
  const combinedStreet = streetNumber && street && !looksLikeTransitOrDirectionalRoad(street)
    ? `${streetNumber} ${street}`
    : "";

  // Do not use generic POI names or transit labels as the service address.
  // Android sometimes returns labels like "NB Jacombs Rd" or nearby business names;
  // this picks the strongest street-address candidate and keeps the result stable.
  return pickBestStreetCandidate([
    combinedStreet,
    formattedFirstLine,
    street,
    name,
  ]);
};

const buildCoordinateLabel = (coords = {}) => {
  const latitude = Number(coords.latitude);
  const longitude = Number(coords.longitude);

  if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
    return `Current location (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`;
  }

  return "Current location";
};

const getLastKnownPosition = async (options = {}) => {
  try {
    return await Location.getLastKnownPositionAsync(options);
  } catch (error) {
    console.log("[FixBee][Location] last known position unavailable", error?.message);
    return null;
  }
};

const getWatchedPositionOnce = async (accuracy = Location.Accuracy.Balanced) => {
  let subscription;
  let timer;

  return new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      if (subscription?.remove) subscription.remove();
      reject(new Error("Location watch did not return coordinates quickly enough."));
    }, LOCATION_TIMEOUT_MS);

    Location.watchPositionAsync(
      {
        accuracy,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (position) => {
        clearTimeout(timer);
        if (subscription?.remove) subscription.remove();
        resolve(position);
      }
    )
      .then((createdSubscription) => {
        subscription = createdSubscription;
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
};

const requestLocationPermission = async ({ allowPrompt = true } = {}) => {
  if (!allowPrompt) {
    const existingPermission = await Location.getForegroundPermissionsAsync();

    if (existingPermission.status !== "granted") {
      throw new Error("Location permission is not granted yet. Skipping silent GPS prefetch.");
    }

    return;
  }

  const permission = await Location.requestForegroundPermissionsAsync();

  if (permission.status !== "granted") {
    throw new Error("Location permission was not granted. Open app settings and allow location while using the app.");
  }
};

const ensureLocationServicesBestEffort = async () => {
  const servicesEnabled = await Location.hasServicesEnabledAsync().catch(() => false);
  if (servicesEnabled) return;

  console.log("[FixBee][Location] location services appear disabled");

  // Android sometimes needs the network provider enabled separately in the emulator.
  // This opens the native prompt when Android allows it, but we keep going because
  // the emulator may still provide a cached point after Set Location is pressed.
  if (Platform.OS === "android" && Location.enableNetworkProviderAsync) {
    try {
      await Location.enableNetworkProviderAsync();
      console.log("[FixBee][Location] Android network provider prompt completed");
    } catch (error) {
      console.log("[FixBee][Location] Android network provider prompt skipped", error?.message);
    }
  }
};

const getBestAvailablePosition = async ({ accuracy = Location.Accuracy.Balanced } = {}) => {
  const attempts = [
    {
      source: accuracy === Location.Accuracy.High ? "current-high" : "current-balanced",
      read: () =>
        withTimeout(
          Location.getCurrentPositionAsync({ accuracy }),
          LOCATION_TIMEOUT_MS,
          "GPS did not respond quickly enough."
        ),
    },
    {
      source: "last-known-recent",
      read: () =>
        getLastKnownPosition({
          maxAge: 15 * 60 * 1000,
          requiredAccuracy: 10000,
        }),
    },
    {
      source: "watch-once",
      read: () => getWatchedPositionOnce(accuracy),
    },
    {
      source: "last-known-any",
      read: () => getLastKnownPosition({}),
    },
  ];

  let lastError;

  for (const attempt of attempts) {
    try {
      const position = await attempt.read();
      if (position?.coords?.latitude && position?.coords?.longitude) {
        return { position, source: attempt.source };
      }
    } catch (error) {
      lastError = error;
      console.log(`[FixBee][Location] ${attempt.source} failed`, error?.message);
    }
  }

  throw new Error(
    lastError?.message ||
      "Could not read GPS location. In the Android emulator, open Extended Controls > Location, select a point, press Set Location, then try again."
  );
};

const reverseGeocodeBestEffort = async ({ latitude, longitude }) => {
  try {
    const places = await withTimeout(
      Location.reverseGeocodeAsync({ latitude, longitude }),
      LOCATION_TIMEOUT_MS,
      "Reverse geocoding did not respond quickly enough."
    );

    return Array.isArray(places) ? places.filter(Boolean) : [];
  } catch (error) {
    console.log("[FixBee][Location] reverse geocode failed", error?.message);
    return [];
  }
};

const buildOpenStreetMapFormattedAddress = (data = {}, coords = {}) => {
  const address = data.address || {};
  const houseNumber = clean(address.house_number);
  const road = clean(
    address.road ||
      address.pedestrian ||
      address.footway ||
      address.residential ||
      address.path ||
      address.cycleway
  );
  const streetAddress = houseNumber && road ? `${houseNumber} ${road}` : road;

  if (!streetAddress || looksLikeTransitOrDirectionalRoad(streetAddress)) return null;

  const city = clean(
    address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.county ||
      address.suburb
  ) || DEFAULT_CITY;
  const region = clean(address.state || address.region || address.province) || DEFAULT_REGION;
  const postalCode = clean(address.postcode);
  const coordinateLabel = buildCoordinateLabel(coords);
  const labelParts = [streetAddress, city, region, postalCode].filter(Boolean);

  return {
    city,
    region,
    postalCode,
    streetAddress,
    label: labelParts.length ? labelParts.join(", ") : clean(data.display_name) || coordinateLabel,
    addressSource: houseNumber ? "openstreetmap-house-number" : "openstreetmap-road",
  };
};

const reverseGeocodeWithOpenStreetMapBestEffort = async ({ latitude, longitude }) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&zoom=18&lat=${encodeURIComponent(
      latitude
    )}&lon=${encodeURIComponent(longitude)}`;

    const response = await withTimeout(
      fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "FixBee-WMDD-4985-Capstone/1.0",
        },
      }),
      LOCATION_TIMEOUT_MS,
      "OpenStreetMap reverse geocoding did not respond quickly enough."
    );

    if (!response?.ok) {
      throw new Error(`OpenStreetMap reverse geocode failed with status ${response?.status}`);
    }

    const data = await response.json();
    const formatted = buildOpenStreetMapFormattedAddress(data, { latitude, longitude });

    console.log("[FixBee][Location] OpenStreetMap reverse geocode result", {
      streetAddress: formatted?.streetAddress,
      city: formatted?.city,
      addressSource: formatted?.addressSource,
      hasAddress: Boolean(formatted),
    });

    return formatted;
  } catch (error) {
    console.log("[FixBee][Location] OpenStreetMap reverse geocode failed", error?.message);
    return null;
  }
};

const normalizeCity = (place = {}) =>
  clean(place.city || place.subregion || place.district || place.name) || DEFAULT_CITY;

const normalizeRegion = (place = {}) => clean(place.region || place.isoRegion) || DEFAULT_REGION;

const buildAddressLabel = ({ place, coords }) => {
  const streetLine = buildStreetLine(place);
  const city = normalizeCity(place);
  const region = normalizeRegion(place);
  const postalCode = clean(place.postalCode);
  const coordinateLabel = buildCoordinateLabel(coords);
  const formattedAddress = clean(place.formattedAddress);

  const labelParts = [streetLine, city, region, postalCode].filter(Boolean);
  const safeFormattedAddress = formattedAddress && !looksLikeTransitOrDirectionalRoad(getFormattedAddressFirstLine(place))
    ? formattedAddress
    : "";
  const label = safeFormattedAddress || (labelParts.length ? labelParts.join(", ") : coordinateLabel);

  // Keep Street address as a real street line only.
  // Before this, city-level labels like "Richmond, British Columbia, V6V 1Y6"
  // were being inserted into the street address field, which looked inaccurate.
  const streetAddress = streetLine;

  return {
    city,
    region,
    postalCode,
    streetAddress,
    label,
    addressSource: streetLine ? "street-candidate" : safeFormattedAddress ? "formatted-address" : "fallback-label",
  };
};

const pickBestReverseGeocodeResult = ({ places = [], coords = {} }) => {
  const fallbackFormatted = buildAddressLabel({ place: {}, coords });

  if (!places.length) {
    return { place: {}, formatted: fallbackFormatted, placeIndex: -1 };
  }

  const ranked = places
    .map((place, index) => {
      const formatted = buildAddressLabel({ place, coords });
      const score = addressQualityScore(formatted.streetAddress || formatted.label);

      return {
        place,
        formatted,
        score,
        placeIndex: index,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // When quality is tied, prefer the first result Expo returned.
      return a.placeIndex - b.placeIndex;
    });

  return ranked[0] || { place: {}, formatted: fallbackFormatted, placeIndex: -1 };
};

const stabilizeLocationInfo = (nextLocation) => {
  const previous = isFreshCachedLocation() ? cachedLocationInfo : null;
  if (!previous) return nextLocation;

  const movedKm = distanceKm(previous, nextLocation);
  if (movedKm > LOCATION_STABILITY_DISTANCE_KM) return nextLocation;

  const previousScore = addressQualityScore(previous.streetAddress || previous.label);
  const nextScore = addressQualityScore(nextLocation.streetAddress || nextLocation.label);

  if (previousScore > nextScore) {
    console.log("[FixBee][Location] keeping cleaner cached address label for nearby GPS point", {
      previousAddress: previous.streetAddress,
      nextAddress: nextLocation.streetAddress,
      movedKm: Number(movedKm.toFixed(3)),
    });

    return {
      ...nextLocation,
      streetAddress: previous.streetAddress || nextLocation.streetAddress,
      label: previous.label || nextLocation.label,
      city: previous.city || nextLocation.city,
      rawCity: previous.rawCity || nextLocation.rawCity,
      stabilizedFromCache: true,
      stabilizedReason: "kept-better-address-label",
    };
  }

  return nextLocation;
};

const saveLocationToSessionCache = (locationInfo, reason = "gps-read") => {
  if (!locationInfo?.latitude || !locationInfo?.longitude) return locationInfo;

  cachedLocationInfo = {
    ...stabilizeLocationInfo(locationInfo),
    cachedAt: Date.now(),
    cacheReason: reason,
  };

  console.log("[FixBee][Location] session location cached", {
    reason,
    city: cachedLocationInfo.city,
    streetAddress: cachedLocationInfo.streetAddress,
    source: cachedLocationInfo.source,
    providerCitySource: cachedLocationInfo.providerCitySource,
  });

  return cachedLocationInfo;
};

const readFreshLocation = async ({ cacheReason = "gps-read", allowPermissionPrompt = true, highAccuracy = false } = {}) => {
  await requestLocationPermission({ allowPrompt: allowPermissionPrompt });
  await ensureLocationServicesBestEffort();

  const { position, source } = await getBestAvailablePosition({
    accuracy: highAccuracy ? Location.Accuracy.High : Location.Accuracy.Balanced,
  });
  const { latitude, longitude } = position.coords;

  console.log("[FixBee][Location] GPS coordinates received", {
    latitude,
    longitude,
    source,
  });

  const reverseGeocodePlaces = await reverseGeocodeBestEffort({ latitude, longitude });
  const expoReverseGeocodeResult = pickBestReverseGeocodeResult({
    places: reverseGeocodePlaces,
    coords: position.coords,
  });
  const openStreetMapFormatted = await reverseGeocodeWithOpenStreetMapBestEffort({ latitude, longitude });
  const expoScore = addressQualityScore(expoReverseGeocodeResult.formatted?.streetAddress);
  const osmScore = addressQualityScore(openStreetMapFormatted?.streetAddress);
  const shouldUseOpenStreetMapAddress = openStreetMapFormatted && osmScore > expoScore;
  const bestPlace = expoReverseGeocodeResult.place;
  const formatted = shouldUseOpenStreetMapAddress
    ? openStreetMapFormatted
    : expoReverseGeocodeResult.formatted;
  const placeIndex = expoReverseGeocodeResult.placeIndex;

  if (shouldUseOpenStreetMapAddress) {
    console.log("[FixBee][Location] using OpenStreetMap street address", {
      streetAddress: formatted.streetAddress,
      expoStreetAddress: expoReverseGeocodeResult.formatted?.streetAddress,
      expoLabel: expoReverseGeocodeResult.formatted?.label,
    });
  }

  const providerCity = resolveProviderCity({
    city: formatted.city,
    address: formatted.label,
    latitude,
    longitude,
    fallback: DEFAULT_CITY,
    preferCoordinates: true,
  });

  const locationInfo = {
    ...formatted,
    city: providerCity.city,
    rawCity: formatted.city,
    providerCitySource: providerCity.source,
    providerCityDistanceKm: providerCity.distanceKm,
    latitude,
    longitude,
    source,
    rawPlace: bestPlace,
    reverseGeocodeCandidateCount: reverseGeocodePlaces.length,
    reverseGeocodeCandidateIndex: placeIndex,
  };

  console.log("[FixBee][Location] reverse geocode formatted", {
    streetAddress: locationInfo.streetAddress,
    label: locationInfo.label,
    rawCity: locationInfo.rawCity,
    providerCity: locationInfo.city,
    providerCitySource: locationInfo.providerCitySource,
    providerCityDistanceKm: locationInfo.providerCityDistanceKm,
    region: locationInfo.region,
    addressSource: locationInfo.addressSource,
    rawName: bestPlace?.name,
    rawStreet: bestPlace?.street,
    rawStreetNumber: bestPlace?.streetNumber,
    rawFormattedAddress: bestPlace?.formattedAddress,
    reverseGeocodeCandidateCount: reverseGeocodePlaces.length,
    reverseGeocodeCandidateIndex: placeIndex,
    hasRawPlace: Object.keys(bestPlace || {}).length > 0,
  });

  return saveLocationToSessionCache(locationInfo, cacheReason);
};

export const getCachedGpsLocation = ({ maxAgeMs = LOCATION_CACHE_MAX_AGE_MS } = {}) => {
  if (!isFreshCachedLocation(cachedLocationInfo, maxAgeMs)) return null;
  return cachedLocationInfo;
};

export const prefetchCurrentLocation = ({ reason = "prefetch", allowPermissionPrompt = false } = {}) => {
  const cached = getCachedGpsLocation();
  if (cached) {
    console.log("[FixBee][Location] prefetch using existing session cache", {
      reason,
      city: cached.city,
      streetAddress: cached.streetAddress,
    });
    return Promise.resolve(cached);
  }

  if (inflightLocationPromise) {
    console.log("[FixBee][Location] prefetch joined existing GPS request", { reason });
    return inflightLocationPromise;
  }

  console.log("[FixBee][Location] prefetch started", {
    reason,
    allowPermissionPrompt,
  });
  inflightLocationPromise = readFreshLocation({
    cacheReason: reason,
    allowPermissionPrompt,
    highAccuracy: false,
  })
    .catch((error) => {
      console.log("[FixBee][Location] prefetch failed", { reason, error: error?.message });
      return null;
    })
    .finally(() => {
      inflightLocationPromise = null;
    });

  return inflightLocationPromise;
};

export const getCurrentCityFromGps = async ({
  preferCached = false,
  forceRefresh = false,
  allowCachedOnFailure = true,
  cacheReason = "manual-location-request",
  highAccuracy = true,
  requireStreetAddress = false,
} = {}) => {
  const cached = getCachedGpsLocation();
  const cachedHasStreetAddress = Boolean(clean(cached?.streetAddress));

  if (!forceRefresh && preferCached && cached && (!requireStreetAddress || cachedHasStreetAddress)) {
    console.log("[FixBee][Location] using cached session location", {
      city: cached.city,
      streetAddress: cached.streetAddress,
      cacheReason: cached.cacheReason,
    });
    return cached;
  }

  if (!forceRefresh && preferCached && cached && requireStreetAddress && !cachedHasStreetAddress) {
    console.log("[FixBee][Location] cached city found but street address missing; refreshing GPS", {
      city: cached.city,
      label: cached.label,
      cacheReason: cached.cacheReason,
    });
  }

  if (!forceRefresh && inflightLocationPromise) {
    console.log("[FixBee][Location] awaiting in-flight GPS request", { cacheReason });
    const location = await inflightLocationPromise;
    if (location && (!requireStreetAddress || clean(location.streetAddress))) return location;
  }

  try {
    return await readFreshLocation({ cacheReason, highAccuracy });
  } catch (error) {
    const fallbackCached = getCachedGpsLocation({ maxAgeMs: 30 * 60 * 1000 });
    const fallbackHasStreetAddress = Boolean(clean(fallbackCached?.streetAddress));
    if (allowCachedOnFailure && fallbackCached && (!requireStreetAddress || fallbackHasStreetAddress)) {
      console.log("[FixBee][Location] fresh GPS failed; using cached location fallback", {
        error: error?.message,
        city: fallbackCached.city,
        streetAddress: fallbackCached.streetAddress,
      });
      return fallbackCached;
    }

    throw error;
  }
};

export const buildLocationRouteParams = (location = {}) => ({
  detectedUserCity: location?.city || null,
  detectedRawCity: location?.rawCity || null,
  detectedLocationLabel: location?.label || null,
  detectedStreetAddress: location?.streetAddress || null,
  detectedLatitude: location?.latitude || null,
  detectedLongitude: location?.longitude || null,
  detectedLocationSource: location?.source || location?.providerCitySource || null,
});
