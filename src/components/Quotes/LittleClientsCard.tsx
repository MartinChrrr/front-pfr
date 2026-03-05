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
            <p>{client.company_name}</p>
            <p>Email</p>
            <p>{client.email}</p>
            <p>Téléphone</p>
            <p>{client.phone}</p>
            <p>Adresse</p>
            <p>
                {client.addresses[0].line1} {client.addresses[0].postal_code} {client.addresses[0].city}
            </p>
            <p>Siret</p>
            <p>{client.siret}</p>
        </Card>
    )
}