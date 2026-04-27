import AuthLayout from "../layouts/AuthLayout";
import RegisterForm from "../components/forms/RegisterForm";

export default function Register() {
  return (
    <AuthLayout>
      <div className="text-center">
        <h1 className="text-lg font-bold">Creer un compte</h1>
        <p className="text-sm text-gray-500">
          Rejoignez des milliers d'auto-entrepreneurs
        </p>
      </div>

      <RegisterForm />
    </AuthLayout>
  );
}
