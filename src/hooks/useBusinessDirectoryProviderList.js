import { useCallback, useEffect, useState } from "react";

import { loadProvidersByCity } from "../localDb/businessDirectoryProviderLocalDb";

export const useBusinessDirectoryProviderList = ({ city, category = "plumber", searchText = "" }) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProviders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const rows = await loadProvidersByCity({ city, category, searchText });
      setProviders(rows);
      return rows;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [city, category, searchText]);

  useEffect(() => {
    loadProviders();
  }, [loadProviders]);

  return {
    providers,
    loading,
    error,
    reloadProviders: loadProviders,
  };
};
