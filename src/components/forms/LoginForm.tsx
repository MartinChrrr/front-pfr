import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { handleFormErrors } from "../../api/handleFormErrors";
import type { LoginRequest } from "../../types/auth";
import Button from "../ui/Button";

export default function LoginForm() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    setGlobalError(null);
    try {
      await login(data);
    } catch (error) {
      const message = handleFormErrors<LoginRequest>(error, setError);
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
        <label className="text-sm font-medium">
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
        <label className="text-sm font-medium">
          Mot de passe <span className="text-alert">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="********"
            aria-required="true"
            {...register("password", { required: "Mot de passe requis" })}
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
          <p className="mt-1 text-xs text-alert">{errors.password.message}</p>
        )}
        <div className="text-right">
          <a href="#" className="text-sm text-primary-300 hover:underline">
            Mot de passe oublie ?
          </a>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full justify-center font-semibold"
      >
        {isSubmitting ? "Connexion..." : "Se connecter"}
      </Button>
      < div className="w-full flex gap-2 items-center">
        <div className="flex-1 h-px bg-text-placeholder" />
        <p className="flex-2">Pas encore de compte ?</p>
        <div className="flex-1 h-px bg-text-placeholder" />
      </div>
      

      <NavLink
        to="/register"
        className="inline-flex w-full items-center justify-center rounded-[10px] bg-white px-[15px] py-[8px] font-semibold text-black shadow-[inset_0_0_0_1px_#000] transition-colors hover:shadow-[inset_0_0_0_2px_#000]"
      >
        S'inscrire
      </NavLink>

    </form>
  );
}
