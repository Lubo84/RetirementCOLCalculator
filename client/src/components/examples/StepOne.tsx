import StepOne from '../StepOne';

export default function StepOneExample() {
  const data = {
    relationshipStatus: "couple" as const,
    homeOwnership: "own" as const,
    yearsToRetirement: "5-10" as const,
  };

  return (
    <StepOne 
      data={data} 
      onNext={(data) => console.log('Next clicked with data:', data)} 
    />
  );
}
