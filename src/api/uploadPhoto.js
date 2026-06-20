import { apiRequest } from "./apiClient";

class UploadError extends Error {
  constructor(message, code = "UPLOAD_FAILED") {
    super(message);
    this.name = "UploadError";
    this.code = code;
  }
}

const pickPhotoId = (data) =>
  data?.photoId ||
  data?.id ||
  data?._id ||
  data?.photo?._id ||
  data?.photo?.id ||
  data?.data?.photoId ||
  data?.data?.id ||
  data?.data?._id ||
  data?.data?.photo?._id ||
  data?.data?.photo?.id ||
  null;

const pickPhotoUrl = (data) =>
  data?.url ||
  data?.imageUrl ||
  data?.uploadedImageUrl ||
  data?.photo?.url ||
  data?.photo?.imageUrl ||
  data?.data?.url ||
  data?.data?.imageUrl ||
  data?.data?.uploadedImageUrl ||
  data?.data?.photo?.url ||
  data?.data?.photo?.imageUrl ||
  null;

const getFileNameFromAsset = (imageAsset) => {
  const uriFileName = String(imageAsset?.uri || "").split("/").pop();
  return imageAsset?.fileName || uriFileName || `photo-${Date.now()}.jpg`;
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

const uploadPhoto = async (imageAsset) => {
  if (!imageAsset?.uri) {
    throw new UploadError("Photo file was not found.", "MISSING_IMAGE");
  }

  const formData = new FormData();
  const fileName = getFileNameFromAsset(imageAsset);
  const mimeType = inferMimeType(imageAsset);

  formData.append("image", {
    uri: imageAsset.uri,
    name: fileName,
    type: mimeType,
  });

  try {
    console.log("[FixBee][Scan] uploading photo with auto auth", {
      fileName,
      mimeType,
      hasUri: Boolean(imageAsset.uri),
    });

    const data = await apiRequest("/api/photos/upload", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
      timeoutMs: 70000,
    });

    const photoId = pickPhotoId(data);
    const uploadedImageUrl = pickPhotoUrl(data);

    if (!photoId) {
      console.log("[FixBee][Scan] upload response missing photo id", data);
    }

    return {
      ...data,
      photoId,
      uploadedImageUrl,
      url: uploadedImageUrl || data?.url,
    };
  } catch (error) {
    const code = error?.status === 401 ? "UNAUTHORIZED" : error?.code || "UPLOAD_FAILED";
    throw new UploadError(
      error?.message || "Upload failed. Please try again.",
      code
    );
  }
};

export { uploadPhoto, UploadError };
