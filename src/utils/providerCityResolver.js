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

const CITY_ZONES = [
  {
    city: "Vancouver",
    latitudeMin: 49.198,
    latitudeMax: 49.296,
    longitudeMin: -123.23,
    longitudeMax: -123.02,
  },
  {
    city: "Richmond",
    latitudeMin: 49.09,
    latitudeMax: 49.205,
    longitudeMin: -123.24,
    longitudeMax: -122.94,
  },
  {
    city: "Burnaby",
    latitudeMin: 49.19,
    latitudeMax: 49.3,
    longitudeMin: -123.035,
    longitudeMax: -122.86,
  },
  {
    city: "New Westminster",
    latitudeMin: 49.17,
    latitudeMax: 49.235,
    longitudeMin: -122.97,
    longitudeMax: -122.86,
  },
  {
    city: "North Vancouver",
    latitudeMin: 49.295,
    latitudeMax: 49.38,
    longitudeMin: -123.16,
    longitudeMax: -122.93,
  },
  {
    city: "West Vancouver",
    latitudeMin: 49.31,
    latitudeMax: 49.39,
    longitudeMin: -123.29,
    longitudeMax: -123.12,
  },
  {
    city: "Surrey",
    latitudeMin: 49.02,
    latitudeMax: 49.23,
    longitudeMin: -122.91,
    longitudeMax: -122.66,
  },
  {
    city: "Delta",
    latitudeMin: 49.0,
    latitudeMax: 49.2,
    longitudeMin: -123.12,
    longitudeMax: -122.87,
  },
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

export const getSupportedCityFromCoordinateZone = ({ latitude, longitude } = {}) => {
  const lat = Number(latitude);
  const lon = Number(longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

  const zone = CITY_ZONES.find(
    (item) =>
      lat >= item.latitudeMin &&
      lat <= item.latitudeMax &&
      lon >= item.longitudeMin &&
      lon <= item.longitudeMax,
  );

  return zone
    ? {
        city: zone.city,
        latitude: lat,
        longitude: lon,
      }
    : null;
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
  const zoneCity = getSupportedCityFromCoordinateZone({ latitude, longitude });
  const nearest = getNearestSupportedCityFromCoords({ latitude, longitude });

  if (preferCoordinates && zoneCity?.city) {
    return {
      city: zoneCity.city,
      source: "coordinate-zone",
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

  if (zoneCity?.city) {
    return {
      city: zoneCity.city,
      source: "coordinate-zone",
      rawCity: cleanText(city),
    };
  }

  if (preferCoordinates && nearest?.city) {
    return {
      city: nearest.city,
      source: "coordinates",
      distanceKm: nearest.distanceKm,
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
