import { DateTime } from "luxon";
import type { Quote } from "../../types/quote";
import Card from "../ui/Card";
import StatusBadge from "../ui/StatusBadge";
import Separator from "../ui/Separator";


type QuotesDetailsCardProps = {
    quote: Quote
    className?: string;
}

function formatDate(date: string): string {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL, { locale: "fr" });
}

export default function QuotesDetailsCard({ quote, className }: QuotesDetailsCardProps) {
    return(
        <Card title="Details du devis" borderHeader={true} className={`gap-2.5 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="text-center">
                    <p className="">Date d'émission</p>
                    <p className="py-2">{formatDate(quote.date_emission)}</p>
                </div>
                <div className="text-center">
                    <p className="">Validité</p>
                    <p className="py-2">{formatDate(quote.date_validite)}</p>
                </div>
                <div className="text-center">
                    <p className="">Statut</p>
                    <StatusBadge status={quote.statut} />
                </div>

            </div>
            <Separator />
            <p className="text-black text-medium-bold">Prestation</p>

            {/* Mobile: vue empilée */}
            <div className="md:hidden w-full text-sm">
                {quote.lignes.map((line, index) => (
                    <div key={line.id ?? line.ordre}>
                        {index > 0 && <Separator />}
                        <div className="flex flex-col gap-1 py-3">
                            <p className="font-medium text-black">{line.libelle}</p>
                            <p className="pl-4">Quantité : {line.quantite}</p>
                            <p className="pl-4">Prix unitaire : {line.prix_unitaire_ht}€</p>
                            <p className="pl-4">Montant HT : {line.montant_ht}€</p>
                        </div>
                    </div>
                ))}
                <Separator />
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 mt-2 ml-auto w-fit">
                    <p>Sous Total</p>
                    <p className="text-right">{quote.total_ht}€</p>
                    <p>TVA</p>
                    <p className="text-right">{quote.total_tva}€</p>
                    <p className="text-medium-bold text-black">TOTAL</p>
                    <p className="text-right text-medium-bold text-black">{quote.total_ttc}€</p>
                </div>
            </div>

            {/* Desktop: grid 4 colonnes */}
            <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr] w-full text-sm gap-y-2.5">
                <p className="pb-2">Description</p>
                <p className="pb-2 text-right">QTÉ</p>
                <p className="pb-2 text-right">PU</p>
                <p className="pb-2 text-right">TOTAL</p>
                <div className="col-span-4"><Separator /></div>
                {quote.lignes.map((line) => (
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
                    <p className="text-right">{quote.total_ht}€</p>
                    <p className="col-span-2">TVA</p>
                    <p className="text-right">{quote.total_tva}€</p>
                    <p className="col-span-2 text-medium-bold text-black">TOTAL</p>
                    <p className="text-right text-medium-bold text-black">{quote.total_ttc}€</p>
                </div>
            </div>
        </Card>
    );
}