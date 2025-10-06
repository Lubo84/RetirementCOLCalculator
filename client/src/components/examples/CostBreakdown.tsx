import CostBreakdown from '../CostBreakdown';

export default function CostBreakdownExample() {
  return (
    <div className="p-8">
      <CostBreakdown weeklyAmount={1250.50} yearlyAmount={65026.00} />
    </div>
  );
}
