import { apiGet } from "./apiClient";

const ME_ENDPOINTS = ["/api/users/me", "/api/auth/me", "/api/user/me"];

const clean = (value) => String(value || "").trim();

export const extractUserDisplayName = (user) => {
  if (!user) return "";

  const directName =
    clean(user.name) ||
    clean(user.fullName) ||
    clean(user.displayName) ||
    clean(user.username) ||
    clean(user.profile?.name) ||
    clean(user.profile?.fullName) ||
    clean(user.profile?.displayName);

  if (directName) return directName;

  const firstName = clean(user.firstName || user.profile?.firstName);
  const lastName = clean(user.lastName || user.profile?.lastName);
  const combinedName = [firstName, lastName].filter(Boolean).join(" ");
  if (combinedName) return combinedName;

  return "";
};

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

const normalizeUserPayload = (data) => {
  const user = data.user || data.currentUser || data.profile || data.data?.user || data.data || data;

  return {
    user,
    displayName: extractUserDisplayName(user),
    location: extractLocation(user),
  };
};

const getMe = async () => {
  let lastError;

  for (const endpoint of ME_ENDPOINTS) {
    try {
      const data = await apiGet(endpoint);
      console.log("[FixBee][Auth] loaded current user profile", { endpoint });
      return normalizeUserPayload(data);
    } catch (error) {
      lastError = error;
      console.log("[FixBee][Auth] current user endpoint failed", {
        endpoint,
        message: error?.message,
      });
    }
  }

  throw lastError || new Error("Could not load current user profile.");
};

export { getMe };
