import { useForm } from "react-hook-form";
import type { Client } from "../../types/client";

interface EditClientFormData {
  raison_sociale: string;
  email: string;
  telephone: string;
  contact_nom: string;
  contact_email: string;
  contact_telephone: string;
  ligne1: string;
  code_postal: string;
  ville: string;
  siret: string;
  notes: string;
}

type EditClientFormProps = {
  client: Client;
  formId: string;
  onSubmit: (data: EditClientFormData) => void;
};

export type { EditClientFormData };

export default function EditClientForm({ client, formId, onSubmit }: EditClientFormProps) {
  const address = client.adresses?.[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditClientFormData>({
    defaultValues: {
      raison_sociale: client.raison_sociale,
      email: client.email,
      telephone: client.telephone,
      contact_nom: client.contact_nom,
      contact_email: client.contact_email,
      contact_telephone: client.contact_telephone,
      ligne1: address?.ligne1 ?? "",
      code_postal: address?.code_postal ?? "",
      ville: address?.ville ?? "",
      siret: client.siret,
      notes: client.notes,
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

      <p className="text-sm">Les champs marqués d'un <abbr title="astérisque">*</abbr> sont obligatoires.</p>

    {/* ### Enterprise name ### */}
      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">
          Raison sociale <span className="text-alert">*</span>
        </label>
        <input
          type="text"
          aria-required="true"
          {...register("raison_sociale", {
          required: "Raison sociale requise",
          maxLength: { value: 200,
          message: "Maximum 200 caractères" }
          })}
          className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
        />
        {errors.raison_sociale && (
          <p className="mt-1 text-xs text-alert">{errors.raison_sociale.message}</p>
        )}
      </div>

    {/* ### Email ### */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Email <span className="text-alert">*</span>
          </label>
          <input
            type="email"
            aria-required="true"
            {...register("email", {
              required: "Email requis",
              pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Email invalide" },
            })}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-alert">{errors.email.message}</p>
          )}
        </div>

    {/* ### Phone number ### */}
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Téléphone <span className="text-alert">*</span>
          </label>
          <input
            type="tel"
            aria-required="true"
            {...register("telephone", {
              required: "Téléphone requis",
              pattern: { value: /^[0-9\s+\-.]{10,15}$/,
              message: "Téléphone invalide" }
              })}

            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
          />
          {errors.telephone && (
            <p className="mt-1 text-xs text-alert">{errors.telephone.message}</p>
          )}
        </div>
      </div>

      {/* ### Contact's name and first name ### */}
      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">
          Nom et prénom du contact
        </label>
        <input
          type="text"
          {...register("contact_nom")}
          className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
        />
      </div>

    {/* ### Contact's email ### */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Email du contact
          </label>
          <input
            type="email"
            {...register("contact_email")}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
          />
        </div>

    {/* ### Contact's phone number ### */}
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Téléphone du contact
          </label>
          <input
            type="tel"
            {...register("contact_telephone",
            {pattern: { value: /^[0-9\s+\-.]{10,15}$/,
            message: "Téléphone invalide" }
            })}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
          />
        </div>
      </div>

    {/* ### Address ### */}
      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">
          Adresse <span className="text-alert">*</span>
        </label>
        <input
          type="text"
          aria-required="true"
          {...register("ligne1", { required: "Adresse requise",
          maxLength: { value: 200,
          message: "Maximum 200 caractères" }
          })}
          className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
        />
        {errors.ligne1 && (
          <p className="mt-1 text-xs text-alert">{errors.ligne1.message}</p>
        )}
      </div>

    {/* ### Postal code ### */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Code postal <span className="text-alert">*</span>
          </label>
          <input
            type="text"
            aria-required="true"
            {...register("code_postal", {
            required: "Code postal requis",
            pattern: { value: /^\d{5}$/,
            message: "Code postal invalide (5 chiffres)" }
            })}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
          />
          {errors.code_postal && (
            <p className="mt-1 text-xs text-alert">{errors.code_postal.message}</p>
          )}
        </div>

    {/* ### City ### */}
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Ville <span className="text-alert">*</span>
          </label>
          <input
            type="text"
            aria-required="true"
            {...register("ville", { required: "Ville requise",
            pattern: { value: /^[a-zA-ZÀ-ÿ\s-]+$/,
            message: "Ville invalide" }
            })}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
          />
          {errors.ville && (
            <p className="mt-1 text-xs text-alert">{errors.ville.message}</p>
          )}
        </div>
      </div>

     {/* ### SIRET number ### */}
      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">
          SIRET <span className="text-alert">*</span>
        </label>
        <input
          type="text"
          aria-required="true"
          {...register("siret", {
          required: "SIRET requis",
          pattern: { value: /^\d{14}$/,
          message: "SIRET invalide (14 chiffres)" }
          })}
          className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
        />
        {errors.siret && (
          <p className="mt-1 text-xs text-alert">{errors.siret.message}</p>
        )}
      </div>

    {/* ### Notes ### */}
      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">
          Notes
        </label>
        <textarea
          {...register("notes",{
          maxLength: { value: 500, message: "Maximum 500 caractères" }
          })}
          rows={3}
          className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300 resize-none"
        />
      </div>
    </form>
  );
}
