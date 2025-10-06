import { useState } from 'react';
import FrequencySelector, { type Frequency } from '../FrequencySelector';

export default function FrequencySelectorExample() {
  const [frequency, setFrequency] = useState<Frequency>('weekly');

  return (
    <div className="p-8 space-y-4">
      <div>
        <p className="text-sm font-semibold mb-2">Selected: {frequency}</p>
        <FrequencySelector value={frequency} onChange={setFrequency} />
      </div>
    </div>
  );
}
