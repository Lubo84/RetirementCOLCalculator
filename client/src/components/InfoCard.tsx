import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";

interface InfoCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function InfoCard({ children, className = "" }: InfoCardProps) {
  return (
    <Card className={`bg-hostplus-yellow-light border-hostplus-yellow/20 p-6 ${className}`} data-testid="info-card">
      <div className="flex gap-3">
        <Info className="h-5 w-5 text-hostplus-navy flex-shrink-0 mt-0.5" />
        <div className="text-sm text-foreground leading-relaxed">{children}</div>
      </div>
    </Card>
  );
}
