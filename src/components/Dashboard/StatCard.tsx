import Card from "../ui/Card";

interface StatCardProps {
  title: string;
  value: number;
  unit?: string;
  className?: string;
}

export default function StatCard({ title, value, unit = "€", className = "flex-1" }: StatCardProps) {
  return (
    <Card title={title} className={className}>
      <p className="text-2xl font-bold">{value.toFixed(2)}{unit}</p>
    </Card>
  );
}
