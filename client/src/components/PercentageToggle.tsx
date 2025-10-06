import { Button } from "@/components/ui/button";

interface PercentageToggleProps {
  value: number;
  onChange: (percentage: number) => void;
}

const percentages = [70, 80, 90, 100];

export default function PercentageToggle({ value, onChange }: PercentageToggleProps) {
  return (
    <div className="flex flex-wrap gap-3" data-testid="percentage-toggle">
      {percentages.map((percentage) => (
        <Button
          key={percentage}
          type="button"
          variant={value === percentage ? "default" : "outline"}
          size="lg"
          onClick={() => onChange(percentage)}
          data-testid={`percentage-${percentage}`}
          className={`min-w-[80px] ${
            value === percentage ? "bg-primary text-primary-foreground" : ""
          }`}
        >
          {percentage}%
        </Button>
      ))}
    </div>
  );
}
