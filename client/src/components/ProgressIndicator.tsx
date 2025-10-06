import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2" data-testid="progress-indicator">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        
        return (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                isCompleted
                  ? "bg-hostplus-yellow text-hostplus-navy"
                  : isCurrent
                  ? "bg-hostplus-yellow text-hostplus-navy ring-2 ring-hostplus-yellow ring-offset-2"
                  : "border-2 border-muted bg-background text-muted-foreground"
              }`}
              data-testid={`step-indicator-${stepNumber}`}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : stepNumber}
            </div>
            {stepNumber < totalSteps && (
              <div
                className={`mx-1 h-0.5 w-8 ${
                  isCompleted ? "bg-hostplus-yellow" : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
