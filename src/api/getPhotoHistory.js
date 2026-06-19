import { API_URL, AUTH_TOKEN } from "../constants/config";

const getPhotoHistory = async (token = AUTH_TOKEN) => {
  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  let authorizationToken = token;

  if (!token.startsWith("Bearer ")) {
    authorizationToken = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_URL}/api/photos/history`, {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
      },
    });
  } catch (error) {
    throw new Error(
      "Network error. Make sure the backend is running and API_URL is correct."
    );
  }

  let data;

  try {
    data = await response.json();
  } catch (error) {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(
      data.message || "Could not load repair history."
    );
  }

  return data.history;
};

export { getPhotoHistory };