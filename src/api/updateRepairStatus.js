import { apiPatch } from "./apiClient";

const updateRepairStatus = async (photoId, repairStatus) => {
  return apiPatch(
    `/api/photos/${photoId}/status`,
    { repairStatus },
    { timeoutMs: 30000 }
  );
};

export { updateRepairStatus };