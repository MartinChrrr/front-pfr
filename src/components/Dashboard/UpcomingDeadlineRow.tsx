import StatusBadge from "../ui/StatusBadge";
import { formatDateFR } from "../../utils/mappers";
import type { UpcomingDeadline } from "../../hooks/useDashboardData";

interface UpcomingDeadlineRowProps {
  deadline: UpcomingDeadline;
}

export default function UpcomingDeadlineRow({ deadline }: UpcomingDeadlineRowProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0 min-h-22">
      <div>
        <p className="font-medium">{deadline.numero}</p>
        <p className="text-caption">{deadline.client}</p>
        <StatusBadge status={deadline.statut} size="sm" />
      </div>
      <p className="text-caption">{formatDateFR(deadline.date)}</p>
    </div>
  );
}
