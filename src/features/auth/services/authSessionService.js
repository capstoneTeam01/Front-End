import { Buffer } from "buffer";

import { DEV_LOGIN, USE_DEV_AUTO_LOGIN } from "../../../constants/config";
import { loginWithCredentials } from "../api/authApi";
import { clearAuthToken, getAuthToken, saveAuthToken, saveAuthUserProfile } from "../storage/tokenStorage";

// Refresh slightly before expiry so a request is not sent with a token
// that expires while the backend is processing it.
const TOKEN_EXPIRY_BUFFER_SECONDS = 90;

let loginPromise = null;

const clean = (value) => String(value || "").trim();

const decodeJwtPayload = (token) => {
  try {
    const payloadPart = clean(token).replace(/^Bearer\s+/i, "").split(".")[1];
    if (!payloadPart) return null;

    const normalized = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "="
    );

    return JSON.parse(Buffer.from(padded, "base64").toString("utf8"));
  } catch (error) {
    console.log("[FixBee][Auth] token payload could not be decoded", error?.message);
    return null;
  }
};

const tokenNeedsRefresh = (token) => {
  const payload = decodeJwtPayload(token);

  // If this backend token does not expose exp, keep using it until the
  // backend explicitly rejects it. The API client will then re-login once.
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

export const loginAndStoreToken = async (credentials = DEV_LOGIN, options = {}) => {
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

export const getTokenForRequest = async ({ forceRefresh = false, reason = "request" } = {}) => {
  if (!forceRefresh) {
    const savedToken = await getSavedToken();

    if (savedToken && !tokenNeedsRefresh(savedToken)) {
      return savedToken;
    }

    if (savedToken) {
      // Clear only the token. The next block will get a fresh one using
      // the existing capstone/dev login credentials.
      await clearAuthToken({ keepUserProfile: true });
    }
  }

  if (!USE_DEV_AUTO_LOGIN) {
    console.log("[FixBee][Auth] no token available and dev auto-login is disabled");
    return null;
  }

  return loginAndStoreToken(DEV_LOGIN, { reason: forceRefresh ? reason : "expired-token" });
};

export const resetAuthSession = async (options = {}) => {
  console.log("[FixBee][Auth] clearing saved backend token", {
    reason: options.reason || "reset",
  });

  await clearAuthToken({ keepUserProfile: options.keepUserProfile !== false });
};
