import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "fixbee_auth_token";
const USER_PROFILE_KEY = "fixbee_auth_user_profile";
let memoryToken = null;
let memoryUserProfile = null;

export const saveAuthToken = async (token) => {
  memoryToken = token || null;

  try {
    if (token) {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
  } catch {
    // SecureStore can fail on unsupported environments.
    // The in-memory token still keeps the demo session running.
  }
};

export const getAuthToken = async () => {
  if (memoryToken) return memoryToken;

  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    memoryToken = token || null;
    return memoryToken;
  } catch {
    return memoryToken;
  }
};

export const saveAuthUserProfile = async (userProfile) => {
  memoryUserProfile = userProfile || null;

  try {
    if (userProfile) {
      await SecureStore.setItemAsync(USER_PROFILE_KEY, JSON.stringify(userProfile));
    } else {
      await SecureStore.deleteItemAsync(USER_PROFILE_KEY);
    }
  } catch {
    // Same idea as token storage: keep the in-memory copy for Expo/local testing.
  }
};

export const getAuthUserProfile = async () => {
  if (memoryUserProfile) return memoryUserProfile;

  try {
    const rawProfile = await SecureStore.getItemAsync(USER_PROFILE_KEY);
    memoryUserProfile = rawProfile ? JSON.parse(rawProfile) : null;
    return memoryUserProfile;
  } catch {
    return memoryUserProfile;
  }
};

export const clearAuthToken = async (options = {}) => {
  memoryToken = null;

  if (!options.keepUserProfile) {
    memoryUserProfile = null;
  }

  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    if (!options.keepUserProfile) {
      await SecureStore.deleteItemAsync(USER_PROFILE_KEY);
    }
  } catch {}
};
