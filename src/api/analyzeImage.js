import { API_URL, AUTH_TOKEN } from "../constants/config";

class AnalyzeImageError extends Error {
  constructor(message, code = "ANALYSIS_FAILED") {
    super(message);
    this.name = "AnalyzeImageError";
    this.code = code;
  }
}

const analyzeImage = async ({ photoId, location }, token = AUTH_TOKEN) => {
  if (!token) {
    throw new AnalyzeImageError(
      "Not logged in. Add AUTH_TOKEN in src/constants/config.js for testing.",
      "UNAUTHORIZED"
    );
  }

  if (!photoId) {
    throw new AnalyzeImageError(
      "Photo ID is required before analysis.",
      "MISSING_PHOTO_ID"
    );
  }

  let response;

  try {
    response = await fetch(`${API_URL}/api/analysis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      },
      body: JSON.stringify({
        photoId,
        location,
      }),
    });
  } catch {
    throw new AnalyzeImageError(
      "Network error. Check your connection and API_URL.",
      "NETWORK_ERROR"
    );
  }

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const code =
      data.error || (response.status === 401 ? "UNAUTHORIZED" : "ANALYSIS_FAILED");

    throw new AnalyzeImageError(
      data.message || "Image analysis failed. Please try again.",
      code
    );
  }

  return data;
};

export { analyzeImage, AnalyzeImageError };