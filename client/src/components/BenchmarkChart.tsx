import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface BenchmarkChartProps {
  userAmount: number;
  asfaComfortable: number;
  asfaModest: number;
  agePension: number;
}

export default function BenchmarkChart({ userAmount, asfaComfortable, asfaModest, agePension }: BenchmarkChartProps) {
  const data = [
    { name: "Your Estimated\nCost of Living", value: userAmount, color: "hsl(48 100% 50%)" },
    { name: "ASFA\nComfortable", value: asfaComfortable, color: "hsl(215 100% 26%)" },
    { name: "ASFA\nModest", value: asfaModest, color: "hsl(215 50% 60%)" },
    { name: "Full Age\nPension", value: agePension, color: "hsl(142 71% 45%)" },
  ];

  return (
    <Card className="p-8" data-testid="benchmark-chart">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        How You Compare to Retirement Benchmarks
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            type="number" 
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            stroke="hsl(var(--foreground))"
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={120}
            stroke="hsl(var(--foreground))"
          />
          <Tooltip
            formatter={(value: number) => `$${value.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
