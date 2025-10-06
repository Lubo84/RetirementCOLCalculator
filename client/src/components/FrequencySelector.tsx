import { Button } from "@/components/ui/button";

export type Frequency = "weekly" | "fortnightly" | "monthly" | "yearly";

interface FrequencySelectorProps {
  value: Frequency;
  onChange: (frequency: Frequency) => void;
}

const frequencies: { value: Frequency; label: string }[] = [
  { value: "weekly", label: "Weekly" },
  { value: "fortnightly", label: "Fortnightly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export default function FrequencySelector({ value, onChange }: FrequencySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2" data-testid="frequency-selector">
      {frequencies.map((freq) => (
        <Button
          key={freq.value}
          type="button"
          variant={value === freq.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(freq.value)}
          data-testid={`frequency-${freq.value}`}
          className={value === freq.value ? "bg-primary text-primary-foreground" : ""}
        >
          {freq.label}
        </Button>
      ))}
    </div>
  );
}
