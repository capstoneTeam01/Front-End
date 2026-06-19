// - Android emulator fallback: http://10.0.2.2:5000
export const API_URL =
  process.env.EXPO_PUBLIC_FIXBEE_API_URL ||
  process.env.EXPO_PUBLIC_API_URL ||
  "";

export const USE_DEV_AUTO_LOGIN = true;

export const AUTH_TOKEN = "";

export const DEV_LOGIN = {
  email: "testuser1@example.com",
  password: "password123",
};

export const PROVIDER_CACHE_STALE_MINUTES = 10;

export const USE_MOCK_UPLOAD = false;

export const MOCK_UPLOAD_RESULT = "success";

export const USE_DEMO_ANALYSIS_FALLBACK = true;

export const PREFERRED_QUOTE_MAIL_CLIENT = process.env.EXPO_PUBLIC_PREFERRED_QUOTE_MAIL_CLIENT || "gmail";
export const FIXBEE_QUOTE_CC_EMAIL = process.env.EXPO_PUBLIC_FIXBEE_QUOTE_CC_EMAIL || "fixbee.official@gmail.com";

export const FIXBEE_REQUESTER_NAME = process.env.EXPO_PUBLIC_FIXBEE_REQUESTER_NAME || "FixBee User";
