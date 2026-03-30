import { useForm } from "react-hook-form";
import type { Client } from "../../types/client";

interface EditClientFormData {
  raison_sociale: string;
  email: string;
  telephone: string;
  ligne1: string;
  code_postal: string;
  ville: string;
  siret: string;
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
      ligne1: address?.ligne1 ?? "",
      code_postal: address?.code_postal ?? "",
      ville: address?.ville ?? "",
      siret: client.siret,
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">
          Nom du client <span className="text-alert">*</span>
        </label>
        <input
          type="text"
          {...register("raison_sociale", { required: "Nom du client requis" })}
          className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
        />
        {errors.raison_sociale && (
          <p className="mt-1 text-xs text-alert">{errors.raison_sociale.message}</p>
        )}
      </div>

      <div className="flex gap-5">
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Email <span className="text-alert">*</span>
          </label>
          <input
            type="email"
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

        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Téléphone <span className="text-alert">*</span>
          </label>
          <input
            type="tel"
            {...register("telephone", { required: "Téléphone requis" })}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
          />
          {errors.telephone && (
            <p className="mt-1 text-xs text-alert">{errors.telephone.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">
          Adresse <span className="text-alert">*</span>
        </label>
        <input
          type="text"
          {...register("ligne1", { required: "Adresse requise" })}
          className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
        />
        {errors.ligne1 && (
          <p className="mt-1 text-xs text-alert">{errors.ligne1.message}</p>
        )}
      </div>

      <div className="flex gap-5">
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Code postal <span className="text-alert">*</span>
          </label>
          <input
            type="text"
            {...register("code_postal", { required: "Code postal requis" })}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
          />
          {errors.code_postal && (
            <p className="mt-1 text-xs text-alert">{errors.code_postal.message}</p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Ville <span className="text-alert">*</span>
          </label>
          <input
            type="text"
            {...register("ville", { required: "Ville requise" })}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
          />
          {errors.ville && (
            <p className="mt-1 text-xs text-alert">{errors.ville.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">
          SIRET <span className="text-alert">*</span>
        </label>
        <input
          type="text"
          {...register("siret", { required: "SIRET requis" })}
          className="w-full rounded-lg border border-text-placeholder px-3 py-2 outline-none focus:border-primary-300"
        />
        {errors.siret && (
          <p className="mt-1 text-xs text-alert">{errors.siret.message}</p>
        )}
      </div>
    </form>
  );
}
