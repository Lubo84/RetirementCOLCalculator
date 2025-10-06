import StepTwo from '../StepTwo';

export default function StepTwoExample() {
  const data = {
    takeHomePay: 2000,
    takeHomePayFrequency: "weekly" as const,
    partnerTakeHomePay: 1800,
    partnerTakeHomePayFrequency: "weekly" as const,
    mortgageRepayment: 2500,
    mortgageRepaymentFrequency: "monthly" as const,
    savings: 500,
    savingsFrequency: "weekly" as const,
  };

  return (
    <StepTwo 
      data={data}
      isCouple={true}
      isHomeOwner={true}
      onNext={(data) => console.log('Next clicked with data:', data)}
      onBack={() => console.log('Back clicked')}
    />
  );
}
