import { API_URL, AUTH_TOKEN } from "../constants/config";

const ME_ENDPOINT = "/api/users/me";
const extractLocation = (user) => {
  if (!user) return null;
  return (
    user.location ||
    user.address ||
    user.city ||
    user.profile?.location ||
    user.profile?.address ||
    user.profile?.city ||
    null
  );
};

const getMe = async (token = AUTH_TOKEN) => {
  const res = await fetch(`${API_URL}${ME_ENDPOINT}`, {
    method: "GET",
    headers: {
      Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Profile request failed (${res.status})`);
  }

  const data = await res.json();
  const user = data.user || data.data || data;

  return { user, location: extractLocation(user) };
};

export { getMe };