import type { UseFormSetError, FieldValues, Path } from "react-hook-form";
import axios from "axios";

/**
 * Maps JSend error responses to React Hook Form field errors.
 * Returns a global error message for server errors, or null if field errors were set.
 */
export function handleFormErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
): string | null {
  if (!axios.isAxiosError(error) || !error.response) {
    return "Une erreur inattendue est survenue.";
  }

  const { status, data } = error.response;

  // JSend "fail"
  if (data?.status === "fail" && data.data) {
    // Single message (e.g. invalid credentials): { detail: "..." }
    if (typeof data.data.detail === "string") {
      return data.data.detail;
    }

    // Validation errors (typically 400): { field: ["msg", ...] }
    if (status === 400) {
      const fieldErrors: Record<string, string[]> = data.data;
      for (const [field, messages] of Object.entries(fieldErrors)) {
        if (Array.isArray(messages) && messages.length > 0) {
          setError(field as Path<T>, { type: "server", message: messages[0] });
        }
      }
      return null;
    }
  }

  // Server error (500) — JSend "error"
  if (data?.status === "error" && data.message) {
    return data.message;
  }

  return "Une erreur est survenue.";
}
