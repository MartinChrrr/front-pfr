import Card from "../ui/Card";
import UpcomingDeadlineRow from "./UpcomingDeadlineRow";
import type { UpcomingDeadline } from "../../hooks/useDashboardData";

interface UpcomingDeadlinesCardProps {
  deadlines: UpcomingDeadline[];
  className?: string;
}

export default function UpcomingDeadlinesCard({ deadlines, className = "flex-1" }: UpcomingDeadlinesCardProps) {
  return (
    <Card title="Deadlines à venir" className={className}>
      {deadlines.length === 0 ? (
        <p className="text-center italic">Aucune deadline à venir</p>
      ) : (
        deadlines.map((deadline) => (
          <UpcomingDeadlineRow key={`${deadline.type}-${deadline.id}`} deadline={deadline} />
        ))
      )}
    </Card>
  );
}
