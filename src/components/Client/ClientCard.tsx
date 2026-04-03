import type { Client } from "../../types/client";
import Card from "../ui/Card";

type ClientCardProps = {
  client: Client
  className?: string;
};

export default function ClientCard({ client, className }: ClientCardProps) {
    return (
    <Card title="Infomation du clients" className={className}>
        <p className="font-medium">Entreprise :</p>
        <p className="px-2"> {client.raison_sociale ? client.raison_sociale : "Non renseigné"}</p>
        <p className="font-medium"> Contact :</p>
        <p className="px-2"> {client.contact_nom ? client.contact_nom : "Non renseigné"}</p>
        <p className="font-medium"> Email :</p>
        <p className="px-2"> {client.contact_email ? client.contact_email : "Non renseigné"}</p>
        <p className="font-medium"> Téléphone : </p>
        <p className="px-2"> {client.contact_telephone ? client.contact_telephone : "Non renseigné"}</p>
        <p className="font-medium"> Adresse :</p>
        <p className="px-2"> {client.adresses[0]?.ligne1} {client.adresses[0]?.code_postal} {client.adresses[0]?.ville} </p>
        <p className="font-medium"> Siret :</p>
        <p className="px-2"> {client.siret ? client.siret : "Non renseigné"}</p>
        <p className="font-medium"> Client depuis :</p>
        <p className="px-2">
          {
            // Converts raw text "2026-04-02T10:30:00" to a JS date object
            new Date(client.created_at)
            // Formats it to French date format : 02/04/2026
            .toLocaleDateString("fr-FR")
          }
        </p>
    </Card>
    );
}