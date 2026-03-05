import type { Client } from "../../types/client";
import Card from "../ui/Card";

type ClientCardProps = {
  client: Client
  className?: string;
};

export default function ClientCard({ client, className }: ClientCardProps) {
    return (
    <Card title="Infomation du clients" className={className}>
        <p>Entreprise:</p>
        <p> {client.company_name}</p>
        <p> Contact</p>
        <p> {client.contact_name}</p>
        <p> Email</p>
        <p> {client.contact_email}</p>
        <p> Téléphone</p>
        <p> {client.contact_phone}</p>
        <p> Adresse</p>
        <p> {client.addresses[0]?.line1} {client.addresses[0]?.postal_code} {client.addresses[0]?.city} </p>
        <p> Siret</p>
        <p> {client.siret}</p>
        <p>Client depuis</p>
        <p> {client.created_at}</p>
    </Card>
    );
}