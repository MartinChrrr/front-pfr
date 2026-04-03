import type { Client } from "../../types/client";
import Card from "../ui/Card";

type LittleClientsCardProps = {
    client: Client;
    className: string;
}

export default function LittleClientsCard({ client, className }: LittleClientsCardProps) {
    return (
        <Card title="Clients" className={`${className}`} >
            <p className="font-medium">Entreprise :</p>
            <p className={`px-2 ${client.raison_sociale ? "" : "italic"}`}>{client.raison_sociale ? client.raison_sociale : "Non renseigné"}</p>
            <p className="font-medium">Email :</p>
            <p className={`px-2 ${client.email ? "" : "italic"}`}>{client.email ? client.email : "Non renseigné"}</p>
            <p className="font-medium">Téléphone :</p>
            <p className={`px-2 ${client.telephone ? "" : "italic"}`}>{client.telephone ? client.telephone : "Non renseigné"}</p>
            <p className="font-medium">Adresse :</p>
            <p className={`px-2 ${client.adresses[0]?.ligne1 ? "" : "italic"}`}>
                {client.adresses[0]?.ligne1 ? `${client.adresses[0].ligne1} ${client.adresses[0].code_postal} ${client.adresses[0].ville}` : "Non renseigné"}
            </p>
            <p className="font-medium">Siret :</p>
            <p className={`px-2 ${client.siret ? "" : "italic"}`}>{client.siret ? client.siret : "Non renseigné"}</p>
        </Card>
    )
}