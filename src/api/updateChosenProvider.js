import { apiPatch } from "./apiClient";

const updateChosenProvider = async (photoId, chosenProvider) => {
  if (!photoId) {
    throw new Error("photoId is required");
  }

  if (!chosenProvider) {
    throw new Error("chosenProvider is required");
  }

  return apiPatch(
    `/api/photos/${photoId}/chosen-provider`,
    {
      chosenProvider,
    },
    {
      timeoutMs: 30000,
    }
  );
};

export { updateChosenProvider };