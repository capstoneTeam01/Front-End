import { apiPost } from "./apiClient";

class DiyInstructionsError extends Error {
  constructor(message, code = "DIY_INSTRUCTIONS_FAILED", status = null) {
    super(message);
    this.name = "DiyInstructionsError";
    this.code = code;
    this.status = status;
  }
}

const getDiyInstructions = async (photoId) => {
  if (!photoId) {
    throw new DiyInstructionsError("photoId is required", "MISSING_PHOTO_ID");
  }

  try {
    return await apiPost(
      "/api/analysis/diy-instructions",
      { photoId },
      { timeoutMs: 30000 }
    );
  } catch (error) {
    throw new DiyInstructionsError(
      error?.message || "Failed to retrieve DIY instructions.",
      "DIY_INSTRUCTIONS_FAILED",
      error?.status || null
    );
  }
};

export { getDiyInstructions, DiyInstructionsError };