import { describe, it, expect, vi } from "vitest";
import { AxiosError, type AxiosResponse } from "axios";
import { handleFormErrors } from "../handleFormErrors";

function makeAxiosError(status: number, data: unknown): AxiosError {
  const error = new AxiosError("Request failed");
  error.response = {
    status,
    data,
    headers: {},
    statusText: "",
    config: { headers: {} },
  } as AxiosResponse;
  return error;
}

describe("handleFormErrors", () => {
  it("retourne un message pour une erreur non-Axios", () => {
    const setError = vi.fn();
    const result = handleFormErrors(new Error("network"), setError);

    expect(result).toBe("Une erreur inattendue est survenue.");
    expect(setError).not.toHaveBeenCalled();
  });

  it("mappe les erreurs de validation 400 (JSend fail) sur les champs du formulaire", () => {
    const setError = vi.fn();
    const error = makeAxiosError(400, {
      status: "fail",
      data: {
        email: ["Ce champ est requis."],
        password: ["Mot de passe trop court."],
      },
    });

    const result = handleFormErrors(error, setError);

    expect(result).toBeNull();
    expect(setError).toHaveBeenCalledTimes(2);
    expect(setError).toHaveBeenCalledWith("email", {
      type: "server",
      message: "Ce champ est requis.",
    });
    expect(setError).toHaveBeenCalledWith("password", {
      type: "server",
      message: "Mot de passe trop court.",
    });
  });

  it("retourne le message serveur pour une erreur JSend 'error'", () => {
    const setError = vi.fn();
    const error = makeAxiosError(500, {
      status: "error",
      message: "Erreur interne du serveur",
    });

    const result = handleFormErrors(error, setError);

    expect(result).toBe("Erreur interne du serveur");
    expect(setError).not.toHaveBeenCalled();
  });

  it("retourne un message generique pour une reponse Axios inconnue", () => {
    const setError = vi.fn();
    const error = makeAxiosError(403, { detail: "Forbidden" });

    const result = handleFormErrors(error, setError);

    expect(result).toBe("Une erreur est survenue.");
    expect(setError).not.toHaveBeenCalled();
  });

  it("ignore les champs avec un tableau de messages vide", () => {
    const setError = vi.fn();
    const error = makeAxiosError(400, {
      status: "fail",
      data: {
        email: [],
        password: ["Requis"],
      },
    });

    const result = handleFormErrors(error, setError);

    expect(result).toBeNull();
    expect(setError).toHaveBeenCalledTimes(1);
    expect(setError).toHaveBeenCalledWith("password", {
      type: "server",
      message: "Requis",
    });
  });
});
