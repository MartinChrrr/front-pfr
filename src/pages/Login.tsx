import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../components/forms/LoginForm";

export default function Login() {
  return (
    <AuthLayout>
      <div className="text-center">
        <h1 className="text-lg font-bold">Bienvenue</h1>
        <p className="text-sm text-gray-500">
          Connectez-vous a votre espace auto-entrepreneur
        </p>
      </div>

      <LoginForm />
    </AuthLayout>
  );
}
