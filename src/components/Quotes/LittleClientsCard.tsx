import type { Client } from "../../types/client";
import Card from "../ui/Card";

type LittleClientsCardProps = {
    client: Client;
    className: string;
}

export default function LittleClientsCard({ client, className }: LittleClientsCardProps) {
    return (
        <Card title="Clients" className={`${className}`} >
            <p>Entreprise</p>
            <p>{client.raison_sociale}</p>
            <p>Email</p>
            <p>{client.email}</p>
            <p>Téléphone</p>
            <p>{client.telephone}</p>
            <p>Adresse</p>
            <p>
                {client.adresses[0].ligne1} {client.adresses[0].code_postal} {client.adresses[0].ville}
            </p>
            <p>Siret</p>
            <p>{client.siret}</p>
        </Card>
    )
}