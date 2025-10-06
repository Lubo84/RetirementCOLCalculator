import { Card } from "@/components/ui/card";
import { DollarSign, Calendar } from "lucide-react";

interface CostBreakdownProps {
  weeklyAmount: number;
  yearlyAmount: number;
}

export default function CostBreakdown({ weeklyAmount, yearlyAmount }: CostBreakdownProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6" data-testid="weekly-breakdown">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-primary/10 p-3">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Weekly Cost of Living</p>
            <p className="text-3xl font-bold text-foreground" data-testid="weekly-amount">
              ${weeklyAmount.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6" data-testid="yearly-breakdown">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-hostplus-yellow/20 p-3">
            <DollarSign className="h-6 w-6 text-hostplus-navy" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Annual Cost of Living</p>
            <p className="text-3xl font-bold text-foreground" data-testid="yearly-amount">
              ${yearlyAmount.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
