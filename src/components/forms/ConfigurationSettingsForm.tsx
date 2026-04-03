import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { updateConfiguration } from "../../api/auth";
import { handleFormErrors } from "../../api/handleFormErrors";
import type { ConfigurationUpdateRequest } from "../../types/auth";
import Button from "../ui/Button";

export default function ConfigurationSettingsForm() {
  const { configuration, refreshUser } = useAuth();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConfigurationUpdateRequest>({
    values: {
      quote_prefix: configuration?.quote_prefix ?? "DEV",
      invoice_prefix: configuration?.invoice_prefix ?? "FAC",
      next_quote_number: configuration?.next_quote_number ?? 1,
      next_invoice_number: configuration?.next_invoice_number ?? 1,
      payment_deadline_days: configuration?.payment_deadline_days ?? 30,
      quote_validity_days: configuration?.quote_validity_days ?? 30,
    },
  });

  const onSubmit = async (data: ConfigurationUpdateRequest) => {
    setGlobalError(null);
    setSuccess(false);
    try {
      await updateConfiguration(data);
      await refreshUser();
      reset(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      const message = handleFormErrors<ConfigurationUpdateRequest>(error, setError);
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

      <div className="flex flex-col md:flex-row gap-[31px]">
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Préfixe devis <span className="text-alert">* (Obligatoire)</span>
          </label>
          <input
            type="text"
            placeholder="DEV"
            {...register("quote_prefix", { required: "Préfixe devis requis" })}
            className={inputClass}
          />
          {errors.quote_prefix && (
            <p className="mt-1 text-xs text-alert">{errors.quote_prefix.message}</p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Préfixe facture <span className="text-alert">* (Obligatoire)</span>
          </label>
          <input
            type="text"
            placeholder="FAC"
            {...register("invoice_prefix", { required: "Préfixe facture requis" })}
            className={inputClass}
          />
          {errors.invoice_prefix && (
            <p className="mt-1 text-xs text-alert">{errors.invoice_prefix.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-[31px]">
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">Prochain n° de devis</label>
          <input
            type="number"
            min={1}
            {...register("next_quote_number", { valueAsNumber: true })}
            className={inputClass}
          />
          {errors.next_quote_number && (
            <p className="mt-1 text-xs text-alert">{errors.next_quote_number.message}</p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">Prochain n° de facture</label>
          <input
            type="number"
            min={1}
            {...register("next_invoice_number", { valueAsNumber: true })}
            className={inputClass}
          />
          {errors.next_invoice_number && (
            <p className="mt-1 text-xs text-alert">{errors.next_invoice_number.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-[31px]">
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Délai de paiement (jours) <span className="text-alert">* (Obligatoire)</span>
          </label>
          <input
            type="number"
            min={1}
            {...register("payment_deadline_days", { required: "Délai requis", valueAsNumber: true })}
            className={inputClass}
          />
          {errors.payment_deadline_days && (
            <p className="mt-1 text-xs text-alert">{errors.payment_deadline_days.message}</p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Validité devis (jours) <span className="text-alert">* (Obligatoire)</span>
          </label>
          <input
            type="number"
            min={1}
            {...register("quote_validity_days", { required: "Validité requise", valueAsNumber: true })}
            className={inputClass}
          />
          {errors.quote_validity_days && (
            <p className="mt-1 text-xs text-alert">{errors.quote_validity_days.message}</p>
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
