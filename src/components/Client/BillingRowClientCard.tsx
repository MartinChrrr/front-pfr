import type { InvoiceStatus } from "../../types/invoice";
import type { QuoteStatus } from "../../types/quote";
import StatusBadge from "../ui/StatusBadge";

type BillingRowClientCardProps = {
    name: string;
    date: string;
    status: QuoteStatus | InvoiceStatus;
    total: number;
}

export default function BillingRowClientCard({ name, date, status, total }: BillingRowClientCardProps){
    return (
        <div className="grid grid-cols-2 items-center px-5 py-3">
            <div>
                <p className="text-black text-medium-bold">{name}</p>
                <p className="text-small-medium py-1">{date}</p>
            </div>
            <div className="text-right">
                <p className="text-black text-medium-bold">{total} €</p>
                <StatusBadge status={status} size="sm" />
            </div>
        </div>
    );
}