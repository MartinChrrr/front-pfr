import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../ui/Card";
import type { MonthlyRevenuePoint } from "../../hooks/useDashboardData";

interface MonthlyRevenueChartProps {
  data: MonthlyRevenuePoint[];
}

export default function MonthlyRevenueChart({ data }: MonthlyRevenueChartProps) {
  return (
    <Card title="Revenus de l'année">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#1e3a5f" dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
