import { apiPost } from "./apiClient";

class AnalyzeImageError extends Error {
  constructor(message, code = "ANALYSIS_FAILED") {
    super(message);
    this.name = "AnalyzeImageError";
    this.code = code;
  }
}

const analyzeImage = async ({ photoId, location }) => {
  if (!photoId) {
    throw new AnalyzeImageError(
      "Photo ID is required before analysis.",
      "MISSING_PHOTO_ID"
    );
  }

  try {
    console.log("[FixBee][Scan] requesting image analysis with auto auth", {
      photoId,
      location,
    });

    return await apiPost(
      "/api/analysis",
      {
        photoId,
        location,
      },
      {
        timeoutMs: 90000,
      }
    );
  } catch (error) {
    const code = error?.status === 401 ? "UNAUTHORIZED" : error?.code || "ANALYSIS_FAILED";
    throw new AnalyzeImageError(
      error?.message || "Image analysis failed. Please try again.",
      code
    );
  }
};

export { analyzeImage, AnalyzeImageError };
