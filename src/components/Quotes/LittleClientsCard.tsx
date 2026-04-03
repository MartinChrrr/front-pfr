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
            <p className="px-2">{client.raison_sociale}</p>
            <p className="font-medium">Email :</p>
            <p className="px-2">{client.email}</p>
            <p className="font-medium">Téléphone :</p>
            <p className="px-2">{client.telephone}</p>
            <p className="font-medium">Adresse :</p>
            <p className="px-2">
                {client.adresses[0].ligne1} {client.adresses[0].code_postal} {client.adresses[0].ville}
            </p>
            <p className="font-medium">Siret :</p>
            <p className="px-2">{client.siret}</p>
        </Card>
    )
}