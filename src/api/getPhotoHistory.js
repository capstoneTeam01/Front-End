import { apiGet } from "./apiClient";

const getPhotoHistory = async () => {
  const data = await apiGet("/api/photos/history");

  if (!Array.isArray(data.history)) {
    return [];
  }

  return data.history;
};

export { getPhotoHistory };