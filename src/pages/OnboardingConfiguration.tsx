import AuthLayout from "../layouts/AuthLayout";
import OnboardingConfigForm from "../components/forms/OnboardingConfigForm";

export default function OnboardingConfiguration() {
  return (
    <AuthLayout>
      <div className="text-center">
        <h1 className="text-lg font-bold">Configurez votre compte</h1>
        <p className="text-sm text-gray-500">
          Personnalisez vos préfixes et délais par défaut
        </p>
      </div>

      <OnboardingConfigForm />
    </AuthLayout>
  );
}
