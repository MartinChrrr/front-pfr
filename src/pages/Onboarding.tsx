import AuthLayout from "../layouts/AuthLayout";
import OnboardingForm from "../components/forms/OnboardingForm";

export default function Onboarding() {
  return (
    <AuthLayout>
      <div className="text-center">
        <h1 className="text-lg font-bold">Completez votre profil</h1>
        <p className="text-sm text-gray-500">
          Renseignez les informations de votre entreprise
        </p>
      </div>

      <OnboardingForm />
    </AuthLayout>
  );
}
