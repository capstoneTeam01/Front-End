import { API_URL, AUTH_TOKEN } from "../constants/config";
import { resolveApiUrl } from "./resolveApiUrl";

class UploadError extends Error {
  constructor(message, code = "UPLOAD_FAILED") {
    super(message);
    this.name = "UploadError";
    this.code = code;
  }
}

const uploadPhoto = async (imageAsset, token = AUTH_TOKEN) => {
  if (!token) {
    throw new UploadError(
      "Not logged in. Add AUTH_TOKEN in src/constants/config.js for testing.",
      "UNAUTHORIZED"
    );
  }

  const formData = new FormData();
  const fileName = imageAsset.fileName || `photo-${Date.now()}.jpg`;
  const mimeType = imageAsset.mimeType || "image/jpeg";

  formData.append("image", {
    uri: imageAsset.uri,
    name: fileName,
    type: mimeType,
  });

  let response;
  try {
    response = await fetch(`${resolveApiUrl()}/api/photos/upload`, {
      method: "POST",
      headers: {
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      },
      body: formData,
    });
  } catch {
    throw new UploadError(
      "Network error. Check your connection and API_URL.",
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
    const code = data.error || (response.status === 401 ? "UNAUTHORIZED" : "UPLOAD_FAILED");
    throw new UploadError(
      data.message || "Upload failed. Please try again.",
      code
    );
  }

  return data;
};

export { uploadPhoto, UploadError };
