import { DEV_LOGIN } from "../../../constants/config";
import { resolveApiUrl } from "../../../api/resolveApiUrl";

const LOGIN_ENDPOINT = "/api/auth/login";
const REGISTER_ENDPOINT = "/api/auth/register";
const GOOGLE_ENDPOINT = "/api/auth/google";
const APPLE_ENDPOINT = "/api/auth/apple";

const extractToken = (data) =>
  data?.token ||
  data?.accessToken ||
  data?.jwt ||
  data?.data?.token ||
  data?.data?.accessToken ||
  data?.data?.jwt;

const extractUser = (data) =>
  data?.user ||
  data?.currentUser ||
  data?.profile ||
  data?.data?.user ||
  data?.data?.currentUser ||
  data?.data?.profile ||
  null;

const postAuth = async (endpoint, body, { logLabel } = {}) => {
  const url = `${resolveApiUrl()}${endpoint}`;

  console.log("[FixBee][Auth] auth request", { url, label: logLabel });

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const fieldErrors = data?.errors
      ? Object.values(data.errors).flat().filter(Boolean).join(" ")
      : "";
    const message =
      data.message ||
      data.error ||
      fieldErrors ||
      `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  const token = extractToken(data);
  if (!token) {
    throw new Error("Auth response did not include a token.");
  }

  return { token, user: extractUser(data) };
};

export const loginWithCredentials = async (credentials = DEV_LOGIN) => {
  return postAuth(
    LOGIN_ENDPOINT,
    { email: credentials.email, password: credentials.password },
    { logLabel: "login" },
  );
};

export const registerWithCredentials = async ({ name, email, password }) => {
  return postAuth(
    REGISTER_ENDPOINT,
    { name, email, password },
    { logLabel: "register" },
  );
};

export const loginWithGoogle = async (idToken) => {
  return postAuth(GOOGLE_ENDPOINT, { idToken }, { logLabel: "google" });
};

export const loginWithApple = async ({ identityToken, fullName }) => {
  return postAuth(
    APPLE_ENDPOINT,
    { identityToken, fullName },
    { logLabel: "apple" },
  );
};
