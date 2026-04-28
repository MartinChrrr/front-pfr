import { useForm } from "react-hook-form";
import type { QuoteStatus } from "../../types/quote";

const ALL_STATUSES: { value: QuoteStatus; label: string }[] = [
  { value: "BROUILLON", label: "Brouillon" },
  { value: "ENVOYE", label: "Envoyé" },
  { value: "ACCEPTE", label: "Accepté" },
  { value: "REFUSE", label: "Refusé" },
  { value: "EXPIRE", label: "Expiré" },
];

interface FormData {
  statut: QuoteStatus;
}

type ChangeQuoteStatusFormProps = {
  formId: string;
  currentStatus: QuoteStatus;
  onSubmit: (statut: QuoteStatus) => void;
};

export default function ChangeQuoteStatusForm({ formId, currentStatus, onSubmit }: ChangeQuoteStatusFormProps) {
  const options = ALL_STATUSES.filter((s) => s.value !== currentStatus);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <form id={formId} onSubmit={handleSubmit((data) => onSubmit(data.statut))} className="flex flex-col gap-5">
      <p className="text-sm">Les champs marqués d'un <abbr title="astérisque">*</abbr> sont obligatoires.</p>
      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">
          Nouveau statut <span className="text-alert">*</span>
        </label>
        <select
          {...register("statut", { required: "Statut requis" })}
          className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
        >
          <option value="">Sélectionner un statut</option>
          {options.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        {errors.statut && (
          <p className="mt-1 text-xs text-alert">{errors.statut.message}</p>
        )}
      </div>
    </form>
  );
}
