// Use your computer's LAN IP when testing on a physical device (not localhost).
export const API_URL = "http://localhost:5000";

// Paste a token from POST /api/auth/login while testing before login UI exists.
// Expires after ~1 hour; re-login if uploads return 401.
export const AUTH_TOKEN =
  "";

// Real API upload to backend → Vercel Blob (set true only for UI-only testing).
export const USE_MOCK_UPLOAD = false;   //make it true and test if dont have authtoken yet

// FIXBEE-65 mock scenarios (only when USE_MOCK_UPLOAD is true):
// "success" | "validation_error" | "upload_error"
export const MOCK_UPLOAD_RESULT = "success";
