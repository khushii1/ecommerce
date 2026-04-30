const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
const API_PREFIX = import.meta.env.VITE_API_PREFIX || "/api/v1";

export const apiRequest = async (endpoint, options = {}) => {
  try {
    const isFormData = options.body instanceof FormData;
    const headers = isFormData
      ? { ...(options.headers || {}) }
      : { "Content-Type": "application/json", ...(options.headers || {}) };

    const response = await fetch(`${API_BASE_URL}${API_PREFIX}${endpoint}`, {
      ...options,
      headers,
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed. Please try again.");
    }

    return data;
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error("Network error. Please check your connection and try again.");
    }
    throw error;
  }
};
