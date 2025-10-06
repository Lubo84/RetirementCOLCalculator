import ProgressIndicator from '../ProgressIndicator';

export default function ProgressIndicatorExample() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <p className="text-sm text-muted-foreground mb-4">Step 1 of 4</p>
        <ProgressIndicator currentStep={1} totalSteps={4} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-4">Step 2 of 4</p>
        <ProgressIndicator currentStep={2} totalSteps={4} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-4">Step 4 of 4</p>
        <ProgressIndicator currentStep={4} totalSteps={4} />
      </div>
    </div>
  );
}
