import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { register as apiRegister } from "../../api/auth";
import { handleFormErrors } from "../../api/handleFormErrors";
import type { RegisterRequest } from "../../types/auth";
import Button from "../ui/Button";

type RegisterFormData = RegisterRequest & { accept_cgu: boolean };

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const onSubmit = async ({ accept_cgu: _, ...data }: RegisterFormData) => {
    setGlobalError(null);
    try {
      await apiRegister(data);
      navigate("/onboarding");
    } catch (error) {
      const message = handleFormErrors<RegisterFormData>(error, setError);
      if (message) setGlobalError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-[31px] rounded-xl bg-white p-8 shadow-sm">
      {globalError && (
        <p className="text-sm text-alert">{globalError}</p>
      )}

      <p className="text-sm">Les champs marqués d'un <abbr title="astérisque">*</abbr> sont obligatoires.</p>

      <div className="flex gap-[31px]">
        <div className="flex flex-1 flex-col gap-[10px]">
          <label className="font-medium">
            Prénom <span className="text-alert">*</span>
          </label>
          <input
            type="text"
            placeholder="Jean"
            aria-required="true"
            {...register("first_name", { required: "Prénom requis" })}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 text-sm outline-none focus:border-primary-300"
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
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 text-sm outline-none focus:border-primary-300"
          />
          {errors.last_name && (
            <p className="mt-1 text-xs text-alert">{errors.last_name.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">
          Email <span className="text-alert">*</span>
        </label>
        <input
          type="email"
          placeholder="@gmail.com"
          aria-required="true"
          {...register("email", {
            required: "Email requis",
            pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Email invalide" },
          })}
          className="w-full rounded-lg border border-text-placeholder px-3 py-2 text-sm outline-none focus:border-primary-300"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-alert">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">
          Mot de passe <span className="text-alert">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="********"
            aria-required="true"
            {...register("password", {
              required: "Mot de passe requis",
              minLength: { value: 8, message: "8 caracteres minimum" },
            })}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 pr-10 outline-none focus:border-primary-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-placeholder"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-alert">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-[10px]">
        <label className="font-medium">
          Confirmer le mot de passe <span className="text-alert">*</span>
        </label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="********"
            aria-required="true"
            {...register("password_confirm", {
              required: "Confirmation requise",
              validate: (value) =>
                value === watch("password") || "Les mots de passe ne correspondent pas",
            })}
            className="w-full rounded-lg border border-text-placeholder px-3 py-2 pr-10 outline-none focus:border-primary-300"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-placeholder"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password_confirm && (
          <p className="mt-1 text-sm text-alert">{errors.password_confirm.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("accept_cgu", { required: "Vous devez accepter les CGU pour continuer" })}
            className="mt-0.5 h-4 w-4 shrink-0 accent-primary-500 cursor-pointer"
          />
          <span className="text-xs text-text-placeholder leading-relaxed">
            En créant un compte, j'accepte les{" "}
            <NavLink to="/cgu" target="_blank" className="text-primary-500 underline hover:text-primary-700">
              Conditions Générales d'Utilisation (CGU)
            </NavLink>{" "}
            et je consens au traitement de mes données personnelles conformément à la politique de confidentialité.
          </span>
        </label>
        {errors.accept_cgu && (
          <p className="text-xs text-alert">{errors.accept_cgu.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full justify-center font-semibold"
      >
        {isSubmitting ? "Inscription..." : "S'inscrire"}
      </Button>

      < div className="w-full flex gap-2 items-center">
        <div className="flex-1 h-px bg-text-placeholder" />
        <p className="flex-2">Pas encore de compte ?</p>
        <div className="flex-1 h-px bg-text-placeholder" />
      </div>
      
      <NavLink
        to="/login"
        className="inline-flex w-full items-center justify-center rounded-[10px] bg-white px-[15px] py-[8px] font-semibold text-black shadow-[inset_0_0_0_1px_#000] transition-colors hover:shadow-[inset_0_0_0_2px_#000]"
      >
        Se connecter
      </NavLink>
    
    </form>
  );
}
