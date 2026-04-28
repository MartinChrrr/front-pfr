import { useForm } from "react-hook-form";
import type { InvoiceStatus } from "../../types/invoice";

const STATUS_LABELS: Record<InvoiceStatus, string> = {
  BROUILLON: "Brouillon",
  ENVOYEE: "Envoyée",
  PAYEE: "Payée",
  EN_RETARD: "En retard",
};

const ALLOWED_TRANSITIONS: Record<InvoiceStatus, InvoiceStatus[]> = {
  BROUILLON: ["ENVOYEE"],
  ENVOYEE: ["PAYEE", "EN_RETARD"],
  EN_RETARD: ["PAYEE"],
  PAYEE: [],
};

interface FormData {
  statut: InvoiceStatus;
}

type ChangeInvoiceStatusFormProps = {
  formId: string;
  currentStatus: InvoiceStatus;
  onSubmit: (statut: InvoiceStatus) => void;
};

export default function ChangeInvoiceStatusForm({ formId, currentStatus, onSubmit }: ChangeInvoiceStatusFormProps) {
  const options = ALLOWED_TRANSITIONS[currentStatus];

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
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
        {errors.statut && (
          <p className="mt-1 text-xs text-alert">{errors.statut.message}</p>
        )}
      </div>
    </form>
  );
}
