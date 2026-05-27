import axios from "axios";

const DEFAULT_MESSAGE = "Une erreur est survenue.";

/**
 * Extracts a human-readable message from a JSend API error response.
 * Falls back to a generic message for non-axios errors or unknown shapes.
 */
export function extractErrorMessage(error: unknown, fallback = DEFAULT_MESSAGE): string {
  if (!axios.isAxiosError(error) || !error.response) {
    return fallback;
  }

  const { data } = error.response;

  if (data?.status === "fail" && typeof data.data?.detail === "string") {
    return data.data.detail;
  }

  if (data?.status === "error" && typeof data.message === "string") {
    return data.message;
  }

  return fallback;
}
