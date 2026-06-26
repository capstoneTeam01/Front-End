import { apiRequest } from "./apiClient";

export const updateMyCity = async (city) => {
  return apiRequest("/api/users/update", {
    method: "PUT",
    json: { location: city },
  });
};
