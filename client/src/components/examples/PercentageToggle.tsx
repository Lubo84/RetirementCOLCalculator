import { useState } from 'react';
import PercentageToggle from '../PercentageToggle';

export default function PercentageToggleExample() {
  const [percentage, setPercentage] = useState(100);

  return (
    <div className="p-8 space-y-4">
      <p className="text-sm font-semibold">Selected: {percentage}%</p>
      <PercentageToggle value={percentage} onChange={setPercentage} />
    </div>
  );
}
