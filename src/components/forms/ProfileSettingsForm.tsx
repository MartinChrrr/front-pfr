import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { updateProfile } from "../../api/auth";
import { handleFormErrors } from "../../api/handleFormErrors";
import type { ProfileUpdateRequest } from "../../types/auth";
import Button from "../ui/Button";

export default function ProfileSettingsForm() {
  const { user, refreshUser } = useAuth();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileUpdateRequest>({
    values: {
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      address: user?.address ?? "",
      postal_code: user?.postal_code ?? "",
      city: user?.city ?? "",
      phone: user?.phone ?? "",
    },
  });

  const onSubmit = async (data: ProfileUpdateRequest) => {
    setGlobalError(null);
    setSuccess(false);
    try {
      await updateProfile(data);
      await refreshUser();
      reset(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      const message = handleFormErrors<ProfileUpdateRequest>(error, setError);
      if (message) setGlobalError(message);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-[31px]">
      {globalError && (
        <p className="text-sm text-alert">{globalError}</p>
      )}
      {success && (
        <p className="text-sm text-success">Modifications enregistrées avec succès.</p>
      )}

      <p className="text-sm">Les champs marqués d'un <abbr title="astérisque">*</abbr> sont obligatoires.</p>

      <div className="flex flex-col md:flex-row gap-[31px]">
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Prénom <span className="text-alert">*</span>
          </label>
          <input
            type="text"
            placeholder="Jean"
            aria-required="true"
            {...register("first_name", { required: "Prénom requis" })}
            className={inputClass}
          />
          {errors.first_name && (
            <p className="mt-1 text-xs text-alert">{errors.first_name.message}</p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Nom <span className="text-alert">*</span>
          </label>
          <input
            type="text"
            placeholder="Dupont"
            aria-required="true"
            {...register("last_name", { required: "Nom requis" })}
            className={inputClass}
          />
          {errors.last_name && (
            <p className="mt-1 text-xs text-alert">{errors.last_name.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">
          Téléphone <span className="text-alert">*</span>
        </label>
        <input
          type="tel"
          placeholder="06 12 34 56 78"
          aria-required="true"
          {...register("phone", { required: "Téléphone requis" })}
          className={inputClass}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-alert">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">
          Adresse <span className="text-alert">*</span>
        </label>
        <input
          type="text"
          placeholder="12 rue de la Paix"
          aria-required="true"
          {...register("address", { required: "Adresse requise" })}
          className={inputClass}
        />
        {errors.address && (
          <p className="mt-1 text-xs text-alert">{errors.address.message}</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-[31px]">
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Code postal <span className="text-alert">*</span>
          </label>
          <input
            type="text"
            placeholder="75001"
            aria-required="true"
            {...register("postal_code", { required: "Code postal requis" })}
            className={inputClass}
          />
          {errors.postal_code && (
            <p className="mt-1 text-xs text-alert">{errors.postal_code.message}</p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Ville <span className="text-alert">*</span>
          </label>
          <input
            type="text"
            placeholder="Paris"
            aria-required="true"
            {...register("city", { required: "Ville requise" })}
            className={inputClass}
          />
          {errors.city && (
            <p className="mt-1 text-xs text-alert">{errors.city.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full justify-center font-semibold"
      >
        {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
      </Button>
    </form>
  );
}
