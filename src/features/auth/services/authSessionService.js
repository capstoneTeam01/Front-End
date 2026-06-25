import { Buffer } from "buffer";

import { DEV_LOGIN, USE_DEV_AUTO_LOGIN } from "../../../constants/config";
import {
  loginWithCredentials,
  registerWithCredentials,
  loginWithGoogle,
  loginWithApple,
} from "../api/authApi";
import {
  clearAuthToken,
  getAuthToken,
  getAuthUserProfile,
  saveAuthToken,
  saveAuthUserProfile,
} from "../storage/tokenStorage";

const TOKEN_EXPIRY_BUFFER_SECONDS = 90;

let loginPromise = null;

const clean = (value) => String(value || "").trim();

const decodeJwtPayload = (token) => {
  try {
    const payloadPart = clean(token)
      .replace(/^Bearer\s+/i, "")
      .split(".")[1];
    if (!payloadPart) return null;

    const normalized = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );

    return JSON.parse(Buffer.from(padded, "base64").toString("utf8"));
  } catch (error) {
    console.log(
      "[FixBee][Auth] token payload could not be decoded",
      error?.message,
    );
    return null;
  }
};

const tokenNeedsRefresh = (token) => {
  const payload = decodeJwtPayload(token);

  if (!payload?.exp) return false;

  const expiresAtMs = Number(payload.exp) * 1000;
  const refreshAtMs = Date.now() + TOKEN_EXPIRY_BUFFER_SECONDS * 1000;
  const shouldRefresh = expiresAtMs <= refreshAtMs;

  if (shouldRefresh) {
    console.log("[FixBee][Auth] saved token is expired or close to expiry", {
      expiresAt: new Date(expiresAtMs).toISOString(),
    });
  }

  return shouldRefresh;
};

export const getSavedToken = async () => getAuthToken();

export const getSavedUserProfile = async () => getAuthUserProfile();

const persistAuthResult = async (result) => {
  await saveAuthToken(result.token);
  await saveAuthUserProfile(result.user);
  return result;
};

export const loginUser = async (credentials) => {
  console.log("[FixBee][Auth] user login", { email: credentials.email });
  const result = await loginWithCredentials(credentials);
  return persistAuthResult(result);
};

export const registerUser = async ({ name, email, password }) => {
  console.log("[FixBee][Auth] user register", { email });
  const result = await registerWithCredentials({ name, email, password });
  return persistAuthResult(result);
};

export const loginWithGoogleToken = async (idToken) => {
  const result = await loginWithGoogle(idToken);
  return persistAuthResult(result);
};

export const loginWithAppleToken = async ({ identityToken, fullName }) => {
  const result = await loginWithApple({ identityToken, fullName });
  return persistAuthResult(result);
};

export const logoutUser = async () => {
  await clearAuthToken({ keepUserProfile: false });
};

export const loginAndStoreToken = async (
  credentials = DEV_LOGIN,
  options = {},
) => {
  if (loginPromise) return loginPromise;

  loginPromise = (async () => {
    console.log("[FixBee][Auth] requesting fresh backend token", {
      reason: options.reason || "auto-login",
      email: credentials.email,
    });

    const result = await loginWithCredentials(credentials);
    await saveAuthToken(result.token);
    await saveAuthUserProfile(result.user);

    console.log("[FixBee][Auth] fresh backend token saved");
    return result.token;
  })();

  try {
    return await loginPromise;
  } finally {
    loginPromise = null;
  }
};

export const getTokenForRequest = async ({
  forceRefresh = false,
  reason = "request",
} = {}) => {
  if (!forceRefresh) {
    const savedToken = await getSavedToken();

    if (savedToken && !tokenNeedsRefresh(savedToken)) {
      return savedToken;
    }

    if (savedToken) {
      await clearAuthToken({ keepUserProfile: true });
    }
  }

  if (!USE_DEV_AUTO_LOGIN) {
    console.log(
      "[FixBee][Auth] no token available and dev auto-login is disabled",
    );
    return null;
  }

  return loginAndStoreToken(DEV_LOGIN, {
    reason: forceRefresh ? reason : "expired-token",
  });
};

export const resetAuthSession = async (options = {}) => {
  console.log("[FixBee][Auth] clearing saved backend token", {
    reason: options.reason || "reset",
  });

  await clearAuthToken({ keepUserProfile: options.keepUserProfile !== false });
};
