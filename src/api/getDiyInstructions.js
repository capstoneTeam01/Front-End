import { AUTH_TOKEN } from "../constants/config";
import { resolveApiUrl } from "./resolveApiUrl";

class DiyInstructionsError extends Error {
  constructor(message, code = "DIY_INSTRUCTIONS_FAILED") {
    super(message);
    this.name = "DiyInstructionsError";
    this.code = code;
  }
}

const getDiyInstructions = async (
  analysisResult,
  urgency = "Low",
  token = AUTH_TOKEN
) => {
  let response;

  try {
    response = await fetch(
      `${resolveApiUrl()}/api/analysis/diy-instructions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.startsWith("Bearer ")
            ? token
            : `Bearer ${token}`,
        },
        body: JSON.stringify({
          analysisResult,
          urgency,
        }),
      }
    );
    //Todo: remove console logs after testing
    console.log("DIY API status:", response.status);
    console.log("DIY API response:", data);
  } catch {
    throw new DiyInstructionsError(
      "Network error while generating DIY instructions.",
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
  console.log("########################################DIY backend error:", data);
  throw new DiyInstructionsError(
    data.message || "Failed to generate DIY instructions.",
    "DIY_INSTRUCTIONS_FAILED"
  );
}

  return data;
};

export { getDiyInstructions, DiyInstructionsError };