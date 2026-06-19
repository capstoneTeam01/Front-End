import {
  DEFAULT_PROVIDER_CATEGORY,
  DEFAULT_PROVIDER_CITY,
} from "./providerConstants";

const toCleanText = (value) => String(value || "").trim();
const toLowerText = (value) => toCleanText(value).toLowerCase();

// Keep this mapping small and beginner-friendly.
// The backend currently supports plumbers well, so unclear AI labels are safely normalized.
export const normalizeProviderCategory = (value, fallback = DEFAULT_PROVIDER_CATEGORY) => {
  const text = toLowerText(value);

  if (!text) return fallback;

  if (
    text.includes("plumb") ||
    text.includes("pipe") ||
    text.includes("leak") ||
    text.includes("drain") ||
    text.includes("faucet") ||
    text.includes("water") ||
    text.includes("sink") ||
    text.includes("toilet")
  ) {
    return "plumber";
  }

  if (text.includes("electric")) return "electrician";
  if (text.includes("appliance")) return "appliance";
  if (text.includes("hvac") || text.includes("heating") || text.includes("cooling")) return "hvac";

  return fallback;
};

export const getAnalysisPayload = (analysisResult) => analysisResult?.analysis || analysisResult || {};

export const getIssueLabelFromAnalysis = (analysisResult, fallback = "Repair issue") => {
  const result = getAnalysisPayload(analysisResult);
  return toCleanText(result.detectedIssue || result.issueName || result.problemName || fallback);
};

export const getProviderRouteParamsFromIssue = ({
  analysisResult,
  city = DEFAULT_PROVIDER_CITY,
  fallbackCategory = DEFAULT_PROVIDER_CATEGORY,
  title = "Repair issue",
} = {}) => {
  const result = getAnalysisPayload(analysisResult);
  const issueLabel = getIssueLabelFromAnalysis(result, title);

  const rawCategory =
    result.recommendedProviderType ||
    result.providerType ||
    result.primaryCategory ||
    result.category ||
    issueLabel;

  return {
    city: toCleanText(city) || DEFAULT_PROVIDER_CITY,
    category: normalizeProviderCategory(rawCategory, fallbackCategory),
    fromIssue: issueLabel,
    detectedObject: toCleanText(result.detectedObject),
    urgency: toCleanText(result.urgency),
    estimatedCostRange: toCleanText(result.estimatedCostRange),
    estimatedRepairTime: toCleanText(result.estimatedRepairTime),
    providerSource: "issue-analysis",
  };
};
