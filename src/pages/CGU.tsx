import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CGU() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-primary px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/register")}
          className="flex items-center gap-2 text-sm text-primary-500 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Retour
        </button>

        <h1 className="text-3xl font-bold text-primary-700 mb-2">
          CONDITIONS GÉNÉRALES D'UTILISATION
        </h1>
        <p className="text-sm text-text-placeholder mb-10">
          Dernière mise à jour : avril 2026
        </p>

        <div className="bg-white rounded-xl p-8 shadow-sm text-text-black leading-relaxed space-y-6">
          <ol className="flex flex-col gap-4">
            <li>
              <p className="italic">

                <span className="font-medium" >1. OBJET </span><br/>
                Les présentes CGU régissent l'utilisation de l'application de gestion de devis et factures DMT. En créant un compte, 
                vous acceptez sans réserve les présentes conditions.
              </p>
            </li>
            <li>
              <p className="italic"> 
                <span className="font-medium" >2. ACCÈS AU SERVICE </span><br/>
                  L'Application est accessible à toute personne physique 
                  ou morale exerçant une activité professionnelle. L'inscription est gratuite. Chaque utilisateur est responsable de la confidentialité de ses identifiants.
              </p>
            </li>
            <li>
              <p className="italic">      
                <span className="font-medium" >3. DONNÉES PERSONNELLES </span><br/>
                Les données collectées lors de l'inscription (nom, email, informations de facturation) sont utilisées uniquement pour le fonctionnement de l'Application.
                  Elles ne sont ni vendues ni transmises à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
              </p>
            </li>
            <li>
              <p className="italic">      
                <span className="font-medium" >4. UTILISATION DU SERVICE </span><br/>
                  L'utilisateur s'engage à utiliser l'Application de manière légale et à ne pas tenter d'en compromettre 
                  le fonctionnement. Toute utilisation frauduleuse entraînera la suppression du compte.
              </p>
            </li>
            <li>
              <p className="italic"> 
                <span className="font-medium" >5. PROPRIÉTÉ INTELLECTUELLE </span><br/>
                  L'Application et son contenu sont protégés par le droit de la propriété intellectuelle. Toute reproduction sans autorisation est interdite.
              </p>
            </li>
            <li>
              <p className="italic"> 
                <span className="font-medium" >6. LIMITATION DE RESPONSABILITÉ </span><br/>
                  L'Application est fournie "en l'état". Nous ne saurions être tenus responsables de pertes de données ou d'interruptions de service.
              </p>
            </li>
            <li>
              <p className="italic"> 
                <span className="font-medium" >7. MODIFICATION DES CGU </span><br/>
                  Nous nous réservons le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés par email de toute modification importante.
              </p>
            </li>
            <li>
              <p className="italic"> 
                <span className="font-medium" >8. CONTACT </span><br/>
                  Pour toute question relative aux CGU ou à vos données personnelles, contactez-nous à : contact@email.com
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
