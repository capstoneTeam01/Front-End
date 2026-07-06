import { apiPost } from "./apiClient";

const submitRepairFeedback = async (photoId, rating, note = "") => {
  if (!photoId) {
    throw new Error("photoId is required");
  }

  return apiPost(
    `/api/photos/${photoId}/feedback`,
    {
      rating,
      note,
    },
    {
      timeoutMs: 30000,
    }
  );
};

export { submitRepairFeedback };