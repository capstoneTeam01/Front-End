import { apiRequest } from "./apiClient";

export const updateProfile = async (fields) => {
  return apiRequest("/api/users/update", {
    method: "PUT",
    json: fields,
  });
};

export const updateNotificationSetting = async (key, value) => {
  return apiRequest("/api/users/update", {
    method: "PUT",
    json: { notificationSettings: { [key]: value } },
  });
};

export const deleteAccount = async (password) => {
  return apiRequest("/api/users/delete", {
    method: "DELETE",
    json: { password },
  });
};
