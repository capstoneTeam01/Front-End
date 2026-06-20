import { Buffer } from "buffer";

import { getMe, extractUserDisplayName } from "../../../api/getMe";
import { DEV_LOGIN, FIXBEE_REQUESTER_NAME } from "../../../constants/config";
import { getSavedToken } from "./authSessionService";
import { getAuthUserProfile } from "../storage/tokenStorage";

const clean = (value) => String(value || "").trim();

const prettyNameFromEmail = (email) => {
  const localPart = clean(email).split("@")[0];
  if (!localPart) return "";

  return localPart
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const decodeJwtPayload = (token) => {
  try {
    const payloadPart = clean(token).replace(/^Bearer\s+/i, "").split(".")[1];
    if (!payloadPart) return null;

    const normalized = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    return JSON.parse(Buffer.from(padded, "base64").toString("utf8"));
  } catch (error) {
    console.log("[FixBee][Auth] could not decode JWT profile payload", error?.message);
    return null;
  }
};

const displayNameFromToken = async () => {
  const token = await getSavedToken();
  const payload = decodeJwtPayload(token);

  return extractUserDisplayName(payload) || prettyNameFromEmail(payload?.email);
};

const displayNameFromSavedLogin = async () => {
  const savedUser = await getAuthUserProfile();
  return extractUserDisplayName(savedUser) || prettyNameFromEmail(savedUser?.email);
};

export const getCurrentUserDisplayName = async () => {
  try {
    const { user, displayName } = await getMe();
    const resolvedName = displayName || prettyNameFromEmail(user?.email);

    if (resolvedName) {
      console.log("[FixBee][Auth] quote requester resolved from backend profile", resolvedName);
      return resolvedName;
    }
  } catch (error) {
    console.log("[FixBee][Auth] backend requester lookup failed", error?.message);
  }

  const savedLoginName = await displayNameFromSavedLogin();
  if (savedLoginName) {
    console.log("[FixBee][Auth] quote requester resolved from saved login profile", savedLoginName);
    return savedLoginName;
  }

  const tokenName = await displayNameFromToken();
  if (tokenName) {
    console.log("[FixBee][Auth] quote requester resolved from token", tokenName);
    return tokenName;
  }

  const configuredName = clean(FIXBEE_REQUESTER_NAME);
  if (configuredName && configuredName !== "UserName" && configuredName !== "FixBee User") {
    return configuredName;
  }

  return prettyNameFromEmail(DEV_LOGIN.email) || "FixBee User";
};
