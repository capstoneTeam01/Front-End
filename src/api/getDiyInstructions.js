import { apiPost } from "./apiClient";

class DiyInstructionsError extends Error {
  constructor(message, code = "DIY_INSTRUCTIONS_FAILED", status = null) {
    super(message);
    this.name = "DiyInstructionsError";
    this.code = code;
    this.status = status;
  }
}

const getDiyInstructions = async (analysisResult, urgency = "Low") => {
  if (!analysisResult) {
    throw new DiyInstructionsError(
      "analysisResult is required",
      "MISSING_ANALYSIS_RESULT"
    );
  }

  try {
    console.log("Sending DIY request:", {
  analysisResult,
  urgency,
});
    const data = await apiPost(
      "/api/analysis/diy-instructions",
      {
        analysisResult,
        urgency,
      },
      {
        timeoutMs: 30000,
      }
    );

    return data;
  } catch (error) {
    throw new DiyInstructionsError(
      error?.message || "Failed to retrieve DIY instructions.",
      "DIY_INSTRUCTIONS_FAILED",
      error?.status || null
    );
  }
};

export { getDiyInstructions, DiyInstructionsError };