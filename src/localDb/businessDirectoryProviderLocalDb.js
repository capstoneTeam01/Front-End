import * as SQLite from "expo-sqlite";

import {
  DEFAULT_PROVIDER_CATEGORY,
  DEFAULT_PROVIDER_CITY,
  PROVIDER_DB_NAME,
} from "../utils/providerConstants";
import { mapApiProviderToLocalProvider, mapLocalRowToProvider } from "../utils/providerMapper";
import { normalizeCityKey, resolveProviderCity } from "../utils/providerCityResolver";
import { normalizeProviderCategory } from "../utils/issueProviderRouteMapper";

let dbPromise = null;

const normalizeCacheKey = (value) => normalizeCityKey(value);
const getCityKey = (city) => normalizeCacheKey(resolveProviderCity({ city, fallback: DEFAULT_PROVIDER_CITY }).city);
const getCategoryKey = (category = DEFAULT_PROVIDER_CATEGORY) =>
  normalizeCacheKey(normalizeProviderCategory(category, DEFAULT_PROVIDER_CATEGORY));

const getDb = async () => {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(PROVIDER_DB_NAME);
  }
  return dbPromise;
};

const tableHasColumn = async (db, tableName, columnName) => {
  const columns = await db.getAllAsync(`PRAGMA table_info(${tableName})`);
  return columns.some((column) => column.name === columnName);
};

const addColumnIfMissing = async (db, tableName, columnName, definition) => {
  const exists = await tableHasColumn(db, tableName, columnName);
  if (exists) return;

  console.log("[FixBee][ProviderSQLite] adding missing column", { tableName, columnName });
  await db.execAsync(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`);
};

const backfillProviderKeys = async (db) => {
  const rows = await db.getAllAsync(
    `SELECT id, requestCity, category, requestCityKey, categoryKey
     FROM business_directory_providers
     WHERE requestCityKey IS NULL OR requestCityKey = '' OR categoryKey IS NULL OR categoryKey = ''`
  );

  for (const row of rows) {
    await db.runAsync(
      `UPDATE business_directory_providers
       SET requestCityKey = ?, categoryKey = ?
       WHERE id = ?`,
      [getCityKey(row.requestCity), getCategoryKey(row.category), row.id]
    );
  }

  if (rows.length) {
    console.log("[FixBee][ProviderSQLite] backfilled provider cache keys", { count: rows.length });
  }
};

const backfillMetaKeys = async (db) => {
  const rows = await db.getAllAsync(
    `SELECT cacheKey, city, category, cityKey, categoryKey
     FROM business_directory_provider_sync_meta
     WHERE cityKey IS NULL OR cityKey = '' OR categoryKey IS NULL OR categoryKey = ''`
  );

  for (const row of rows) {
    const cityKey = getCityKey(row.city);
    const categoryKey = getCategoryKey(row.category);
    await db.runAsync(
      `UPDATE business_directory_provider_sync_meta
       SET cityKey = ?, categoryKey = ?
       WHERE cacheKey = ?`,
      [cityKey, categoryKey, row.cacheKey]
    );
  }

  if (rows.length) {
    console.log("[FixBee][ProviderSQLite] backfilled sync meta cache keys", { count: rows.length });
  }
};

export const initBusinessDirectoryProviderDb = async () => {
  const db = await getDb();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS business_directory_providers (
      id TEXT PRIMARY KEY NOT NULL,
      mongoId TEXT,
      providerId TEXT,
      category TEXT,
      categoryKey TEXT,
      requestCity TEXT,
      requestCityKey TEXT,
      businessName TEXT,
      businessDescription TEXT,
      providerType TEXT,
      primaryCategory TEXT,
      phoneDisplay TEXT,
      phoneNormalized TEXT,
      email TEXT,
      address TEXT,
      city TEXT,
      province TEXT,
      rating REAL,
      reviewCount INTEGER,
      websiteUrl TEXT,
      listingUrl TEXT,
      imageUrl TEXT,
      latitude REAL,
      longitude REAL,
      sourceNames TEXT,
      rawJson TEXT,
      syncedAt TEXT
    );

    CREATE TABLE IF NOT EXISTS business_directory_provider_sync_meta (
      cacheKey TEXT PRIMARY KEY NOT NULL,
      city TEXT NOT NULL,
      cityKey TEXT,
      category TEXT NOT NULL,
      categoryKey TEXT,
      lastSyncedAt TEXT,
      totalSynced INTEGER DEFAULT 0,
      source TEXT
    );
  `);

  // Existing Expo installs may already have the old table shape.
  // Add flexible cache-key columns without deleting the user's SQLite cache.
  await addColumnIfMissing(db, "business_directory_providers", "categoryKey", "TEXT");
  await addColumnIfMissing(db, "business_directory_providers", "requestCityKey", "TEXT");
  await addColumnIfMissing(db, "business_directory_provider_sync_meta", "cityKey", "TEXT");
  await addColumnIfMissing(db, "business_directory_provider_sync_meta", "categoryKey", "TEXT");
  await backfillProviderKeys(db);
  await backfillMetaKeys(db);

  await db.execAsync(`
    CREATE INDEX IF NOT EXISTS idx_bdp_request_city_category
      ON business_directory_providers(requestCity, category);

    CREATE INDEX IF NOT EXISTS idx_bdp_request_city_key_category_key
      ON business_directory_providers(requestCityKey, categoryKey);

    CREATE INDEX IF NOT EXISTS idx_bdp_business_name
      ON business_directory_providers(businessName);

    CREATE INDEX IF NOT EXISTS idx_bdp_sync_city_category
      ON business_directory_provider_sync_meta(city, category);

    CREATE INDEX IF NOT EXISTS idx_bdp_sync_city_key_category_key
      ON business_directory_provider_sync_meta(cityKey, categoryKey);
  `);
};

const getCacheParts = ({ city, category = DEFAULT_PROVIDER_CATEGORY }) => {
  const resolvedCity = resolveProviderCity({ city, fallback: DEFAULT_PROVIDER_CITY }).city;
  const cleanCategory = normalizeProviderCategory(category, DEFAULT_PROVIDER_CATEGORY);
  const cityKey = getCityKey(resolvedCity);
  const categoryKey = getCategoryKey(cleanCategory);

  return {
    city: resolvedCity,
    category: cleanCategory,
    cityKey,
    categoryKey,
    cacheKey: `${categoryKey}:${cityKey}`,
  };
};

const insertProvider = async (db, provider) => {
  await db.runAsync(
    `INSERT OR REPLACE INTO business_directory_providers (
      id, mongoId, providerId, category, categoryKey, requestCity, requestCityKey,
      businessName, businessDescription, providerType, primaryCategory, phoneDisplay,
      phoneNormalized, email, address, city, province, rating, reviewCount,
      websiteUrl, listingUrl, imageUrl, latitude, longitude, sourceNames,
      rawJson, syncedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      provider.id,
      provider.mongoId,
      provider.providerId,
      provider.category,
      provider.categoryKey,
      provider.requestCity,
      provider.requestCityKey,
      provider.businessName,
      provider.businessDescription,
      provider.providerType,
      provider.primaryCategory,
      provider.phoneDisplay,
      provider.phoneNormalized,
      provider.email,
      provider.address,
      provider.city,
      provider.province,
      provider.rating,
      provider.reviewCount,
      provider.websiteUrl,
      provider.listingUrl,
      provider.imageUrl,
      provider.latitude,
      provider.longitude,
      provider.sourceNames,
      provider.rawJson,
      provider.syncedAt,
    ]
  );
};

export const upsertProviderSyncMeta = async ({
  city,
  category = DEFAULT_PROVIDER_CATEGORY,
  lastSyncedAt = new Date().toISOString(),
  totalSynced = 0,
  source = "api",
}) => {
  await initBusinessDirectoryProviderDb();
  const db = await getDb();
  const cache = getCacheParts({ city, category });

  await db.runAsync(
    `INSERT OR REPLACE INTO business_directory_provider_sync_meta (
      cacheKey, city, cityKey, category, categoryKey, lastSyncedAt, totalSynced, source
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [cache.cacheKey, cache.city, cache.cityKey, cache.category, cache.categoryKey, lastSyncedAt, totalSynced, source]
  );
};

export const getProviderSyncMeta = async ({ city, category = DEFAULT_PROVIDER_CATEGORY }) => {
  await initBusinessDirectoryProviderDb();
  const db = await getDb();
  const cache = getCacheParts({ city, category });

  return db.getFirstAsync(
    `SELECT * FROM business_directory_provider_sync_meta WHERE cacheKey = ? LIMIT 1`,
    [cache.cacheKey]
  );
};

export const isProviderCacheFresh = async ({ city, category = DEFAULT_PROVIDER_CATEGORY, staleMinutes = 10 }) => {
  const meta = await getProviderSyncMeta({ city, category });
  if (!meta?.lastSyncedAt) return false;

  const lastSyncedMs = new Date(meta.lastSyncedAt).getTime();
  if (Number.isNaN(lastSyncedMs)) return false;

  const ageMs = Date.now() - lastSyncedMs;
  return ageMs < staleMinutes * 60 * 1000;
};

export const replaceProvidersForCity = async ({
  city,
  category = DEFAULT_PROVIDER_CATEGORY,
  providers = [],
  syncedAt = new Date().toISOString(),
  source = "api",
}) => {
  await initBusinessDirectoryProviderDb();
  const db = await getDb();
  const cache = getCacheParts({ city, category });
  const localProviders = providers.map((provider) =>
    mapApiProviderToLocalProvider(provider, {
      city: cache.city,
      cityKey: cache.cityKey,
      category: cache.category,
      categoryKey: cache.categoryKey,
      cacheKey: cache.cacheKey,
      syncedAt,
    })
  );

  await db.execAsync("BEGIN TRANSACTION");
  try {
    // Replace only this request city/category cache. Other city caches remain available offline.
    await db.runAsync(
      `DELETE FROM business_directory_providers
       WHERE (requestCityKey = ? AND categoryKey = ?)
          OR (LOWER(requestCity) = LOWER(?) AND LOWER(category) = LOWER(?))`,
      [cache.cityKey, cache.categoryKey, cache.city, cache.category]
    );

    for (const provider of localProviders) {
      await insertProvider(db, provider);
    }

    await db.runAsync(
      `INSERT OR REPLACE INTO business_directory_provider_sync_meta (
        cacheKey, city, cityKey, category, categoryKey, lastSyncedAt, totalSynced, source
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cache.cacheKey,
        cache.city,
        cache.cityKey,
        cache.category,
        cache.categoryKey,
        syncedAt,
        localProviders.length,
        source,
      ]
    );

    await db.execAsync("COMMIT");
  } catch (error) {
    await db.execAsync("ROLLBACK");
    throw error;
  }

  console.log("[FixBee][ProviderSQLite] replaced provider cache", {
    city: cache.city,
    cityKey: cache.cityKey,
    category: cache.category,
    categoryKey: cache.categoryKey,
    source,
    count: localProviders.length,
  });

  return localProviders.length;
};

const getCityBreakdown = (providers = []) =>
  providers.reduce((summary, provider) => {
    const key = provider.city || "Unknown";
    summary[key] = (summary[key] || 0) + 1;
    return summary;
  }, {});

export const loadProvidersByCity = async ({ city, category = DEFAULT_PROVIDER_CATEGORY, searchText = "" }) => {
  await initBusinessDirectoryProviderDb();
  const db = await getDb();
  const cache = getCacheParts({ city, category });
  const cleanSearch = String(searchText || "").trim().toLowerCase();

  const rows = cleanSearch
    ? await db.getAllAsync(
        `SELECT * FROM business_directory_providers
         WHERE requestCityKey = ?
           AND categoryKey = ?
           AND (
             LOWER(businessName) LIKE ? OR
             LOWER(address) LIKE ? OR
             LOWER(city) LIKE ?
           )
         ORDER BY
           CASE WHEN LOWER(city) = LOWER(?) THEN 0 ELSE 1 END,
           rating DESC,
           reviewCount DESC,
           businessName ASC`,
        [cache.cityKey, cache.categoryKey, `%${cleanSearch}%`, `%${cleanSearch}%`, `%${cleanSearch}%`, cache.city]
      )
    : await db.getAllAsync(
        `SELECT * FROM business_directory_providers
         WHERE requestCityKey = ? AND categoryKey = ?
         ORDER BY
           CASE WHEN LOWER(city) = LOWER(?) THEN 0 ELSE 1 END,
           rating DESC,
           reviewCount DESC,
           businessName ASC`,
        [cache.cityKey, cache.categoryKey, cache.city]
      );

  const providers = rows.map(mapLocalRowToProvider);
  console.log("[FixBee][ProviderSQLite] loaded providers from cache", {
    city: cache.city,
    cityKey: cache.cityKey,
    category: cache.category,
    categoryKey: cache.categoryKey,
    count: providers.length,
    cityBreakdown: getCityBreakdown(providers),
  });

  return providers;
};

export const loadProvidersByIds = async (ids = []) => {
  await initBusinessDirectoryProviderDb();
  const cleanIds = ids.map((id) => String(id || "").trim()).filter(Boolean);
  if (!cleanIds.length) return [];

  const db = await getDb();
  const placeholders = cleanIds.map(() => "?").join(", ");
  const rows = await db.getAllAsync(
    `SELECT * FROM business_directory_providers WHERE id IN (${placeholders})`,
    cleanIds
  );

  const providersById = new Map(rows.map((row) => [row.id, mapLocalRowToProvider(row)]));
  return cleanIds.map((id) => providersById.get(id)).filter(Boolean);
};

export const loadProviderDetails = async (id) => {
  await initBusinessDirectoryProviderDb();
  const db = await getDb();
  const row = await db.getFirstAsync(
    "SELECT * FROM business_directory_providers WHERE id = ? LIMIT 1",
    [id]
  );
  return row ? mapLocalRowToProvider(row) : null;
};

export const clearProvidersForCity = async ({ city, category = DEFAULT_PROVIDER_CATEGORY }) => {
  await initBusinessDirectoryProviderDb();
  const db = await getDb();
  const cache = getCacheParts({ city, category });
  await db.runAsync(
    "DELETE FROM business_directory_providers WHERE requestCityKey = ? AND categoryKey = ?",
    [cache.cityKey, cache.categoryKey]
  );
  await db.runAsync(
    "DELETE FROM business_directory_provider_sync_meta WHERE cacheKey = ?",
    [cache.cacheKey]
  );
};

export const clearProviderCache = async () => {
  await initBusinessDirectoryProviderDb();
  const db = await getDb();
  await db.runAsync("DELETE FROM business_directory_providers");
  await db.runAsync("DELETE FROM business_directory_provider_sync_meta");
};
