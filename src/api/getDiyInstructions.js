import { apiPost } from "./apiClient";

class DiyInstructionsError extends Error {
  constructor(
    message,
    code = "DIY_INSTRUCTIONS_FAILED",
    status = null
  ) {
    super(message);

    this.name = "DiyInstructionsError";
    this.code = code;
    this.status = status;
  }
}

const getDiyInstructions = async (photoId) => {
  if (!photoId) {
    throw new DiyInstructionsError(
      "Photo ID is required to retrieve DIY instructions.",
      "MISSING_PHOTO_ID"
    );
  }

  try {
    console.log(
      "[FixBee][DIY] requesting cached instructions",
      {
        photoId: photoId,
      }
    );

    const data = await apiPost(
      "/api/analysis/diy-instructions",
      {
        photoId: photoId,
      },
      {
        timeoutMs: 30000,
      }
    );

    console.log(
      "[FixBee][DIY] API response:",
      data
    );

    return data;
  } catch (error) {
    console.log(
      "[FixBee][DIY] request failed:",
      {
        status: error?.status,
        message: error?.message,
      }
    );

    let errorCode = "DIY_INSTRUCTIONS_FAILED";

    if (error?.status === 401) {
      errorCode = "UNAUTHORIZED";
    }

    if (error?.status === 409) {
      errorCode = "DIY_SKIPPED";
    }

    if (error?.status === 500) {
      errorCode = "DIY_GENERATION_FAILED";
    }

    throw new DiyInstructionsError(
      error?.message ||
        "Failed to retrieve DIY instructions.",
      errorCode,
      error?.status || null
    );
  }
};

export {
  getDiyInstructions,
  DiyInstructionsError,
};