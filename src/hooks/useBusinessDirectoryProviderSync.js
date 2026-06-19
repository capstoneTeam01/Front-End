import { useCallback, useState } from "react";

import { syncProvidersForCity } from "../services/businessDirectoryProviderSyncService";

export const useBusinessDirectoryProviderSync = ({ city, category = "plumber", limit = 20 }) => {
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");
  const [syncSource, setSyncSource] = useState(null);
  const [syncError, setSyncError] = useState(null);

  const syncProviders = useCallback(async (options = {}) => {
    setSyncing(true);
    setSyncError(null);

    try {
      const result = await syncProvidersForCity({
        city,
        category,
        limit,
        force: options.force || false,
      });
      setSyncMessage(result.message || "Providers synced.");
      setSyncSource(result.source);
      return result;
    } catch (err) {
      setSyncError(err.message);
      setSyncMessage("Could not sync providers.");
      throw err;
    } finally {
      setSyncing(false);
    }
  }, [city, category, limit]);

  return {
    syncing,
    syncMessage,
    syncSource,
    syncError,
    syncProviders,
  };
};
