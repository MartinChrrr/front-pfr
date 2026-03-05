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
            <div className="grid grid-cols-3 w-full">
                <div className="text-center">
                    <p className="">Date d'émission</p>
                    <p className="py-2">{formatDate(quote.issue_date)}</p>
                </div>
                <div className="text-center">
                    <p className="">Validité</p>
                    <p className="py-2">{formatDate(quote.validity_date)}</p>
                </div>
                <div className="text-center">
                    <p className="">Statut</p>
                    <StatusBadge status={quote.status} />
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
                {quote.lines.map((line) => (
                    <div key={line.id ?? line.order} className="grid grid-cols-subgrid col-span-4 py-3">
                        <p className="text-black">{line.label}</p>
                        <p className="text-right">{line.quantity}</p>
                        <p className="text-right">{line.unit_price_excl_tax}€</p>
                        <p className="text-right">{line.amount_excl_tax}€</p>
                    </div>
                ))}
                <div className="col-span-4"><Separator /></div>
                <div className="col-start-3 col-span-3 grid grid-cols-subgrid gap-y-2.5">
                    <p className="col-span-2">Sous Total</p>
                    <p className="text-right">{quote.total_excl_tax}€</p>
                    <p className="col-span-2">TVA</p>
                    <p className="text-right">{quote.total_vat}€</p>
                    <p className="col-span-2 text-medium-bold text-black">TOTAL</p>
                    <p className="text-right text-medium-bold text-black">{quote.total_incl_tax}€</p>
                </div>
            </div>
        </Card>
    );
}