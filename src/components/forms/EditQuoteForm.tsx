import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import type { Client } from "../../types/client";
import Button from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { addDays } from "../../utils/date";

interface QuoteLineFormData {
  libelle: string;
  quantite: string;
  prix_unitaire_ht: string;
  taux_tva: string;
}

export interface EditQuoteFormData {
  client_id: string;
  date_emission: string;
  date_validite: string;
  notes: string;
  lignes: QuoteLineFormData[];
}

type EditQuoteFormProps = {
  formId: string;
  clients: Client[];
  defaultValues?: Partial<EditQuoteFormData>;
  onSubmit: (data: EditQuoteFormData) => void;
};

export default function EditQuoteForm({ formId, clients, defaultValues, onSubmit }: EditQuoteFormProps) {
  const { configuration } = useAuth();
  const quoteValidityDays = configuration?.quote_validity_days ?? 30;
  const today = new Date().toISOString().slice(0, 10);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditQuoteFormData>({
    defaultValues: defaultValues ?? {
      client_id: "",
      date_emission: today,
      date_validite: addDays(today, quoteValidityDays),
      notes: "",
      lignes: [{ libelle: "", quantite: "1", prix_unitaire_ht: "", taux_tva: "20" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "lignes" });
  const lignes = watch("lignes");
  const dateEmission = watch("date_emission");

  useEffect(() => {
    if (dateEmission) {
      setValue("date_validite", addDays(dateEmission, quoteValidityDays));
    }
  }, [dateEmission, quoteValidityDays, setValue]);

  const computeTotal = (line: QuoteLineFormData) => {
    const qty = parseFloat(line.quantite) || 0;
    const pu = parseFloat(line.prix_unitaire_ht) || 0;
    return qty * pu;
  };

  const sousTotal = lignes?.reduce((sum, l) => sum + computeTotal(l), 0) ?? 0;
  const tva = lignes?.reduce((sum, l) => {
    const ht = computeTotal(l);
    const rate = parseFloat(l.taux_tva) || 0;
    return sum + (ht * rate) / 100;
  }, 0) ?? 0;
  const total = sousTotal + tva;

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <p className="text-sm">Les champs marqués d'un <abbr title="astérisque">*</abbr> sont obligatoires.</p>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Client <span className="text-alert">*</span>
          </label>
          <select
            {...register("client_id", { required: "Client requis" })}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
          >
            <option value="">Sélectionner un client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.email}</option>
            ))}
          </select>
          {errors.client_id && (
            <p className="mt-1 text-xs text-alert">{errors.client_id.message}</p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Date d'émission <span className="text-alert">*</span>
          </label>
          <input
            type="date"
            {...register("date_emission", { required: "Date d'émission requise" })}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
          />
          {errors.date_emission && (
            <p className="mt-1 text-xs text-alert">{errors.date_emission.message}</p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Date de validité <span className="text-alert">*</span>
          </label>
          <input
            type="date"
            {...register("date_validite", { required: "Date de validité requise" })}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
          />
          {errors.date_validite && (
            <p className="mt-1 text-xs text-alert">{errors.date_validite.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <label className="font-medium">Prestation</label>
          <Button
            type="button"
            onClick={() => append({ libelle: "", quantite: "1", prix_unitaire_ht: "", taux_tva: "20" })}
          >
            <Plus size={16} />
            Ajouter une prestation
          </Button>
        </div>

        {/* Mobile: vue empilée */}
        <div className="md:hidden flex flex-col gap-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-2 border-b border-text-placeholder pb-3">
              <div>
                <span className="text-sm font-medium">Description</span>
                <input
                  type="text"
                  {...register(`lignes.${index}.libelle`, { required: "Requis" })}
                  className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
                />
                {errors.lignes?.[index]?.libelle && (
                  <p className="mt-1 text-xs text-alert">{errors.lignes[index].libelle?.message}</p>
                )}
              </div>
              <div className="pl-4 flex items-center gap-2">
                <span className="text-sm font-medium w-24 shrink-0">Quantité</span>
                <input
                  type="number"
                  min="1"
                  {...register(`lignes.${index}.quantite`, { required: "Requis" })}
                  className="w-full rounded-lg border border-text-placeholder px-3 py-2 text-center outline-none focus:border-primary-300"
                />
              </div>
              <div className="pl-4 flex items-center gap-2">
                <span className="text-sm font-medium w-24 shrink-0">Prix unitaire</span>
                <input
                  type="number"
                  step="0.01"
                  {...register(`lignes.${index}.prix_unitaire_ht`, { required: "Requis" })}
                  className="w-full rounded-lg border border-text-placeholder px-3 py-2 text-center outline-none focus:border-primary-300"
                />
              </div>
              <div className="pl-4 flex items-center justify-between">
                <span className="text-sm">Total : {computeTotal(lignes?.[index] ?? { libelle: "", quantite: "0", prix_unitaire_ht: "0", taux_tva: "20" }).toFixed(2)}€</span>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-alert hover:text-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <input type="hidden" {...register(`lignes.${index}.taux_tva`)} />
            </div>
          ))}
        </div>

        {/* Desktop: grid 5 colonnes */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[3fr_1fr_1fr_1fr_40px] gap-x-3 text-sm font-medium">
            <span>Nom de la prestation</span>
            <span className="text-center">QTÉ</span>
            <span className="text-center">PU</span>
            <span className="text-center">Total</span>
            <span />
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-[3fr_1fr_1fr_1fr_40px] items-center gap-x-3">
              <div>
                <input
                  type="text"
                  {...register(`lignes.${index}.libelle`, { required: "Requis" })}
                  className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
                />
                {errors.lignes?.[index]?.libelle && (
                  <p className="mt-1 text-xs text-alert">{errors.lignes[index].libelle?.message}</p>
                )}
              </div>
              <input
                type="number"
                min="1"
                {...register(`lignes.${index}.quantite`, { required: "Requis" })}
                className="w-full rounded-lg border border-text-placeholder px-3 py-2 text-center outline-none focus:border-primary-300"
              />
              <input
                type="number"
                step="0.01"
                {...register(`lignes.${index}.prix_unitaire_ht`, { required: "Requis" })}
                className="w-full rounded-lg border border-text-placeholder px-3 py-2 text-center outline-none focus:border-primary-300"
              />
              <p className="text-center">{computeTotal(lignes?.[index] ?? { libelle: "", quantite: "0", prix_unitaire_ht: "0", taux_tva: "20" }).toFixed(2)}</p>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-alert hover:text-red-700 transition"
              >
                <Trash2 size={18} />
              </button>
              <input type="hidden" {...register(`lignes.${index}.taux_tva`)} />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
            <span>Sous Total</span>
            <span className="text-right">{sousTotal.toFixed(2)}€</span>
            <span>TVA</span>
            <span className="text-right">{tva.toFixed(2)}€</span>
            <span className="font-bold text-black">TOTAL</span>
            <span className="text-right font-bold text-black">{total.toFixed(2)}€</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">Notes</label>
        <textarea
          {...register("notes")}
          rows={3}
          className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300 resize-none"
        />
      </div>
    </form>
  );
}
