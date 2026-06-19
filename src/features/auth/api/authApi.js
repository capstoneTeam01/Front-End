import { DEV_LOGIN } from "../../../constants/config";
import { resolveApiUrl } from "../../../api/resolveApiUrl";

const LOGIN_ENDPOINT = "/api/auth/login";

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

export const loginWithCredentials = async (credentials = DEV_LOGIN) => {
  const url = `${resolveApiUrl()}${LOGIN_ENDPOINT}`;

  console.log("[FixBee][Auth] login request", {
    url,
    email: credentials.email,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || data.error || `Login failed with status ${response.status}`);
  }

  const token = extractToken(data);

  if (!token) {
    throw new Error("Login response did not include a token.");
  }

  return {
    token,
    user: extractUser(data),
  };
};
