import type { UseFormSetError, FieldValues, Path } from "react-hook-form";
import axios from "axios";
import { extractErrorMessage } from "./extractErrorMessage";

/**
 * Maps JSend error responses to React Hook Form field errors.
 * Returns a global error message for non-field errors, or null if field errors were set.
 */
export function handleFormErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
): string | null {
  if (axios.isAxiosError(error) && error.response) {
    const { status, data } = error.response;

    // Field validation errors (typically 400): { status: "fail", data: { field: ["msg", ...] } }
    if (status === 400 && data?.status === "fail" && data.data && typeof data.data.detail !== "string") {
      const fieldErrors: Record<string, string[]> = data.data;
      let hasFieldError = false;
      for (const [field, messages] of Object.entries(fieldErrors)) {
        if (Array.isArray(messages) && messages.length > 0) {
          setError(field as Path<T>, { type: "server", message: messages[0] });
          hasFieldError = true;
        }
      }
      if (hasFieldError) return null;
    }
  }

  return extractErrorMessage(error, "Une erreur inattendue est survenue.");
}
