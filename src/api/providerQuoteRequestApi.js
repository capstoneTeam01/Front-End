import { apiPost } from "./apiClient";

export const sendProviderQuoteRequest = async (payload) => {
  const data = await apiPost("/api/business-directory/providers/quote-requests/send", payload, {
    timeoutMs: 70000,
  });

  if (!data?.ok) {
    throw new Error(data?.message || "Quote request could not be sent.");
  }

  return data;
};
