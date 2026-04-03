import type { Client } from "../../types/client";
import Card from "../ui/Card";

type ClientCardProps = {
  client: Client
  className?: string;
};

export default function ClientCard({ client, className }: ClientCardProps) {
    return (
    <Card title="Infomation du clients" className={className}>
        <p>Entreprise :</p>
        <p> {client.raison_sociale}</p>
        <p> Contact :</p>
        <p> {client.contact_nom}</p>
        <p> Email :</p>
        <p> {client.contact_email}</p>
        <p> Téléphone : </p>
        <p> {client.contact_telephone}</p>
        <p> Adresse :</p>
        <p> {client.adresses[0]?.ligne1} {client.adresses[0]?.code_postal} {client.adresses[0]?.ville} </p>
        <p> Siret :</p>
        <p> {client.siret}</p>
        <p>Client depuis :</p>
        <p> {client.created_at}</p>
    </Card>
    );
}