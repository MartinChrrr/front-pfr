import { DateTime } from "luxon";
import type { Invoice } from "../../types/invoice";
import Card from "../ui/Card";
import StatusBadge from "../ui/StatusBadge";
import Separator from "../ui/Separator";


type InvoicesDetailsCardProps = {
    invoice: Invoice
    className?: string;
}

function formatDate(date: string): string {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL, { locale: "fr" });
}

export default function InvoicesDetailsCard({ invoice, className }: InvoicesDetailsCardProps) {
    return(
        <Card title="Details de la facture" borderHeader={true} className={`gap-2.5 ${className}`}>
            <div className="grid grid-cols-3 w-full">
                <div className="text-center">
                    <p className="">Date d'émission</p>
                    <p className="py-2">{formatDate(invoice.date_emission)}</p>
                </div>
                <div className="text-center">
                    <p className="">Échéance</p>
                    <p className="py-2">{formatDate(invoice.date_echeance)}</p>
                </div>
                <div className="text-center">
                    <p className="">Statut</p>
                    <StatusBadge status={invoice.statut} />
                </div>
                
            </div>
            <Separator />
            <p className="text-black text-medium-bold">Prestation</p>
            <div className="grid grid-cols-[3fr_1fr_1fr_1fr] w-full text-sm gap-y-2.5">
                <p className="pb-2">Description</p>
                <p className="pb-2 text-right">QTÉ</p>
                <p className="pb-2 text-right">PU</p>
                <p className="pb-2 text-right">TOTAL</p>
                <div className="col-span-4"><Separator /></div>
                {invoice.lignes.map((line) => (
                    <div key={line.id ?? line.ordre} className="grid grid-cols-subgrid col-span-4 py-3">
                        <p className="text-black">{line.libelle}</p>
                        <p className="text-right">{line.quantite}</p>
                        <p className="text-right">{line.prix_unitaire_ht}€</p>
                        <p className="text-right">{line.montant_ht}€</p>
                    </div>
                ))}
                <div className="col-span-4"><Separator /></div>
                <div className="col-start-3 col-span-3 grid grid-cols-subgrid gap-y-2.5">
                    <p className="col-span-2">Sous Total</p>
                    <p className="text-right">{invoice.total_ht}€</p>
                    <p className="col-span-2">TVA</p>
                    <p className="text-right">{invoice.total_tva}€</p>
                    <p className="col-span-2 text-medium-bold text-black">TOTAL</p>
                    <p className="text-right text-medium-bold text-black">{invoice.total_ttc}€</p>
                </div>
            </div>
        </Card>
    );
}