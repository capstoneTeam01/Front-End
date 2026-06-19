import { resolveApiUrl } from "./resolveApiUrl";

const detectIssueRegion = async (imageBase64) => {
  let response;

  try {
    response = await fetch(`${resolveApiUrl()}/api/analysis/region`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64 }),
    });
  } catch {
    return { success: false, message: "Cannot reach backend. Check Wi-Fi and server." };
  }

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    return {
      success: false,
      message: data.message || `Detection failed (${response.status})`,
      brightness: typeof data.brightness === "number" ? data.brightness : null,
    };
  }

  return data;
};

export { detectIssueRegion };
