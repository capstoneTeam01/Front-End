import { apiGet, apiRequest } from "./apiClient";

const BASE = "/api/notifications";

const extractList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.notifications)) return data.notifications;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const getNotifications = async () => {
  const data = await apiGet(BASE);
  return extractList(data);
};

const markNotificationRead = async (id) => {
  return apiRequest(`${BASE}/${id}/read`, { method: "PATCH" });
};

const markAllNotificationsRead = async () => {
  return apiRequest(`${BASE}/read-all`, { method: "PATCH" });
};

export { getNotifications, markNotificationRead, markAllNotificationsRead };
