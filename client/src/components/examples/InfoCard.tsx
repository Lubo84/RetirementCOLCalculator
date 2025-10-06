import InfoCard from '../InfoCard';

export default function InfoCardExample() {
  return (
    <div className="p-8 space-y-4">
      <InfoCard>
        <p><strong>Take home pay</strong> is your income after tax has been deducted. This is the amount that gets deposited into your bank account.</p>
      </InfoCard>
      <InfoCard>
        <p>As a rule of thumb, you typically need between <strong>70-90% of your current cost of living</strong> in retirement, as work-related expenses like commuting and professional clothing are no longer applicable.</p>
      </InfoCard>
    </div>
  );
}
