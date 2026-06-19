import { API_URL, AUTH_TOKEN } from "../constants/config";

const BASE = "/api/notifications";

const authHeader = (token) => ({
  Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
});

const getNotifications = async (token = AUTH_TOKEN) => {
  const res = await fetch(`${API_URL}${BASE}`, {
    method: "GET",
    headers: authHeader(token),
  });

  if (!res.ok) {
    throw new Error(`Notifications request failed (${res.status})`);
  }

  const data = await res.json();
  return data.notifications || data.data || data || [];
};

const markNotificationRead = async (id, token = AUTH_TOKEN) => {
  const res = await fetch(`${API_URL}${BASE}/${id}/read`, {
    method: "PATCH",
    headers: authHeader(token),
  });
  if (!res.ok) {
    throw new Error(`Mark read failed (${res.status})`);
  }
  return res.json().catch(() => ({}));
};

const markAllNotificationsRead = async (token = AUTH_TOKEN) => {
  const res = await fetch(`${API_URL}${BASE}/read-all`, {
    method: "PATCH",
    headers: authHeader(token),
  });
  if (!res.ok) {
    throw new Error(`Mark all read failed (${res.status})`);
  }
  return res.json().catch(() => ({}));
};

export { getNotifications, markNotificationRead, markAllNotificationsRead };