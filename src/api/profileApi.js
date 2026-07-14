import { apiRequest } from "./apiClient";

export const updateProfile = async (fields) => {
  return apiRequest("/api/users/update", {
    method: "PUT",
    json: fields,
  });
};

const getFileNameFromAsset = (imageAsset) => {
  const uriFileName = String(imageAsset?.uri || "").split("/").pop();
  return imageAsset?.fileName || uriFileName || `avatar-${Date.now()}.jpg`;
};

const inferMimeType = (imageAsset) => {
  const explicitMimeType = String(imageAsset?.mimeType || "").trim();
  if (explicitMimeType.includes("/")) return explicitMimeType;

  const fileName = getFileNameFromAsset(imageAsset).toLowerCase();
  if (fileName.endsWith(".png")) return "image/png";
  if (fileName.endsWith(".webp")) return "image/webp";
  if (fileName.endsWith(".heic")) return "image/heic";
  if (fileName.endsWith(".heif")) return "image/heif";

  return "image/jpeg";
};

export const uploadProfileImage = async (imageAsset) => {
  if (!imageAsset?.uri) {
    throw new Error("Photo file was not found.");
  }

  const formData = new FormData();
  formData.append("image", {
    uri: imageAsset.uri,
    name: getFileNameFromAsset(imageAsset),
    type: inferMimeType(imageAsset),
  });

  return apiRequest("/api/users/avatar", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
    timeoutMs: 70000,
  });
};

export const updateNotificationSetting = async (key, value) => {
  return apiRequest("/api/users/update", {
    method: "PUT",
    json: { notificationSettings: { [key]: value } },
  });
};

export const deleteAccount = async (password) => {
  return apiRequest("/api/users/delete", {
    method: "DELETE",
    json: { password },
  });
};
