import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { updateProfile } from "../../api/auth";
import { handleFormErrors } from "../../api/handleFormErrors";
import type { ProfileUpdateRequest } from "../../types/auth";
import Button from "../ui/Button";

export default function OnboardingForm() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProfileUpdateRequest>();

  const onSubmit = async (data: ProfileUpdateRequest) => {
    setGlobalError(null);
    try {
      await updateProfile(data);
      await refreshUser();
      navigate("/user-configuration");
    } catch (error) {
      const message = handleFormErrors<ProfileUpdateRequest>(error, setError);
      if (message) setGlobalError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-[31px] rounded-xl bg-white p-8 shadow-sm">
      {globalError && (
        <p className="text-sm text-alert">{globalError}</p>
      )}

      <p className="text-sm">Les champs marqués d'un <abbr title="astérisque">*</abbr> sont obligatoires.</p>

      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">
          Nom de l'entreprise <span className="text-alert">*</span>
        </label>
        <input
          type="text"
          placeholder="Ma Société SAS"
          aria-required="true"
          {...register("company_name", { required: "Nom de l'entreprise requis" })}
          className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
        />
        {errors.company_name && (
          <p className="mt-1 text-xs text-alert">{errors.company_name.message}</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-[31px]">
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            SIRET <span className="text-alert">*</span>
          </label>
          <input
            type="text"
            placeholder="123 456 789 00012"
            aria-required="true"
            {...register("siret", { required: "SIRET requis" })}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
          />
          {errors.siret && (
            <p className="mt-1 text-xs text-alert">{errors.siret.message}</p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Téléphone <span className="text-alert">*</span>
          </label>
          <input
            type="tel"
            placeholder="06 12 34 56 78"
            aria-required="true"
            {...register("phone", { required: "Téléphone requis" })}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-alert">{errors.phone.message}</p>
          )}
        </div>
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
          className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
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
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
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
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
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
        {isSubmitting ? "Enregistrement..." : "Continuer"}
      </Button>
    </form>
  );
}
