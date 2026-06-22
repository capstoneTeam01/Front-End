import { apiPost } from "./apiClient";

class DiyInstructionsError extends Error {
  constructor(message, code = "DIY_INSTRUCTIONS_FAILED") {
    super(message);
    this.name = "DiyInstructionsError";
    this.code = code;
  }
}

const getDiyInstructions = async (
  analysisResult,
  urgency = "Low"
) => {
  if (!analysisResult) {
    throw new DiyInstructionsError(
      "Analysis result is required to generate DIY instructions.",
      "MISSING_ANALYSIS_RESULT"
    );
  }

  try {
    console.log(
      "[FixBee][DIY] requesting instructions with auto auth",
      {
        detectedIssue: analysisResult.detectedIssue,
        detectedObject: analysisResult.detectedObject,
        urgency,
      }
    );

    const data = await apiPost(
      "/api/analysis/diy-instructions",
      {
        analysisResult,
        urgency,
      },
      {
        timeoutMs: 90000,
      }
    );

    console.log("[FixBee][DIY] API response:", data);

    return data;
  } catch (error) {
    console.log("[FixBee][DIY] request failed:", {
      status: error?.status,
      message: error?.message,
    });

    let errorCode = "DIY_INSTRUCTIONS_FAILED";

    if (error?.status === 401) {
      errorCode = "UNAUTHORIZED";
    }

    throw new DiyInstructionsError(
      error?.message || "Failed to generate DIY instructions.",
      errorCode
    );
  }
};

export { getDiyInstructions, DiyInstructionsError };