import { DEFAULT_PROVIDER_CITY, SUPPORTED_CITIES } from "./providerConstants";

const cleanText = (value) => String(value || "").trim();

export const normalizeCityKey = (value) =>
  cleanText(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const SUPPORTED_CITY_LOOKUP = SUPPORTED_CITIES.reduce((lookup, city) => {
  lookup[normalizeCityKey(city)] = city;
  lookup[normalizeCityKey(`${city} bc`)] = city;
  lookup[normalizeCityKey(`${city} british columbia`)] = city;
  lookup[normalizeCityKey(`city of ${city}`)] = city;
  return lookup;
}, {});

const CITY_ALIASES = {
  "north van": "North Vancouver",
  "west van": "West Vancouver",
  "new west": "New Westminster",
  "new westminster bc": "New Westminster",
  "richmond bc": "Richmond",
  "vancouver bc": "Vancouver",
  "burnaby bc": "Burnaby",
  "surrey bc": "Surrey",
  "delta bc": "Delta",
};

const CITY_ANCHORS = [
  { city: "Vancouver", latitude: 49.2827, longitude: -123.1207 },
  { city: "Burnaby", latitude: 49.2488, longitude: -122.9805 },
  { city: "Richmond", latitude: 49.1666, longitude: -123.1336 },
  { city: "Surrey", latitude: 49.1913, longitude: -122.849 },
  { city: "North Vancouver", latitude: 49.3193, longitude: -123.0724 },
  { city: "West Vancouver", latitude: 49.3286, longitude: -123.1602 },
  { city: "New Westminster", latitude: 49.2057, longitude: -122.911 },
  { city: "Delta", latitude: 49.0847, longitude: -123.0586 },
];

const toRadians = (degrees) => (degrees * Math.PI) / 180;

const distanceKm = (a, b) => {
  const earthRadiusKm = 6371;
  const dLat = toRadians(b.latitude - a.latitude);
  const dLon = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);

  const value =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
};

export const getSupportedCityFromText = (value) => {
  const key = normalizeCityKey(value);
  if (!key) return null;

  if (SUPPORTED_CITY_LOOKUP[key]) return SUPPORTED_CITY_LOOKUP[key];
  if (CITY_ALIASES[key]) return CITY_ALIASES[key];

  const matchedCity = SUPPORTED_CITIES.find((city) => {
    const cityKey = normalizeCityKey(city);
    return key === cityKey || key.includes(cityKey);
  });

  return matchedCity || null;
};

export const getNearestSupportedCityFromCoords = ({ latitude, longitude } = {}) => {
  const lat = Number(latitude);
  const lon = Number(longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

  const ranked = CITY_ANCHORS.map((anchor) => ({
    ...anchor,
    distanceKm: distanceKm({ latitude: lat, longitude: lon }, anchor),
  })).sort((a, b) => a.distanceKm - b.distanceKm);

  const nearest = ranked[0];

  // Metro Vancouver supported cities are close together. This cap prevents a user
  // far outside our demo data area from being silently mapped to the wrong city.
  if (!nearest || nearest.distanceKm > 55) return null;

  return {
    city: nearest.city,
    distanceKm: Number(nearest.distanceKm.toFixed(2)),
  };
};

export const resolveProviderCity = ({
  city,
  address,
  latitude,
  longitude,
  fallback = DEFAULT_PROVIDER_CITY,
  preferCoordinates = false,
} = {}) => {
  const textCity = getSupportedCityFromText(city);
  const addressCity = getSupportedCityFromText(address);
  const nearest = getNearestSupportedCityFromCoords({ latitude, longitude });

  if (preferCoordinates && nearest?.city) {
    return {
      city: nearest.city,
      source: "coordinates",
      distanceKm: nearest.distanceKm,
      rawCity: cleanText(city),
    };
  }

  if (textCity) {
    return {
      city: textCity,
      source: "reverse-geocode-city",
      rawCity: cleanText(city),
    };
  }

  if (addressCity) {
    return {
      city: addressCity,
      source: "address-text",
      rawCity: cleanText(city),
    };
  }

  if (nearest?.city) {
    return {
      city: nearest.city,
      source: "coordinates",
      distanceKm: nearest.distanceKm,
      rawCity: cleanText(city),
    };
  }

  return {
    city: getSupportedCityFromText(fallback) || DEFAULT_PROVIDER_CITY,
    source: "fallback",
    rawCity: cleanText(city),
  };
};
