import { resolveApiUrl } from "./resolveApiUrl";
import { getTokenForRequest, resetAuthSession } from "../features/auth/services/authSessionService";
import { markFixBeeWarmupStale } from "../bootstrap/appStartupWarmup";

const AUTH_RETRY_STATUSES = new Set([401, 403, 419, 440]);
const DEFAULT_REQUEST_TIMEOUT_MS = 45000;
const UPLOAD_REQUEST_TIMEOUT_MS = 70000;
const ANALYSIS_REQUEST_TIMEOUT_MS = 90000;
const NETWORK_RETRY_DELAY_MS = 900;

const AUTH_ERROR_PATTERNS = [
  "jwt expired",
  "token expired",
  "expired token",
  "invalid token",
  "invalid signature",
  "jwt malformed",
  "jsonwebtokenerror",
  "tokenexpirederror",
  "unauthorized",
  "forbidden",
  "session expired",
  "session not found",
  "no token",
];

const NETWORK_ERROR_PATTERNS = [
  "network request failed",
  "failed to fetch",
  "aborted",
  "aborterror",
  "timeout",
  "timed out",
  "networkerror",
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const buildUrl = (path) => {
  if (String(path).startsWith("http://") || String(path).startsWith("https://")) {
    return path;
  }

  return `${resolveApiUrl()}${path}`;
};

const normalizeToken = (token) => {
  if (!token) return null;
  return token.startsWith("Bearer ") ? token : `Bearer ${token}`;
};

const parseJsonSafely = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

const getErrorText = (data) =>
  [data?.message, data?.error, data?.code, data?.name, data?.details]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase())
    .join(" ");

const shouldRetryWithFreshToken = (response, data) => {
  if (!response) return false;

  if (AUTH_RETRY_STATUSES.has(response.status)) {
    return true;
  }
  
  const errorText = getErrorText(data);
  return AUTH_ERROR_PATTERNS.some((pattern) => errorText.includes(pattern));
};

const isNetworkLikeError = (error) => {
  const text = [error?.message, error?.name, error?.code]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase())
    .join(" ");

  return NETWORK_ERROR_PATTERNS.some((pattern) => text.includes(pattern));
};

const getRequestTimeoutMs = (path, options = {}) => {
  if (options.timeoutMs) return options.timeoutMs;

  const textPath = String(path || "").toLowerCase();
  if (textPath.includes("/api/photos/upload")) return UPLOAD_REQUEST_TIMEOUT_MS;
  if (textPath.includes("/api/analysis")) return ANALYSIS_REQUEST_TIMEOUT_MS;

  return DEFAULT_REQUEST_TIMEOUT_MS;
};

const fetchWithTimeout = async (requestUrl, fetchOptions, timeoutMs) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(requestUrl, {
      ...fetchOptions,
      signal: controller.signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error(`Request timed out after ${Math.round(timeoutMs / 1000)} seconds.`);
    }

    throw error;
  } finally {
    clearTimeout(timer);
  }
};

const rawApiRequest = async (path, options = {}, token) => {
  const { json, auth, timeoutMs, ...fetchOptions } = options;
  const headers = {
    ...(fetchOptions.headers || {}),
  };

  if (json !== undefined) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }

  const authHeader = normalizeToken(token);
  if (authHeader) {
    headers.Authorization = authHeader;
  }

  const requestUrl = buildUrl(path);
  const resolvedTimeoutMs = getRequestTimeoutMs(path, options);

  console.log("[FixBee][API] request", {
    method: fetchOptions.method || "GET",
    path,
    hasAuth: Boolean(authHeader),
    timeoutMs: resolvedTimeoutMs,
  });

  return fetchWithTimeout(
    requestUrl,
    {
      ...fetchOptions,
      headers,
      body: json !== undefined ? JSON.stringify(json) : fetchOptions.body,
    },
    resolvedTimeoutMs
  );
};

export const apiRequest = async (path, options = {}) => {
  const needsAuth = options.auth !== false;
  let token = needsAuth ? await getTokenForRequest({ reason: `api:${path}` }) : null;
  let response;
  let data;

  try {
    response = await rawApiRequest(path, options, token);
    data = await parseJsonSafely(response);
  } catch (networkError) {
    if (!isNetworkLikeError(networkError)) {
      throw networkError;
    }

    console.log("[FixBee][API] first network attempt failed, retrying once", {
      path,
      message: networkError?.message,
    });

    markFixBeeWarmupStale();
    if (needsAuth) {
      await resetAuthSession({ reason: `network-retry:${path}` });
      token = await getTokenForRequest({ forceRefresh: true, reason: `network-retry:${path}` });
    }

    await delay(NETWORK_RETRY_DELAY_MS);
    response = await rawApiRequest(path, options, token);
    data = await parseJsonSafely(response);
  }

  if (needsAuth && shouldRetryWithFreshToken(response, data)) {
    console.log("[FixBee][Auth] backend rejected token, refreshing and retrying request", {
      path,
      status: response.status,
      message: data?.message || data?.error || data?.code,
    });

    markFixBeeWarmupStale();
    await resetAuthSession({ reason: `auth-retry:${path}` });
    token = await getTokenForRequest({ forceRefresh: true, reason: `auth-retry:${path}` });
    response = await rawApiRequest(path, options, token);
    data = await parseJsonSafely(response);
  }

  if (!response.ok) {
    const error = new Error(data.message || data.error || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const apiGet = (path, options = {}) =>
  apiRequest(path, {
    ...options,
    method: "GET",
  });

export const apiPost = (path, json, options = {}) =>
  apiRequest(path, {
    ...options,
    method: "POST",
    json,
  });
