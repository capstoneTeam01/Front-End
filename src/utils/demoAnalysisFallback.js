const clean = (value) => String(value || "").trim();

export const isNetworkErrorMessage = (error) => {
  const text = [error?.message, error?.name, error?.code]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase())
    .join(" ");

  return (
    text.includes("network request failed") ||
    text.includes("failed to fetch") ||
    text.includes("cannot reach backend") ||
    text.includes("timed out") ||
    text.includes("timeout")
  );
};

export const buildDemoAnalysisFallback = ({
  imageUri,
  uploadedImageUrl,
  reason = "backend-unavailable",
} = {}) => {
  const publicImageUrl = clean(uploadedImageUrl).startsWith("http")
    ? clean(uploadedImageUrl)
    : "";

  return {
    ok: true,
    demoFallback: true,
    fallbackReason: reason,
    uploadedImageUri: imageUri || null,
    uploadedImageUrl: publicImageUrl,
    analysis: {
      detectedIssue: "Leaking Pipe",
      detectedObject: "pipe",
      category: "plumber",
      providerType: "plumber",
      recommendedProviderType: "plumber",
      urgency: "medium",
      urgencyDescription:
        "FixBee could not reach the backend analysis service, so a demo plumbing issue was used to continue the service provider flow.",
      estimatedCostRange: "$150 - $450",
      estimatedRepairTime: "1 - 3 hours",
      costEstimate: "$150 - $450",
      repairTimeEstimate: "1 - 3 hours",
      recommendedActions: [
        "Avoid touching the damaged pipe area.",
        "Keep the area clear and dry if possible.",
        "Contact a plumber for inspection and repair.",
      ],
    },
  };
};
